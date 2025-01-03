var { mongoose } = require("../../db/mongoose");
var jobdata = require("../../models/job");
function handle_request(msg, callback) {
  console.log("Inside Search Request:", msg);

  var Job;
  var Location;
  if (msg.Job == "") {
    Job = "Internship",
    Location="UnitedStates"
  } else {
    Job = msg.Job;
    Location=msg.Location
  }
  jobdata.find({
      title: Job,
      location:Location
    })
    .then(
      docs => {
        callback(null, docs);
        console.log(docs);
      },
      err => {
        console.log(err);
        res.code = "400";
        callback(null, "BAd Request");
      }
    );
}

exports.handle_request = handle_request;
