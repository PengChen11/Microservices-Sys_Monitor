'use strict';
// for DEV only, disable this middleware when deploying


module.exports = (req, res, next) => {

  const ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || 'No IP detected';


 
  console.log('\n', `Web request from IP address: "${ip}" `, '\n', `  Using "${req.method}" method`, '\n', `  At ${new Date()}`, '\n', `  The requested URL is "${req.originalUrl}"`, '\n');
  
  next();
};
