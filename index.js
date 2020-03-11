const fs = require('memfs');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const config = require('./config.json');
const { dir, filepath } = config;
const url = new URL(config.auth.url);
url.username = config.auth.username;
url.password = config.auth.token || config.auth.password;

(async function init() {
  await gitClone();  
  await writeFile();
  await gitAdd();
  await gitCommit();
  await gitPush();
})();

function writeFile() {
  const path = `${dir}${filepath}`;
  const data = new Date().toISOString();

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function gitClone() {
  return await git.clone({ fs, http, dir, url, depth: 1 });
}

async function gitAdd() {
  await git.add({ fs, dir, filepath });
}

async function gitCommit() {
  return await git.commit({
    fs,
    dir,
    author: config.commit.author,
    message: config.commit.message
  });
}

async function gitPush() {
  return await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'master'
  });
}
