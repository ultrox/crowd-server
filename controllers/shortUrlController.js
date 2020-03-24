const mongoose = require('mongoose')
const ShortUrl = mongoose.model('ShortUrl')

/**
 * String → String
 * short code for specific url to save to db
 */
// TODO genShortCode
function genShortCode(url) {
  return "google"
}

exports.createShortLink = async (req, res) => {
  const BASE_URL = 'http://crowd.com/'
  const shortCode = genShortCode(req.body.orgUrl)
  const link = new ShortUrl({
    shortCode,
    orgUrl: req.body.orgUrl,
  })

  await link.save()
  res.status(200).json({
    data: {
      shortLink: BASE_URL + `${shortCode}`,
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
