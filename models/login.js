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
  },
  time: {
    type: Number
  }
});

// compiling loginSchema into a model (OR CREATING A MODEL)
module.exports = mongoose.model('Login', loginSchema);