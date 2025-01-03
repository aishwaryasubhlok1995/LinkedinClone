const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/recruiterSavedJobs", function(request, response) {
  console.log("Job Saves: ", request.query);
  kafka.make_request("recruiterSavedJobs", request.query, function(
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
