
var Users = require("../models/user");
require("../db/mongoose");

function handle_request(msg, callback) {
  Users.update(
    { email: msg.username },
    { $set: { school: msg.school, startyear: msg.startyear, endyear:msg.endyear} },
    function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;

