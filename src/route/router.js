'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/modelFinder.js');

router.param('model', modelFinder);

const {getAll, getOneById, getAllByServiceName, createOne, deleteOne, deleteAll} = require('./routerHandler.js');

const gatewayValidation = require('../middleware/gatewayValidation.js');

// routes 
router.get('/:model', gatewayValidation, getAll);
router.get('/:model/service/:service_name', gatewayValidation, getAllByServiceName);
router.get('/:model/:id', gatewayValidation, getOneById);
router.post('/:model', gatewayValidation, createOne);
router.delete('/:model/:id', gatewayValidation, deleteOne);
router.delete('/:model', gatewayValidation, deleteAll);

module.exports = router;
