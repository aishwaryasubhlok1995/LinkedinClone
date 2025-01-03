var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  //"mongodb://root:cmpe273@ds211558.mlab.com:11558/linkedin_stimulation"
  "mongodb://localhost:27017/linkedin"
);

module.exports = { mongoose };
