'use strict';

function handlerGenerator (method){
  return async (req, res, next)=>{

    if (!req.model) {
      next();
      return;
    }

    const modelPath = req.params.model;
    // if requesting path is not those three supported paths,user get 404
    if (!['warnings', 'errors', 'events'].includes(modelPath)) {
      next();
      return;
    }

    try{
      let result;
      switch(method){
        case 'getAll':
          result = await req.model.find({});
          break;
        case 'getOneById':
          result = await req.model.findById(req.params.id);
          break;
        case 'getAllByServiceName':
          result = await req.model.find({service_name: req.params.service_name});
          break;
        case 'createOne':
          result = await new req.model(req.body).save();
          break;
        case 'deleteOne':
          result = await req.model.deleteOne({_id: req.params.id});
          break;
        case 'deleteAll':
          result = await req.model.deleteMany({});
          break;
      }
      res.json(result);
    }
    catch (err){
      next(err);
    }
  };
}

const getAll = handlerGenerator('getAll');
const getAllByServiceName = handlerGenerator('getAllByServiceName');
const getOneById = handlerGenerator('getOneById');
const createOne = handlerGenerator('createOne');
const deleteOne = handlerGenerator('deleteOne');
const deleteAll = handlerGenerator('deleteAll');


module.exports = {getAll, getOneById, getAllByServiceName, createOne,  deleteOne, deleteAll};
