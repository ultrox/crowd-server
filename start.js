require('dotenv').config({ path: 'variables.env' });

// import all of our models

const app = require('./app');
app.set('port', process.env.PORT || 5050);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
