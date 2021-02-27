// This is the tool we use to registering our service with api gateway

'use strict';
require('dotenv').config();
const axios = require('axios');
const monitor = require('./monitor.js');
const getToken = require('./getToken.js');

module.exports = async () =>{


  // step 1, sign in to get a token if it does not exsit
  if (!global.token) {
    await getToken();
  }

  // step 2, use the service token to register self with API gateway

  const reqConfig = {
    method: 'post',
    url: `${process.env.API_GATEWAY_URL}/service-register`,
    data: {
      service_name: 'monitorService',
      service_url: process.env.MY_URL,
    },
    headers: {
      Authorization: `Bearer ${global.token}`,
    },
  };
  try {
    const res = await axios(reqConfig);
    if (res.data != 'existing service'){

      // if success connect to API gateway for the 1st time, record an event
      monitor('Monitor Service now connected to API Gateway', 'event', '200');

      // remove when deploying
      console.log('Monitor Service now connected to API Gateway');
    }
    // for dev only, delete when deploy
  }
  catch (error){

    // this only works if the API gateway service registering route is broken, while system monitoring routes still works. if API gate way is totally broken, then nothing will work.
    
    monitor({description:'Monitor Service can NOT connect to API Gateway', error}, 'error', '410');

    // for dev only, delete when deploy
    console.log('gateway connection error');
  }
};