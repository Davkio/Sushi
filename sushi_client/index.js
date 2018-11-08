"use strict";

const config = require('./config.json');
const Client = require('./src/index.js').default;

var bot = new Client(config);

module.exports = bot;