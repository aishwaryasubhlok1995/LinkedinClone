const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.get("/searchUserByName/:name/:username", function(request, response) {
  console.log("Get searchUserByName GET Request");
  console.log("REQ+++++", request.params);
  kafka.make_request("searchUserByName_topic", request.params, function(
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
