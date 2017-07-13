/**
 * Created by kieranderfus on 7/10/17.
 */
const Sequelize = require('sequelize');
const db = require('../index.js');

module.exports = db.define('student', {
    name: Sequelize.STRING,
    email: Sequelize.STRING
});


