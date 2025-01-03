var { mongoose } = require("../../db/mongoose");

var JobApplication = require("../../models/jobApplication");

function handle_request(msg, callback) {
  console.log("MSG+++++++", msg);
  JobApplication.find({
    jobID: msg.jobId
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
