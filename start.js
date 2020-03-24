require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose')

// import all of our models
require('./models/ShortUrlModel')

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.Promise = global.Promise

mongoose.connection.on('error', err => {
  console.error(`🚫  → ${err.message}`)
})

const app = require('./app');
app.set('port', process.env.PORT || 5050);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
