const express = require('express')
const router = express.Router()
const controller = require('../controllers/exampleController')
const {catchErrors} = require('../handlers/errorHandlers')

router.get('/', (req, res) => {
  res.json({name: 'supercool app', version: 0.1})
})

// catchErrors are only needed for async/await
router.get('/hi', catchErrors(controller.hi))

module.exports = router
