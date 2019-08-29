const path = require('path');
const dotenv = require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = {
  PROJECT: path.resolve(__dirname, '../'),
  PUBLIC: path.resolve(__dirname, '../public/'),
  DIST: path.resolve(__dirname, '../public/assets/'),
  SRC: path.resolve(__dirname, '../src/'),
  // BrowserSync: {
  //   proxy: dotenv.parsed.SYNC_PROXY,
  //   port: dotenv.parsed.SYNC_PORT,
  //   notify: false,
  //   open: false,
  // }
};
