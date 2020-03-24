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
