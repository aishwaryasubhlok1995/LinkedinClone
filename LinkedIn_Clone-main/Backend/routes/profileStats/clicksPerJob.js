const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/getClicksPerJob", function(request, response) {
  console.log("Job Clicks: ", request.query);
  kafka.make_request("get_clicksperjob", request.query, function(err, result) {
    console.log(result);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      response.send(result);
    }
  });
});

module.exports = router;
