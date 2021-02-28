'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/modelFinder.js');

router.param('model', modelFinder);

const {getAll, getOneById, getAllByServiceName, createOne, deleteOne, deleteAll} = require('./routerHandler.js');

const gatewayValidation = require('../middleware/gatewayValidation.js');

// routes 
// This service only accept requests from API gateway.
router.use(gatewayValidation);

router.get('/:model', getAll);
router.get('/:model/service/:service_name', getAllByServiceName);
router.get('/:model/:id', getOneById);
router.post('/:model', createOne);
router.delete('/:model/:id', deleteOne);
router.delete('/:model', deleteAll);

module.exports = router;
