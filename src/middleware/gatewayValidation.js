'use strict';
require('dotenv').config();

module.exports = (req, res, next) =>{
  // const allowedIPs = process.env.ALLOWED_IP.split(',');

  // if (!allowedIPs.includes(req.ip)) {
  //   res.statusCode = 404;
  //   res.send( 'The web resource you requested does not exsit');
  //   res.end();
  //   return;
  // }
  next();
};

