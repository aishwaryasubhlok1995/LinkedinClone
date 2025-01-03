const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/", function(request, response) {
  var msg = {
    messageType: "createMessage",
    messageBody: {
      _id: request.body._id,
      channelId: request.body.channelId,
      body: request.body.body,
      userId: request.body.userId
    }
  };

  kafka.make_request("message", msg, function(err, results) {
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

  // let newMessage = new Message({
  //   _id: request.body._id,
  //   channelId: request.body.channelId,
  //   body: request.body.body,
  //   userId: request.body.userId,
  //   created: new Date()
  // });
  // newMessage.save().then(
  //   newMessage => {
  //     //calling to update channel

  //     response.status(200).json({
  //       success: true,
  //       message: "create message successfully",
  //       msg: newMessage
  //     });
  //   },
  //   err => {
  //     response.status(400).json({
  //       success: false,
  //       message: "unable to create message",
  //       msg: null
  //     });
  //   }
  // );
});

router.get("/:channelId", function(request, response) {
  var msg = {
    messageType: "searchMessage",
    messageBody: {
      channelId: request.params.channelId
    }
  };

  kafka.make_request("message", msg, function(err, results) {
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
  // const channelId = request.params.channelId;
  // if (channelId) {
  //   const query = { channelId: channelId };
  //   Message.find(query, function(err, messages) {
  //     if (err) {
  //       response.status(400).json({
  //         success: false,
  //         message: "unable to retrieve messages",
  //         messages: []
  //       });
  //     } else {
  //       response.status(200).json({
  //         success: true,
  //         message: "Able to retrieve messages",
  //         messages: messages
  //       });
  //     }
  //   });
  // }
});

module.exports = router;
