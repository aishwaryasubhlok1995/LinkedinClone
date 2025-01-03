var Users = require("../models/user");
require("../db/mongoose");

function handle_request(msg, callback) {
  console.log("msg======", msg);
  Users.update(
    { email: msg.username },
    { $set: { skills: msg.skills,
         } },
    function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        console.log("Data Updated");
        callback(null, result);
      }
    }
  );
}

exports.handle_request = handle_request;
