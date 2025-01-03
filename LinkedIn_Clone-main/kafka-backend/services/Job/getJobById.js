var { mongoose } = require("../../db/mongoose");

var Job = require("../../models/job");

function handle_request(msg, callback) {
  Job.find({
    _id: msg.jobId
  }).then(
    result => {
      callback(null, result);
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
