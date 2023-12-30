const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    
title: String,
status: String,
content: String,
timeStart: Date,
timeFinish: Date,
createdBy: String,
listUser: Array,
taskParentId: String,
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true // thời gian tạo và cập nhật
});

const Task = mongoose.model("Task", taskSchema, "tasks"); 

module.exports = Task;  
