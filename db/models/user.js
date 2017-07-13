'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');

module.exports = db.define('user', {
  name: Sequelize.STRING,
});


