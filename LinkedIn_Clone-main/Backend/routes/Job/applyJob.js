const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/applyJob", function(request, response) {
  console.log("Save Job Post Request");
  kafka.make_request("jobApply_topic", request.body, function(err, results) {
    console.log("response from kafka",results);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      
      response.json({
        updatedList:results
    });
    response.end();
    }
  });
  // console.log(request.body);
  // var save = new Applyjob({
  //   JobID: req.body.jobid,
  //   Timestamp: req.body.timestamp,
  //   UserID: "Kesha@gmail.com"
  // });
  // save.save().then(docs => {
  //   console.log("Row Created : ", docs);
  //   response.end("ok");
  // });
});

module.exports = router;
