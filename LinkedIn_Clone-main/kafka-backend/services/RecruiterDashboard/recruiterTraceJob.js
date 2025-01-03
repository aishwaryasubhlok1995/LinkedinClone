var { mongoose } = require("../../db/mongoose");

var jobApp = require("../../models/jobApplication");

var job = require("../../models/job");
var save_dict = {};
function handle_request(msg, callback) {
  var count;
  console.log("_______________________________ID:", msg);
  jobApp.find(
    {
      jobID: msg.jobid
    },
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        // console.log("Docs", doc);
        if (docs == null) {
          console.log(null);
          callback(null, null);
        } else if (docs) {
          console.log("In trace:", docs);
          callback(null, docs);
        }
      }
    }
  );
}

exports.handle_request = handle_request;
