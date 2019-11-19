const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: Number,
    required: true
  },
  time: {
    type: Number
  }
},
  {
    timestamps:true
  }
);


//POST
loginSchema.statics.createUser = function(payload) {
  // this === Model Login
  const user = new this(payload);
  return user.save();
  // todo.save returns a promise
}

// Find All
loginSchema.statics.findAll = function() {
  return this.find(
    {},
    {
      _id: false,
      id: true,
      content: true,
      completed: true
    }
  ).sort({ id: "desc" });
};

loginSchema.statics.getTime = function(){
  return this.find({})
}

//PATCH
loginSchema.statics.updateUserById = function(id, payload) {
  return this.findOneAndUpdate(id,payload);
}

// compiling loginSchema into a model (OR CREATING A MODEL)
module.exports = mongoose.model('Login', loginSchema);
