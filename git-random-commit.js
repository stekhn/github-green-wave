const fs = require('memfs');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node')

const url = 'https://github.com/isomorphic-git/lightning-fs.git'
const dir = '/';
  
async function clone() {
  return await git.clone({ fs, http, dir, url })
}

(async function init() {
  const log = await clone();
  const ls = fs.readdirSync(dir);
  console.log(ls);
})()
