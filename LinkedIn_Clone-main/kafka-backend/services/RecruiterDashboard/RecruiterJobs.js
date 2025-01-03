var Job = require("../../models/job");
require("../../db/mongoose");

function handle_request(msg, callback) {
  Job.find(
    {
      postedBy: msg.username
    },
    {
      _id: 1
    },
    function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        if (result.length !== 0) {
          callback(null, result);
        } else {
          callback(null, "Could not fetch job details.");
        }
      }
    }
  );
}

exports.handle_request = handle_request;
