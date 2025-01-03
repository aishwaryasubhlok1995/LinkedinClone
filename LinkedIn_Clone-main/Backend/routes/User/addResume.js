const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/addProfileResume/:username", function(request, response) {
  console.log("In addProfileResume method");

  kafka.make_request(
    "addProfileResume_topic",
    { body: request.body, params: request.params },
    function(err, results) {
      console.log(results);
      if (err) {
        response.json({
          status: "error",
          msg: "Error in retrieving data."
        });
      } else {
        response.send(JSON.stringify(results));
      }
    }
  );
});

module.exports = router;
