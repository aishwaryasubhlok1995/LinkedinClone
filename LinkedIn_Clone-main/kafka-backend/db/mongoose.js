var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://34.212.99.86:27017/linkedin")
  .then(() => console.log("Connected to Mongo DB"))
  .catch(err => console.log("Error in connecting to Mongo DB ", err));

module.exports = { mongoose };
