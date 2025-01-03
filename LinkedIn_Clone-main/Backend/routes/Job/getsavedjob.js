const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/getsavejob", function(request, response) {
  console.log("Saved Jobs");
  kafka.make_request("getsavedjobs", request.body, function(err, results) {
    console.log("response from kafka for savedjobs",results);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      
      response.json({
        savedjobs:results
    });
    response.end();
    }
  });
 
});

module.exports = router;
