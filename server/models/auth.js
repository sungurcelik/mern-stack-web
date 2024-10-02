const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("auth", AuthSchema);
