const express = require("express");
const router = express.Router();


const Task = require("../../../models/task.model")

router.get("/", async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });

  
  res.json(tasks);
});

router.get("/detail/:id", async (req, res) => {
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
  
});

module.exports = router;