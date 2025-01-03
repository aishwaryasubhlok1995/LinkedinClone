var Jobs = require("../../models/job");

function handle_request(msg, callback) {
  Object.keys(msg.clicks).forEach(job => {
    console.log("JOBBBB:", job, typeof msg.clicks[job]);
    var cl = parseInt(msg.clicks[job]);

    Jobs.update({ _id: job }, { $inc: { clicks: cl } })
      .then(docs => {
        console.log("IN JOB CLICK POST THEN", docs);
        callback(null, msg);
      })
      .catch(err => {
        console.log("IN JOB CLICK POST CATCH", err);
        callback(err.errmsg), [];
      });
  });
}
exports.handle_request = handle_request;
