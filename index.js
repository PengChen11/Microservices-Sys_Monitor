'use strict';
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');
const monitor = require('./src/tool/monitor.js');

const MONGODB_URI = process.env.MONGODB_URI;
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

async function connectDB () {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    monitor('Monitor service now connected to DB', 'event', '200');
  } catch (error){
    console.log('**** DB connection error',error);
  }
} 

connectDB();


server.start();

// register service with API gateway
const registerService = async () =>{

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
    
    console.log('Monitor Service now connected to API Gateway');
  }
  catch (error){

    monitor({description:'Monitor Service can NOT connect to API Gateway', error}, 'error', '410');
    console.log('gateway connection error');
  }
};

registerService().then(()=>{monitor('Monitor Service now connected to API Gateway', 'event', '200');});

setInterval(async()=>{
  registerService();
}, 60000);