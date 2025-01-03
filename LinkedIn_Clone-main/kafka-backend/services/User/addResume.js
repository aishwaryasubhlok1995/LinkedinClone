var Users = require("../../models/user");
require("../../db/mongoose");

function handle_request(msg, callback) {
  Users.update(
    { email: msg.params.username },
    {
      $set: {
        resume: msg.body.url1
      }
    },
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
