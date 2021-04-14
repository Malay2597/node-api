var passport = require('passport');
// Add passport config
require('../helpers/passport')

const init = app => {
  const ROUTE = '/login';
  app.post(`${ROUTE}/`, (req, res) => {
    passport.authenticate('local', function (err, user, info) {
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // Return that user is found
      if (user) {
        res.status(200).json({
          success: true
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);

  });
};

module.exports = {
  init
};
