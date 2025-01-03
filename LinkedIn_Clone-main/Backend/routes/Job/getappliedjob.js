const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/getappliedjob", function(request, response) {
  console.log("AppliedJobs");
  kafka.make_request("getappliedjobs", request.body, function(err, results) {
    console.log("response from kafka for savedjobs",results);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      
      response.json({
        appliedjobs:results
    });
    response.end();
    }
  });
 
});

module.exports = router;
