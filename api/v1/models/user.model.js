const mongoose = require("mongoose");
const generate = require("../../../helpers/generate")
const userSchema = new mongoose.Schema({
    
fullName: String,
email: String,
password: String,
token: String, 
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true // thời gian tạo và cập nhật
});

const User = mongoose.model("User", userSchema, "users"); 

module.exports = User;  
