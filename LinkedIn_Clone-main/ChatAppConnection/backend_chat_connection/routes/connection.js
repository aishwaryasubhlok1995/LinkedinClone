var passport = require("passport");
var settings = require("../config/setting");
require("../config/passport")(passport);
var express = require("express");
//var jwt = require("jsonwebtoken");
var router = express.Router();
//var mongoose = require("../lib/mongoconn");
var kafka = require("../kafka/client");

router.post("/", function(request, response) {
  var msg = {
    messageType: "connectuser",
    messageBody: {
      connector: request.body.connector,
      connectee: request.body.connectee
    }
  };

  kafka.make_request("connection", msg, function(err, results) {
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

router.post("/accept", function(request, response) {
  var msg = {
    messageType: "acceptconnection",
    messageBody: {
      connector: request.body.connector,
      connectee: request.body.connectee
    }
  };

  kafka.make_request("connection", msg, function(err, results) {
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

router.post("/reject", function(request, response) {
  var msg = {
    messageType: "rejectconnection",
    messageBody: {
      connector: request.body.connector,
      connectee: request.body.connectee
    }
  };

  kafka.make_request("connection", msg, function(err, results) {
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

router.get("/:userId", function(request, response) {
  var msg = {
    messageType: "getconnection",
    messageBody: {
      userId: request.params.userId
    }
  };

  kafka.make_request("connection", msg, function(err, results) {
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

router.get("/sent/:userId", function(request, response) {
  var msg = {
    messageType: "getRequestedConnection",
    messageBody: {
      userId: request.params.userId
    }
  };

  kafka.make_request("connection", msg, function(err, results) {
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
