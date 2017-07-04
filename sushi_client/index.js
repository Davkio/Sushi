"use strict";

const config = require('./config.json');
const Client = require('./src/index.js');

var bot = new Client(config);

module.exports = bot;