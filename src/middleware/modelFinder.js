'use strict';
const errorModel = require('../model/errorModel.js');
const warningModel = require('../model/warningModel.js');
const eventModel = require('../model/eventModel.js');

module.exports = (req, res, next)=>{
  let model = req.params.model;

  switch (model) {
    case 'warnings':
      req.model = warningModel;
      next();
      return;
    case 'errors':
      req.model = errorModel;
      next();
      return;
    case 'events':
      req.model = eventModel;
      next();
      return;
    default:
      next();
      return;
  }
};

