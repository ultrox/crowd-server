const mongoose = require('mongoose')
const ShortUrl = mongoose.model('ShortUrl')
const {isUrlValid, genResponseData} = require('../helpers')

/**
 * _ → Number
 * short code for specific url to save to db
 * NOTE: code is generated +1 to the last created from database
 *       not secure, but easy
 */

async function genShortCode() {
  const lastLink = await ShortUrl.findOne()
    .sort({field: 'asc', _id: -1})
    .limit(1)

  if (lastLink === null) {
    return 1
  }
  return lastLink.shortCode + 1
}

exports.createShortLink = async (req, res) => {
  const orgUrl = req.body.orgUrl

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

  const shortCode = await genShortCode()
  const newLink = new ShortUrl({
    shortCode,
    orgUrl: req.body.orgUrl,
  })

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
