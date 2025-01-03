var JobApplication = require("../../models/jobApplication");
require("../../db/mongoose");

function handle_request(msg, callback) {
  JobApplication.aggregate([
    {
      $project: {
        _id: 1,
        jobId: 1,
        submittedTime: 1,
        month: { $month: "$submittedTime" }
      }
    },
    {
      $match: {
        submittedTime: {
          $ne: null
        }
        // postedBy: msg.username
      }
    },
    {
      $group: {
        _id: { jobId: "$jobId", month: "$month" },
        count: { $sum: 1 },
        jobId: { $first: "$jobId" }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
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
