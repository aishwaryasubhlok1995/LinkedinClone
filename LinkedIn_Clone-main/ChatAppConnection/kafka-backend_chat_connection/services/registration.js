var passport = require("passport");
var settings = require("../config/setting");
require("../config/passport")(passport);
var jwt = require("jsonwebtoken");
var crypt = require("../lib/crypt");
var User = require("../mongodb/user");

function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  if (!msg.username || !msg.password) {
    callback(null, {
      success: false,
      message: "Please provide username and password."
    });
  }
  var passwordHash;

  var passwordHash;
  crypt.createHash(
    msg.password,
    function(result) {
      passwordHash = result;

      var newUser = new User({
        username: msg.username,
        password: passwordHash,
        firstName: msg.firstName,
        lastName: msg.lastName,
        created: new Date(),
        avatar: msg.avatar
      });

      // save the user
      // Attempt to save the user

      newUser.save().then(
        newUser => {
          console.log("New user created : ", JSON.stringify(newUser));
          callback(null, {
            success: true,
            message: "Successfully created new user."
          });
        },
        err => {
          console.log("Error Creating User ", err);
          callback(null, {
            success: false,
            message: "There are some problems. Please try again"
          });
        }
      );
    },
    function(err) {
      console.log("Error Creating User ", err);
      callback(null, {
        success: false,
        message: "There are some problems. Please try again"
      });
    }
  );
}

exports.handle_request = handle_request;
