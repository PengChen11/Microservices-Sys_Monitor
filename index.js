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
const registerService = require('./src/tool/register.js');

registerService();

// heart beat func, update status with api gateway every miniute
setInterval(async()=>{
  registerService();
}, 60000);