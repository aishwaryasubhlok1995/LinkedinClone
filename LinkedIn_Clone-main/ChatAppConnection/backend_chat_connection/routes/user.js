var passport = require("passport");
//var settings = require("../config/setting");
require("../config/passport")(passport);
var express = require("express");
//var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../mongodb/user");
//var getToken = require("../lib/gettoken");
var mongoose = require("../lib/mongoconn");
var kafka = require("../kafka/client");

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

  //Search all channel that
  // const userId = request.params.userId;
  // if (userId) {
  //   const query = { _id: userId };
  //   User.findOne(query, function(err, user) {
  //     if (err) {
  //       response.status(400).json({
  //         success: false,
  //         message: "unable to retrieve user",
  //         user: []
  //       });
  //     } else {
  //       response.status(200).json({
  //         success: true,
  //         message: "Able to retrieve user",
  //         user: user
  //       });
  //     }
  //   });
  // }
});

module.exports = router;
