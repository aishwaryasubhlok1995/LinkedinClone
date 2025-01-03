var db = require("../../app/db");
// var pool = require("../pool");
var Users = require("../../models/user");
require("../../db/mongoose");

function handle_request(msg, callback) {
  var username = msg.username.toLowerCase();
  var newUser = {
    username: username,
    password: msg.password,
    firstname: msg.firstname,
    lastname: msg.lastname
  };

  // Attempt to save the user
  db.createUser(
    newUser,
    function(res) {
      console.log("user created");
      //save user details in MongoDB
      var user = new Users({
        email: username.toLowerCase(),
        firstname: msg.firstname,
        lastname: msg.lastname
      });

      console.log("USER+++++++", user);
      user.save().then(
        user => {
          console.log("Sign-up successful.");
          callback(null, user);
        },
        err => {
          console.log("Could not sign-up");
          callback(null, []);
        }
      );
    },
    function(err) {
      console.log("error creating user");
      console.log(err);
      callback(null, "error");
    }
  );
}

exports.handle_request = handle_request;
