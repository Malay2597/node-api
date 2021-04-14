const mongoose = require('mongoose');
const {
  databaseConfig
} = require('./constants')
// Add User Model
require('../models/users')

const dbHelper = {
  // Database configurations
  options: {
    dbName: databaseConfig.databaseName,
    user: databaseConfig.userName,
    pass: databaseConfig.password,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  mongoDbConnection: null,

  // connect to database
  intitialse: async () => {
    console.log('Initialise MongoDb Connection');
    try {
      await mongoose.connect(databaseConfig.uri, dbHelper.options);
      dbHelper.mongoDbConnection = mongoose.connection;
      console.log('Connected to ' + databaseConfig.uri)
    } catch (err) {
      dbHelper.mongoDbConnection.close();
      console.log('Mongoose connection error: ' + err);
      throw err;
    }
  }
}

module.exports = {
  dbHelper
}
