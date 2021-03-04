'use strict';

const {server} = require( '../src/server.js' );
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose( server );
const errorModel = require( '../src/model/errorModel.js' );
const warningModel = require( '../src/model/warningModel.js' );
const eventModel = require( '../src/model/eventModel.js' );
const testingURL = process.env.TESTING_URL;
console.log = jest.fn();





describe ('routes tests', ()=>{

  const logObj = {
    service_name: 'testing',
    type: '500',
    time: new Date(),
    data: 'test data goes here',
  };

  let errorLog, warningLog, eventLog;

  beforeEach (async(done)=>{
    errorLog = await new errorModel(logObj).save();
    warningLog = await new warningModel(logObj).save();
    eventLog = await new eventModel(logObj).save();
  
    done();
  });
  
  afterEach(async(done)=>{
    await errorModel.deleteMany({});
    await warningModel.deleteMany({});
    await eventModel.deleteMany({});
    done();
  });

  it('testing to create a new log,', async ()=>{

    const errorLog = await mockRequest.post(`${testingURL}/errors`).send(logObj);
    expect (errorLog.body.service_name).toBe('testing');

    const warningLog = await mockRequest.post(`${testingURL}/warnings`).send(logObj);
    expect (warningLog.body.service_name).toBe('testing');

    const eventLog = await mockRequest.post(`${testingURL}/events`).send(logObj);
    expect (eventLog.body.service_name).toBe('testing');
  });

  it('testing to 500 error handlelr when create a new log,', async ()=>{
    const badLogObj = {
      type: '500',
      time: new Date(),
      data: 'test data goes here',
    };
    const errorLog = await mockRequest.post(`${testingURL}/errors`).send(badLogObj);
    expect (errorLog.status).toBe(500);

    const warningLog = await mockRequest.post(`${testingURL}/warnings`).send(badLogObj);
    expect (warningLog.status).toBe(500);

    const eventLog = await mockRequest.post(`${testingURL}/events`).send(badLogObj);
    expect (eventLog.status).toBe(500);
  });


  it('testing to get all logs,', async ()=>{

    const errorLogs = await mockRequest.get(`${testingURL}/errors`);
    expect (errorLogs.body.records.length).toBeGreaterThan(0);
    
    const warningLogs = await mockRequest.get(`${testingURL}/warnings`);
    expect (warningLogs.body.records.length).toBeGreaterThan(0);

    const eventLogs = await mockRequest.get(`${testingURL}/events`);
    expect (eventLogs.body.records.length).toBeGreaterThan(0);

  });

  it('testing to get one log,', async ()=>{

    const errorID = errorLog._id;
    const errorResult = await mockRequest.get(`${testingURL}/errors/${errorID}`);
    expect (errorResult.body.service_name).toBe('testing');

    const warningID = warningLog._id;
    const warningResult = await mockRequest.get(`${testingURL}/warnings/${warningID}`);
    expect (warningResult.body.service_name).toBe('testing');

    const eventID = eventLog._id;
    const eventResult = await mockRequest.get(`${testingURL}/events/${eventID}`);
    expect (eventResult.body.service_name).toBe('testing');
  });

  it('testing to get all logs by service name,', async ()=>{

    const errorServiceName = errorLog.service_name;
    const errorResult = await mockRequest
      .get(`${testingURL}/errors`)
      .query({service_name: errorServiceName});
    expect (errorResult.body.records[0].service_name).toBe('testing');

    const warningServiceName = warningLog.service_name;
    const warningResult = await mockRequest
      .get(`${testingURL}/warnings`)
      .query({service_name: warningServiceName});
    expect (warningResult.body.records[0].service_name).toBe('testing');

    const eventServiceName = eventLog.service_name;
    const eventResult = await mockRequest
      .get(`${testingURL}/events`)
      .query({service_name: eventServiceName});
    expect (eventResult.body.records[0].service_name).toBe('testing');
  });

  it('testing to delete one log,', async ()=>{

    const errorID = errorLog._id;
    const errorResult = await mockRequest.delete(`${testingURL}/errors/${errorID}`);
    expect (errorResult.status).toBe(200);

    const warningID = warningLog._id;
    const warningResult = await mockRequest.delete(`${testingURL}/warnings/${warningID}`);
    expect (warningResult.status).toBe(200);

    const eventID = eventLog._id;
    const eventResult = await mockRequest.delete(`${testingURL}/events/${eventID}`);
    expect (eventResult.status).toBe(200);
  });

  it('testing to delete all logs,', async ()=>{

    const errorResult = await mockRequest.delete(`${testingURL}/errors`);
    expect (errorResult.status).toBe(200);

    const warningResult = await mockRequest.delete(`${testingURL}/warnings`);
    expect (warningResult.status).toBe(200);

    const eventResult = await mockRequest.delete(`${testingURL}/events`);
    expect (eventResult.status).toBe(200);
  });

  it('testing to handle unknow route', async ()=>{

    const badReq = await mockRequest.get('/bad/request');
    expect(badReq.status).toBe(404);
  });

  it('testing to handle bad model path', async()=>{
    const badReq = await mockRequest.get(`${testingURL}/eventssss`);
    expect(badReq.status).toBe(404);
  });


});





