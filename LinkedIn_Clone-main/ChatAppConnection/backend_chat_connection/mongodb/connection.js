// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var connectionSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  requestedConnections: Array,
  acceptedConnections: Array
});

// the schema is useless so far
// we need to create a model using it
var Connection = mongoose.model("Connection", connectionSchema);

module.exports = User;
