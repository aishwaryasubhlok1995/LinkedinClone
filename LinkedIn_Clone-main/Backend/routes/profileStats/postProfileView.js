const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/postProfileView", function(request, response) {
  console.log("Profile Views", request.body);
  kafka.make_request("postProfileView", request.body, function(err, result) {
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
