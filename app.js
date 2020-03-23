const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const errorHandlers = require('./handlers/errorHandlers')
const cors = require('cors')

const app = express()

/* serves up static files from the public folder. Anything in public/ will just
   be served up as the file it is
*/
app.use(express.static(path.join(__dirname, 'public')))

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

app.use(cors())
// finally handle our own routes!
app.use('/api', routes)

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// dev only errors
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

module.exports = app
