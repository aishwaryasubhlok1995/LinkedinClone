const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/", function(request, response) {
  var msg = {
    messageType: "createChannel",
    messageBody: {
      _id: request.body._id,
      members: request.body.members
    }
  };

  kafka.make_request("channel", msg, function(err, results) {
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
  // let newChannel = new Channel({
  //   _id: request.body._id,
  //   members: request.body.members,
  //   created: new Date()
  // });
  // newChannel.save().then(
  //   newChannel => {
  //     response.status(200).json({
  //       success: true,
  //       message: "create channel successfully",
  //       channel: newChannel
  //     });
  //   },
  //   err => {
  //     response.status(400).json({
  //       success: false,
  //       message: "unable to create channel",
  //       channel: null
  //     });
  //   }
  // );
});

router.get("/:userId", function(request, response) {
  var msg = {
    messageType: "searchChannel",
    messageBody: {
      userId: request.params.userId
    }
  };

  kafka.make_request("channel", msg, function(err, results) {
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

  // //Search all channel that
  // const userId = request.params.userId;
  // if (userId) {
  //   const query = { members: userId };
  //   Channel.find(query, function(err, channels) {
  //     if (err) {
  //       response.status(400).json({
  //         success: false,
  //         message: "unable to retrieve channels",
  //         channels: []
  //       });
  //     } else {
  //       response.status(200).json({
  //         success: true,
  //         message: "Able to retrieve channels",
  //         channels: channels
  //       });
  //     }
  //   });
  // }
});

module.exports = router;
