// This is the tool used inside of minotor service to record system logs.

'use strict';
const errorModel = require('../model/errorModel.js');
const warningModel = require('../model/warningModel.js');
const eventModel = require('../model/eventModel.js');

module.exports = async (data, modelSelector, type=undefined ) => {
  let model;
  const time = new Date();
  // this payload is going to be recorded in DB
  let payload = {
    service_name: 'monitor',
    time: time.toISOString(),
    type,
    message: typeof(data)==='string'? data : undefined,
  };

  // Only events data came in as String, that's a general messages 
  switch (modelSelector){

    case 'event':
      model = eventModel;
      break;
    case 'warning':
      model = warningModel;
      // warning OBJ contains data needs to be parsed.
      payload = {
        ...payload,
        req_ip: data.req_ip,
        method: data.method,
        target_url: data.target_url,
        description: data.description,
      };
      break;
    default:
      model = errorModel;
      //Errors Obj contains data needs to be parsed.
      payload = {
        ...payload,
        req_ip: data.req_ip,
        method: data.method,
        target_url: data.target_url,
        description: data.description,
        message: data.error.message,
        code: data.error.code,
        stack: data.error.stack,
      };
      break;
  }

  try {
    
    await new model(payload).save();

  } catch (error){
    // in general, this only happens when connection to DB is lost. We will figure out anothe way to notify admin later.
    console.log('Error occourred when trying to record in DB', error);
  }
};