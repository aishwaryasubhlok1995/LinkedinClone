const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/searchJob", function(request, response) {
  console.log("Search Job Post Request");
  kafka.make_request("jobSearch_topic", request.body, function(err, results) {
    console.log("response from kafka saved",results);
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
});

module.exports = router;
