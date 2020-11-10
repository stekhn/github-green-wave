const fs = require('memfs');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const config = require('./config.json');
const { dir, filename, probability } = config;
const filepath = `${dir}${filename}`;
const gitpath = `${dir}.git`;
const content = new Date().toISOString();
const url = new URL(config.auth.url);
url.username = config.auth.username;
url.password = config.auth.token || config.auth.password;

exports.githubGreenWave = async () => {
  if (Math.random() >= probability) {
    await gitClone().catch(handleError);
    await writeFile().catch(handleError);
    await gitAdd().catch(handleError);
    await gitCommit().catch(handleError);
    await gitPush().catch(handleError);
    await removeGit().catch(handleError);
  } 
};

function handleError(err) {
  console.error(err);
}

async function writeFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function removeGit() {
  return new Promise((resolve, reject) => {
    fs.rmdir(gitpath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function gitClone() {
  return git.clone({ fs, http, dir, url, depth: 1 });
}

async function gitAdd() {
  return git.add({ fs, dir, filepath: filename });
}

async function gitCommit() {
  return git.commit({
    fs,
    dir,
    author: config.commit.author,
    message: config.commit.message
  });
}

async function gitPush() {
  return git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'master'
  });
}
