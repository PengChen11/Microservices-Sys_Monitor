'use strict';

module.exports = (req, res, next) =>{
  console.log('gateway validation is called');
  next();
};

