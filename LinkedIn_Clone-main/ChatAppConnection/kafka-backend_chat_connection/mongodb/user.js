// grab the things we need
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: String,
  created: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model("User", userSchema);

module.exports = User;
