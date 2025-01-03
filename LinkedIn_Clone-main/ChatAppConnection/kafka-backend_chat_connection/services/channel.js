var Channel = require("../mongodb/channel");

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  if (msg.messageType === "createChannel") {
    let newChannel = new Channel({
      _id: msg.messageBody._id,
      members: msg.messageBody.members,
      created: new Date()
    });
    newChannel.save().then(
      newChannel => {
        callback(null, {
          success: true,
          message: "create channel successfully",
          channel: newChannel
        });
      },
      err => {
        console.log("Unable to create channel:" + err);
        callback(null, {
          success: false,
          message: "unable to create channel",
          channel: null
        });
      }
    );
  }

  if (msg.messageType === "searchChannel") {
    const userId = msg.messageBody.userId;
    if (userId) {
      const query = { members: userId };
      Channel.find(query, function(err, channels) {
        if (err) {
          console.log("Unable to retrieve channels :" + err);
          callback(null, {
            success: false,
            message: "Unable to retrieve channels",
            channels: []
          });
        } else {
          callback(null, {
            success: true,
            message: "Able to retrieve channels",
            channels: channels
          });
        }
      });
    }
  }
}

exports.handle_request = handle_request;
