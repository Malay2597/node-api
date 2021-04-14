var mongoose = require('mongoose');
var User = mongoose.model('User');

// get users for specific page and size
getAll = (pageNumber = 1, pageSize) => {
  // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  const skip = (pageNumber - 1) * pageSize;
  return User.find({})
    .sort({
      _id: -1
    }) // get latest items
    .skip(skip)
    .limit(pageSize)
}

// get user count
getUserCount = async () => {
  const userCount = await User.countDocuments({}).exec();
  return userCount
}

const init = app => {
  const ROUTE = '/pageInfo';

  app.get(`${ROUTE}/`, async (req, res) => {
    try {
      const pageIndex = parseInt(req.query.pageNumber);
      const pageSize = parseInt(req.query.pageSize);
      const users = await getAll(pageIndex, pageSize);
      const userCount = await getUserCount();
      const response = {
        userInfo: users,
        length: userCount
      }
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err)
    }
  });
};

module.exports = {
  init
};
