/**
 * Created by kieranderfus on 7/13/17.
 */
'use strict';

const express = require('express');
const Router = express.Router();

Router.use('/', require('./campusApi'));
Router.use('/', require('./studentApi'));

module.exports = Router;