const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const shortUrl = new mongoose.Schema({
  visited: {
    type: Number,
    default: 0
  },
  shortCode: String,
  orgUrl: String,
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('ShortUrl', shortUrl);
