const {spawn} = require('child_process')
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

function cloneRepo() {
  const git = spawn('git', [
    'clone',
    process.env.GITHUB_REPO,
    '-C /tmp/target123',
  ])
}

function appendToRedirects(fullToShortLink) {
  const _redirects = path('/tmp', 'target123', '_redirects')
  try {
    fs.appendFileSync(_redirects, fullToShortLink)
    console.log('The "data to append" was appended to file!')
  } catch (err) {
    /* Handle the error */
    console.error('Errror', err)
  }
}
