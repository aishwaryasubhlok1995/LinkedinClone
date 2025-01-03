const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/getRecruiterDashboardTop5/:username", function(request, response) {
  console.log("Recruiter Dashboard Top 5 Post Request");
  kafka.make_request("recruiterDashboardTop5_topic", request.params, function(
    err,
    results
  ) {
    console.log(results);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      response.send(JSON.stringify(results));
    }
  });
});

module.exports = router;
