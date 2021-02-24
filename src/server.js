'use strict';
require('dotenv').config();

const monitor = require('./tool/monitor.js');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// only used in development stage. Once all done, get rid of this console log.
const logger = require('./middleware/logger.js');
app.use(logger);

//different routers 
const router = require('./route/router.js');
app.use('/api/v1',router);


// routes error handlers
const fourOfour = require('./middleware/404');
app.use('*', fourOfour);
const svrErrors = require('./middleware/error');
app.use(svrErrors);


module.exports={
  server: app,
  start: (port) => {
    const PORT = process.env.PORT || 4442;
    app.listen(PORT, ()=> {
      monitor('System Monitoring Service is now online', 'event', '200');
      // for Dev only, remove when deploy
      console.log(`System Monitoring Service is now listening on port ${PORT}`);
    },
    );
  },
};