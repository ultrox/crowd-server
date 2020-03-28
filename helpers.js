const {spawnSync} = require('child_process')
const fs = require('fs')
const path = require('path')

module.exports.isUrlValid = function isUrlValid(url) {
  // regxp code from https://www.regextester.com/96928
  const regxp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

  return regxp.test(url)
}

module.exports.genResponseData = function genResponseData(code, oldData = {}) {
  return {
    data: {
      ...oldData,
      shortLink: process.env.BASE_URL + `/${code}`,
    },
  }
}

module.exports.cloneRepo = function cloneRepo() {
  const git = spawnSync('git', [
    'clone',
    process.env.GITHUB_REPO,
    '/tmp/target123',
  ])
  return git
}

module.exports.appendToRedirects = function appendToRedirects(fullToShortLink) {
  const _redirects = path.join('/tmp', 'target123', '_redirects')
  try {
    fs.appendFileSync(_redirects, fullToShortLink)
    console.log('The "data to append" was appended to file!')
  } catch (err) {
    /* Handle the error */
    console.error('Errror', err)
  }
}

module.exports.commitAndPush = function commitAndPush(cwd) {
  spawnSync('git', ['config', 'user.name', 'Mordik'], {
    stdio: 'inherit',
    cwd: '/tmp/target123',
  })

  spawnSync('git', ['config', 'user.email', 'k@gmail.com'], {
    stdio: 'inherit',
    cwd: '/tmp/target123',
  })
  const msg = 'update'
  spawnSync('git', ['commit', '-am', msg], {
    stdio: 'inherit',
    cwd,
  })
  spawnSync('git', ['push'], {stdio: 'inherit', cwd})
}
