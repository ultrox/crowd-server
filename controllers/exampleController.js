const mongoose = require('mongoose')
const ShortUrl = mongoose.model('ShortUrl')

exports.hi = async (req, res, next) => {
  const ids = [
    '5e7a1010f7b155860d2b2c09',
    '5e7a24a99a72ba0017af75bc',
    '5e7a24c59a72ba0017af75bd',
    '5e7a25af9a72ba0017af75be',
  ]
  let result = await ShortUrl.deleteMany({_id: {$in: ids}}).catch(err =>
    res.send(err),
  )
  res.send(result)
}
