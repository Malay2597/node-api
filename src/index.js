const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
var passport = require('passport');
const routes = require('./routes');
const { dbHelper } = require('./helpers/dbHelper');

const app = express();
// Add env config
require('dotenv').config();

// Add middleware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())
app.use(passport.initialize());

(async () => {
  // Create connection
  await dbHelper.intitialse();
  // Register routes
  try {
    routes.init(app);
  } catch (err) {
    console.log(err + 'error')
  }

  const appStartedCallback = () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  };

  // Start app
  const server = app.listen(process.env.PORT, appStartedCallback);
  server.setTimeout(3720000); // 1hr and 2mins
})();