'use strict';
const monitor = require('../tool/monitor.js');


module.exports = (req,res,next) => {
  const error = 'The web resource you requested does not exist';
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.send(error);
  res.end();

  const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || 'No IP detected';
  const warningData = {
    ip,
    method: req.method,
    targetUrl: req.originalUrl,
  };

  monitor(warningData, 'warning', '404');
};
