'use strict';
const monitor = require('../tool/monitor.js');

module.exports = async (err, req, res, next) => {
  // for Dev only, remove when deploy.
  console.log('**** 500 **** error logger', err);
  res.statusCode = err.statusCode || 500;
  res.statusMessage = err.statusMessage || 'Server internal error occurred. Please try again later.';
  res.send( err.message_spec || 'Server internal error occurred. Please try again later.');
  res.end();

  const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || 'No IP detected';
  const errorData = {
    req_ip: ip,
    method: req.method,
    target_url: req.originalUrl,
    description: 'Server internal error occurred',
    error: err,
  };
 
  await monitor(errorData, 'error', '500');
};
