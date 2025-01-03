var JobApplication = require("../../models/jobApplication");
require("../../db/mongoose");

function handle_request(msg, callback) {
  JobApplication.aggregate([
    {
      $match: {
        submittedTime: {
          $ne: null
        },
        postedBy: msg.username
      }
    },
    {
      $group: {
        _id: { jobId: "$jobId" },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: 1 } },
    { $limit: 5 }
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
