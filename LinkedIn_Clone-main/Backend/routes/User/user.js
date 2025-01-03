const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/search", function(request, response) {
  var msg = {
    messageType: "searchUser",
    messageBody: {
      search: request.body.search
    }
  };

  kafka.make_request("user", msg, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      response.status(401).json({
        success: "false",
        message: "System Error. Try Again."
      });
    } else {
      console.log("Inside else");
      if (results.success == true) response.status(200).json(results);
      else response.status(400).json(results);
      response.end();
    }
  });
  // const keyword = request.body.search;
  // const regex = new RegExp(keyword, "i");
  // const query = {
  //   $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }]
  // };

  // User.find(query, function(err, users) {
  //   if (err) {
  //     //send the empty list of user
  //     response.status(401).json({
  //       success: false,
  //       message: "System err.",
  //       userList: []
  //     });
  //   } else {
  //     if (users === null) {
  //       //users not found
  //       response.status(401).json({
  //         success: false,
  //         message: "System err.",
  //         userList: []
  //       });
  //     } else {
  //       response.status(200).json({
  //         success: true,
  //         message: "Users found",
  //         userList: users
  //       });
  //     }
  //   }
  // });
});

router.get("/:userId", function(request, response) {
  var msg = {
    messageType: "getUserProfile",
    messageBody: {
      userId: request.params.userId
    }
  };
  kafka.make_request("user", msg, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      response.status(401).json({
        success: "false",
        message: "System Error. Try Again."
      });
    } else {
      console.log("Inside else");
      if (results.success == true) response.status(200).json(results);
      else response.status(400).json(results);
      response.end();
    }
  });
});

router.get("/findBy/:email", function(request, response) {
  var msg = {
    messageType: "getUserProfileByEmail",
    messageBody: {
      email: request.params.email
    }
  };
  kafka.make_request("user", msg, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      response.status(401).json({
        success: "false",
        message: "System Error. Try Again."
      });
    } else {
      console.log("Inside else");
      if (results.success == true) response.status(200).json(results);
      else response.status(400).json(results);
      response.end();
    }
  });
});

module.exports = router;
