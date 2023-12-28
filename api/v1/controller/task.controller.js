const Task = require("../models/task.model")

// [get] /api/v1/task
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  console.log(req.query);
  if(req.query.status){
   find.status = req.query.status
  }

// sort
const sort = {};
if(req.query.sortKey && req.query.sortValue){
  sort[req.query.sortKey] = req.query.sortValue
}
//end sort

  const tasks = await Task.find(find).sort(sort);
  res.json(tasks);
};

// [get] /api/v1/task/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  try {
const task = await Task.findOne({
    _id: id,
    deleted: false
  })
  res.json(task);
  } catch(error){
    res.json("khong tim thay");
  }
  
};
