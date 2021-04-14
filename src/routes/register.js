var mongoose = require('mongoose');
var User = mongoose.model('User');

const init = app => {
  const ROUTE = '/register';

  app.post(`${ROUTE}/`, (req, res) => {
    var user = new User();
    user.firstname = req.body.firstname;
    user.email = req.body.email;
    user.lastname = req.body.lastname;

    user.setPassword(req.body.password);

    if (user.firstname && user.lastname) {
      user.save(function (err) {
        if (err) {
          if (11000 === err.code || 11001 === err.code) {
            res.status(404).json({
              message: "User already registered with this email"
            });
            return;
          }
        }
        res.status(200);
        res.json({
          success: true
        });
      });
    } else {
      res.status(404).json({
        message: "missing firstname or lastname"
      });
    }

  });
};

module.exports = {
  init
};