// this is the test for monitoring tool
'use strict';
const {server} = require( '../src/server.js' );
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose( server );
const errorModel = require( '../src/model/errorModel.js' );
const warningModel = require( '../src/model/warningModel.js' );
const eventModel = require( '../src/model/eventModel.js' );
const testingURL = process.env.TESTING_URL;
console.log = jest.fn();
const monitor = require('../src/tool/monitor.js');

const data = {
  ip: '0.0.0.0',
  data: 'testing data',
};

const errorSample = {
  ip: '0.0.0.0',
  error: {
    code: 'test error',
    message: 'this is a test',
    stack: 'this is a test',
  },
};

describe('testing for monitor tool', async()=>{

  afterAll(async(done)=>{
    await errorModel.deleteMany({});
    await warningModel.deleteMany({});
    await eventModel.deleteMany({});
    done();
  });

  it('testing for pushing warning log to DB', async()=>{
    const before = await mockRequest.get(`${testingURL}/warnings`);
    expect(before.body.length).toBe(0);

    monitor(data, 'warning', '404');

    const after = await mockRequest.get(`${testingURL}/warnings`);
    expect(after.body.length).toBe(1);
  });

  it('testing for pushing event log to DB', async()=>{
    const before = await mockRequest.get(`${testingURL}/events`);
    expect(before.body.length).toBe(0);

    monitor(data, 'event', '200');

    const after = await mockRequest.get(`${testingURL}/events`);
    expect(after.body.length).toBe(1);
  });

  it('testing for pushing error log to DB', async()=>{
    const before = await mockRequest.get(`${testingURL}/errors`);
    expect(before.body.length).toBe(0);

    monitor(errorSample, 'error', '500');

    const after = await mockRequest.get(`${testingURL}/errors`);
    expect(after.body.length).toBe(1);
  });
});