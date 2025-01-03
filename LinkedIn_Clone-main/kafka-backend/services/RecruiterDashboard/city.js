var JobApplication = require("../../models/jobApplication");
require("../../db/mongoose");

function handle_request(msg, callback) {
  JobApplication.aggregate([
    {
      $match: {
        submittedTime: {
          $ne: null
        },
        jobId: msg.jobId
      }
    },
    {
      $group: {
        _id: { city: "$city", month: { $month: "$submittedTime" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { city: 1 } }
  ]).then(
    result => {
      if (result.length !== 0) {
        callback(null, result);
      } else {
        callback(null, "There is no data");
      }
    },
    err => {
      callback(err, "Error");
    }
  );
}

exports.handle_request = handle_request;
