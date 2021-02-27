'use strict';

const mongoose = require('mongoose');

const warnings = new mongoose.Schema({
  service_name: { type: String, required: true},
  type: { type: String},
  time: {type: Date, default: Date.now},
  description: {type: String},
  req_ip: {type: String},
  method: {type: String},
  target_url: {type: String},
  requester: {type: String},
});

module.exports = mongoose.model('warnings', warnings);

