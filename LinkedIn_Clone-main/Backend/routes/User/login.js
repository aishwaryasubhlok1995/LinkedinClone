const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../../config/database");

router.post("/login", function(request, response) {
  console.log("in request login", request.body.data);
  var sqlQuery =
    "SELECT * FROM users WHERE username = '" + request.body.username + "';";
  console.log(sqlQuery);

  kafka.make_request("linkedinlogin", request.body, function(err, results) {
    console.log("in linkedinlogin");
    console.log(results);
    if (results.status == 400) {
      console.log("Inside err");
      response.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      var data = { username: request.body.username };
      var token = jwt.sign(data, config.secret, { expiresIn: 600000 });
      console.log("token=", token);
      const newToken = "Bearer " + token;
      console.log("token=", newToken);
      response.send({
        updatedList: newToken
      });
    }
  });
});

module.exports = router;
