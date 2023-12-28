const Task = require("../models/task.model")

// [get] /api/v1/task
module.exports.index = async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });
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
