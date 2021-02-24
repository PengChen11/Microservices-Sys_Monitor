'use strict';

const errorModel = require('../model/errorModel.js');
const warningModel = require('../model/warningModel.js');
const eventModel = require('../model/eventModel.js');

module.exports = async (data, modelSelector, type=undefined ) => {
  let model;
  
  switch (modelSelector){

    case 'warning':
      model = warningModel;
      break;
    case 'event':
      model = eventModel;
      break;
    default:
      model = errorModel;
      //Errors Obj contains data needs to be parsed.
      data = {
        ...data,
        error: {
          code: data.error.code,
          message: data.error.message,
          stack: data.error.stack,
        },
      };
      break;
  }

  try {
    const time = new Date();
    await new model({
      service_name: 'monitor',
      time: time.toISOString(),
      type,
      data: typeof(data)!='string'? JSON.stringify(data) : data,
    }).save();

  } catch (error){
    console.log('Error occourred when trying to record in DB', error);
  }
};