var Message = require("../mongodb/message");

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  if (msg.messageType === "createMessage") {
    let newMessage = new Message({
      _id: msg.messageBody._id,
      channelId: msg.messageBody.channelId,
      body: msg.messageBody.body,
      userId: msg.messageBody.userId,
      created: new Date()
    });
    newMessage.save().then(
      newMessage => {
        //calling to update channel
        callback(null, {
          success: true,
          message: "create message successfully",
          msg: newMessage
        });
      },
      err => {
        console.log("Unable to create channel:" + err);
        callback(null, {
          success: false,
          message: "unable to create message",
          msg: null
        });
      }
    );
  }

  if (msg.messageType === "searchMessage") {
    const channelId = msg.messageBody.channelId;
    if (channelId) {
      const query = { channelId: channelId };
      Message.find(query, function(err, messages) {
        if (err) {
          console.log("Unable to retrieve messages :" + err);
          callback(null, {
            success: false,
            message: "unable to retrieve messages",
            messages: []
          });
        } else {
          callback(null, {
            success: true,
            message: "Able to retrieve messages",
            messages: messages
          });
        }
      });
    }
  }
}

exports.handle_request = handle_request;
