const {spawnSync} = require('child_process')
const mongoose = require('mongoose')
const ShortUrl = mongoose.model('ShortUrl')
const {
  isUrlValid,
  genResponseData,
  cloneRepo,
  appendToRedirects,
  commitAndPush,
} = require('../helpers')

/**
 * _ → Number
 * short code for specific url to save to db
 * NOTE: code is generated +1 to the last created from database
 *       not secure, but easy
 */

async function genShortCode() {
  return Date.now().toString(32)
}

exports.createShortLink = async (req, res) => {
  const orgUrl = req.body.orgUrl
  const clientCustomCode = req.body.customCode

  if (!isUrlValid(orgUrl)) {
    throw new Error('Link is not Valid')
  }

  const existingLink = await ShortUrl.findOne({orgUrl: req.body.orgUrl})
  if (existingLink !== null) {
    const oldShortCode = existingLink.shortCode
    return res
      .status(200)
      .json(genResponseData(oldShortCode, existingLink._doc))
  }

  const shortCode = clientCustomCode || (await genShortCode())
  const newLink = new ShortUrl({
    shortCode,
    orgUrl: req.body.orgUrl,
  })
  spawnSync('ls', ['/tmp'])
  console.log('hello')
  cloneRepo()
  appendToRedirects(`${shortCode} ${req.body.orgUrl}\n`)
  commitAndPush('/tmp/target123')

  await newLink.save()
  return res.status(200).json(genResponseData(shortCode))
}

exports.getShortLink = async (req, res) => {
  const link = await ShortUrl.findOneAndUpdate(
    {shortCode: req.params.shortcode},
    {$inc: {visited: 1}},
    {new: true},
  ).exec()
  const {_doc, shortCode} = link
  res.status(200).json(genResponseData(shortCode, _doc))
}
