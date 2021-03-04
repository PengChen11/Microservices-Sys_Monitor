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

    // Pagination applied to get all routes
    const { page = 1, limit = 10 } = req.query;


    try{
      let result;
      switch(method){
        case 'getAll': {
          // excute query with service_name if it has one
          const service_name = req.query.service_name
            ? {service_name:req.query.service_name}
            : {};
          // execute query with page and limit values
          const records = await req.model.find(service_name)
            .limit(limit * 1)
            .skip((page-1) * limit)
            .exec();

          // get total documents in the Posts collection 
          const pageCount = await req.model.countDocuments(service_name);

          result = {
            records,
            totalPages: Math.ceil(pageCount / limit),
            currentPage: page,
          };

          break;
        }
        case 'getOneById':
          result = await req.model.findById(req.params.id);
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
const getOneById = handlerGenerator('getOneById');
const createOne = handlerGenerator('createOne');
const deleteOne = handlerGenerator('deleteOne');
const deleteAll = handlerGenerator('deleteAll');


module.exports = {getAll, getOneById, createOne,  deleteOne, deleteAll};
