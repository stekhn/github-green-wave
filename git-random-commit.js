const fs = require('memfs');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const dir = '/';
const filepath = 'dummy.txt'

const username = 'myname';
const token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const url = `https://${username}:${token}@github.com/myname/my-repo.git`;

(async function init() {
  await gitClone();
  await writeFile();
  await gitStatus();
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

async function gitStatus() {
  return await git.statusMatrix({ fs, dir });
}

async function gitCommit() {
  return await git.commit({
    fs,
    dir,
    author: {
      name: 'Steffen Kühne',
      email: 'stekhn@gmail.com',
    },
    message: 'Update file'
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
