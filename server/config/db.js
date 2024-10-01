const mongoose = require("mongoose");

const db = () => {
  try {
    mongoose
      .connect("MONGO_URI", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("mongoDB connected");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
