const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  passWord: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Login', loginSchema);