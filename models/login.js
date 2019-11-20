const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true
    },
    passWord: {
      type: Number,
      required: true
    },
    time: [
      {
        dateId: Number,
        dateTime: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

//POST
loginSchema.statics.createUser = function(payload) {
  // this === Model Login
  const user = new this(payload);
  return user.save();
  // todo.save returns a promise
};

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

//PATCH
loginSchema.statics.updateUserById = function(id, payload) {
  return this.findOneAndUpdate(id, payload,{_id:false});
  // return this.update(id, payload,{_id:false});
};

// compiling loginSchema into a model (OR CREATING A MODEL)
module.exports = mongoose.model("Login", loginSchema);
