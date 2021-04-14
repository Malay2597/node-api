const fs = require('fs');
const bodyParser = require('body-parser');
const headers = require('../express/headers');

const validFileTypes = ['js'];

const requireFiles = (directory, app) => {
  fs.readdirSync(directory).forEach(fileName => {
  
    // Recurse if directory
    if (fs.lstatSync(`${directory}/${fileName}`).isDirectory()) {
      requireFiles(`${directory}/${fileName}`, app);
      return;
    }
    // Skip this file
    if (fileName === 'index.js' && directory === __dirname) return;

    // Skip unknown filetypes
    if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;

    // Require the file.
    const filePath = `${directory}/${fileName}`;
    console.log('-requiring : ', filePath);
    const module = require(filePath);

    if (module.init) {
      console.log('-initing : ', filePath);
      module.init(app);
    }
  });
};

const init = app => {
  // Config body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  headers.init(app);

  console.log('Registering routes & controllers ...');
  requireFiles(__dirname, app);
};

module.exports = {init}
