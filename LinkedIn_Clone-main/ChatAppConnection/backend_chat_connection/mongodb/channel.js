// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var channelSchema = new Schema({
  members: Array,
  created: Date
});

// the schema is useless so far
// we need to create a model using it
var Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
