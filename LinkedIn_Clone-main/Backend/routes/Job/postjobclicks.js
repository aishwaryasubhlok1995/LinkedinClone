const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/postjobclicks", function(request, response) {
  console.log("Job CLicks", request.body);
  kafka.make_request("postjobclicks", request.body, function(err, result) {
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
