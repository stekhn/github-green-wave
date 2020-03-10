const fs = require('memfs');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node')
const dir = '/';

fs.writeFileSync('/hello.txt', 'World!');

git.clone({ fs, http, dir, url: 'https://github.com/isomorphic-git/lightning-fs.git' }).then(console.log)
