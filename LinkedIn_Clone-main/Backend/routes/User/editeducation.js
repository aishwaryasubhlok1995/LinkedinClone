const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/editeducation", function(request, response) {
    console.log("In insert school method");
    kafka.make_request("editeducation", request.body, function(
      err,
      results
    ) {
      console.log(results);
      if (err) {
        console.log("Inside err");
        response.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        response.json({
          updatedList: results
        });
        response.end();
      }
    });
});

module.exports = router;
