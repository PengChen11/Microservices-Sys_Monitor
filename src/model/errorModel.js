'use strict';

const mongoose = require('mongoose');

const errors = new mongoose.Schema({
  service_name: { type: String, required: true},
  type: { type: String},
  time: {type: Date, default: Date.now},
  description: {type: String},
  message:{type: String},
  code: {type: String},
  stack: {type: String},
  req_ip: {type: String},
  method: {type: String},
  target_url: {type: String},

});

module.exports = mongoose.model('errors', errors);

