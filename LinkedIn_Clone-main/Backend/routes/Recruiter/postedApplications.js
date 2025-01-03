const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/recruiter/posted_applications", function(request, response) {
  console.log("In posted applications");
  kafka.make_request("posted_applications", request.user.username, function(
    err,
    results
  ) {
    console.log("in results");
    console.log(results);
    if (err) {
      console.log("Inside err");
      response.json({
        status: "BAD_REQUEST",
        error: {
          code: "400",
          description: err
        },
        payload: null
      });
    } else {
      console.log("Inside else");
      response.json({
        status: "OK",
        payload: results,
        data: "get posted applications success"
      });
    }
  });
});

module.exports = router;
