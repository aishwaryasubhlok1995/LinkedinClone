const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

//search properties based on user input
router.get("/getPropertyById/:jobId", function(req, res) {
  console.log("Inside getPropertyById GET Request");

  kafka.make_request("getJobById_topic", req.params, function(err, result) {
    console.log("result=", result);
    if (err) {
      res.json({
        status: "error",
        msg: "Error in fetching job details"
      });
    } else {
      res.status(200).send(JSON.stringify(result));
    }
  });
});

module.exports = router;
