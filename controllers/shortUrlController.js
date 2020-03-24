const mongoose = require('mongoose')
const ShortUrl = mongoose.model('ShortUrl')

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
  const shortCode = await genShortCode(req.body.orgUrl)
  const link = new ShortUrl({
    shortCode,
    orgUrl: req.body.orgUrl,
  })

  await link.save()
  res.status(200).json({
    data: {
      shortLink: process.env.BASE_URL + `/${shortCode}`,
    },
  })
}

exports.getShortLink = async (req, res) => {
  const link = await ShortUrl.findOneAndUpdate(
    {shortCode: req.params.shortcode},
    {$inc: {visited: 1}},
    {new: true},
  ).exec()
  res.status(200).json(link)
}
