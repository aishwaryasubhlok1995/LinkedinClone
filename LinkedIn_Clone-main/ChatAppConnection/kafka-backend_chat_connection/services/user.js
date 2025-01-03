var User = require("../mongodb/user");

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  if (msg.messageType === "getUserProfile") {
    console.log("Find all reservation from " + msg.messageBody.userId);
    const userId = msg.messageBody.userId;
    if (userId) {
      const query = { _id: userId };
      User.findOne(query, function(err, user) {
        if (err) {
          callback(null, {
            success: false,
            message: "unable to retrieve user",
            user: []
          });
        } else {
          console.log("User found:" + JSON.stringify(user));
          callback(null, {
            success: true,
            message: "User found",
            user: user
          });
        }
      });
    }
  }

  if (msg.messageType === "searchUser") {
    const keyword = msg.messageBody.search;
    const regex = new RegExp(keyword, "i");
    const query = {
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }]
    };

    User.find(query, function(err, users) {
      if (err) {
        //send the empty list of user
        console.log("User able to retrieve user ", err);
        callback(null, {
          success: false,
          message: "System err.",
          userList: []
        });
      } else {
        if (users === null) {
          //users not found
          console.log("User able to retrieve user ", users);
          callback(null, {
            success: false,
            message: "System err.",
            userList: []
          });
        } else {
          console.log("User found:" + JSON.stringify(users));
          callback(null, {
            success: true,
            message: "Users found",
            userList: users
          });
        }
      }
    });
  }
}

exports.handle_request = handle_request;
