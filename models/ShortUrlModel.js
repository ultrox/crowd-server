const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const shortUrl = new mongoose.Schema({
  visited: {
    type: Number,
    default: 0
  },
  shortCode: {
    default: 0,
    type: Number
  },
  orgUrl: String,
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('ShortUrl', shortUrl);
