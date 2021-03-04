'use strict';
const axios = require('axios');
require('dotenv').config();

module.exports = async() =>{
  const username = process.env.SERVICE_USERNAME;
  const password = process.env.SERVICE_PASSWORD;

  try {
    const {data} = await axios({
      method: 'post',
      url: `${process.env.API_GATEWAY_URL}/auth/signin`,
      auth: {
        username,
        password,
      },
    });
    global.token = data.token;
    return data.token;
    
  } catch (error){
    console.log('System Monitor service can NOT login through API gateway right now.');

    // if you can NOT get a token, there's nothing you can do, you won't be able to send logs to the system monitoring service.
    // we will figure out another way to handle this later
  }
};