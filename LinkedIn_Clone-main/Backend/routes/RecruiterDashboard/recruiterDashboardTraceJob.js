const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/recruiterTraceJobs", function(request, response) {
  console.log("In recruiter Trace Job");
  console.log("Job Saves: ", request.query);
  kafka.make_request("recruiterTraceJobs", request.query, function(
    err,
    result
  ) {
    console.log(result);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      console.log("SAVED RES DICT:", result);
      response.send(result);
    }
  });
});

module.exports = router;
