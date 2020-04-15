const helpers = require('./helpers')
let fs = require('fs')

it('convertToText()', function() {
  let input = [
    {shortCode: '1', orgUrl: 'http://google.com'},
    {shortCode: '2', orgUrl: 'google.com'},
    {shortCode: '3', orgUrl: '3google.com'},
  ]
  let expected = '1 http://google.com\n2 google.com\n3 3google.com\n'
  let actual = helpers.convertToText(input)
  expect(actual).toBe(expected)
})

it('writeToRedirects()', function() {
  //setup
  if (!fs.existsSync('/tmp/target123')) {
    fs.mkdirSync('/tmp/target123')
  }

  let redirectsPath = '/tmp/target123/_redirects'
  fs.writeFileSync(redirectsPath)

  let input = '1 http://google.com\n2 google.com\n3 3google.com\n'
  // inpure function
  helpers.writeToRedirects(input)
  let content = fs.readFileSync(redirectsPath, 'utf8')
  expect(content).toBe(input)

  // teardown
  fs.unlinkSync(redirectsPath)
})
