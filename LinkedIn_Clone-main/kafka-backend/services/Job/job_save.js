var { mongoose } = require("../../db/mongoose");

var job = require("../../models/jobApplication");
function handle_request(msg, callback) {
  console.log(msg);
  var Job = new job({
    submitted: "no",
    emailID: msg.Userid,
    jobID: msg.jobid,
    savedTime:msg.timestamp,
    postedBy:msg.postedBy,
    firstname:msg.firstname,
    lastname:msg.lastname
  });

  Job.save().then(
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
