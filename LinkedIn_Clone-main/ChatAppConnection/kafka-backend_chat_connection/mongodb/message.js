// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var messageSchema = new Schema({
  channelId: String,
  body: String,
  userId: String,
  created: Date
});

// the schema is useless so far
// we need to create a model using it
var Message = mongoose.model("Message", messageSchema);

module.exports = Message;
