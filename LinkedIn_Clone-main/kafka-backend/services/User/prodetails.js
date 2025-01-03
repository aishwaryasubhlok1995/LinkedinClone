var Users = require("../../models/user");
require("../../db/mongoose");

function handle_request(msg, callback) {
  console.log("msg======", msg);
  Users.update(
    { email: msg.username },
    { $set: { jobTitle: msg.jobTitle, companyName: msg.company } },
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
