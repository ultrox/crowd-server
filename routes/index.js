const express = require('express')
const router = express.Router()
const controller = require('../controllers/exampleController')
const {
  createShortLink,
  getShortLink,
} = require('../controllers/shortUrlController')
const {catchErrors} = require('../handlers/errorHandlers')

router.get('/', (req, res) => {
  res.json({name: 'supercool app', version: 0.2})
})

// catchErrors are only needed for async/await
router.get('/hi', catchErrors(controller.hi))
router.post('/createShortLink', catchErrors(createShortLink))
router.get('/getShortLink/:shortcode', catchErrors(getShortLink))

module.exports = router
