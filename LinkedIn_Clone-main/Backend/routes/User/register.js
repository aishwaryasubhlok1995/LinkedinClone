const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/register", function(request, response) {
  console.log("In signup method");
  kafka.make_request("linkedinsignup", request.body, function(err, results) {
    if (err) {
      console.log("Inside err");
      response.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else if (results === "error") {
      console.log("Inside err");
      response.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("IN reg success", results);
      console.log("IN reg success JSON", JSON.stringify(results));
      response.send(JSON.stringify(results));
    }
  });
});

module.exports = router;
