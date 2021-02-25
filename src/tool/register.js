// This is the tool we use to registering our service with api gateway

'use strict';
require('dotenv').config();
const axios = require('axios');
const monitor = require('./monitor.js');

module.exports = async () =>{
  const reqConfig = {
    method: 'post',
    url: process.env.API_GATEWAY_URL,
    data: {
      service_name: 'monitorService',
      service_url: process.env.MY_URL,
    },
  };
  try {
    await axios(reqConfig);
    // if success connect to API gateway, record an event
    monitor('Monitor Service now connected to API Gateway', 'event', '200');
    // for dev only, delete when deploy
    console.log('Monitor Service now connected to API Gateway');
  }
  catch (error){
    
    monitor({description:'Monitor Service can NOT connect to API Gateway', error}, 'error', '410');

    // for dev only, delete when deploy
    console.log('gateway connection error');
  }
};

