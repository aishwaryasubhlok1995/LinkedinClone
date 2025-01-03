require("../../db/mongoose");
var db = require("../../app/db");
var crypt = require("../../app/crypt");
var jwt = require("jsonwebtoken");
var config = require("../../config/database");

function handle_request(msg, callback) {
  db.findUser(
    {
      username: msg.username,
      password: msg.password
    },
    function(res) {
      // console.log("db response", res);
      console.log("res1====", res);
      if (res == "User not found.") {
        resData = {
          status: 400
        };
        console.log("response value null");
        callback(null, resData);
      } else {
        var user = {
          username: res.Username
        };

        var passwordHash;
        console.log("Password is" + msg.password);
        console.log(res.password);
        crypt.createHash(msg.password, function(res) {
          passwordHash = res;
        });
        console.log("hash=", passwordHash);
        // Check if password matches
        crypt.compareHash(
          msg.password,
          res.password,
          function(err, isMatch) {
            if (isMatch) {
              // Create token if the password matched and no error was thrown
              console.log("MATCHED");
              var data = { username: msg.username };
              var token = jwt.sign(data, config.secret, { expiresIn: 600000 });
              console.log("token=", token);
              const newToken = "Bearer " + token;
              console.log("token=", newToken);
              callback(null, newToken);
            } else {
              console.log("NOT MATCHED");
              resData = {
                status: 400
              };
              console.log("error");
              console.log(err);
              callback(null, resData);
            }
          },
          function(err) {
            resData = {
              status: 400
            };
            console.log(err);
            callback(null, resData);
          }
        );
      }
    },
    function(err) {
      resData = {
        status: 400
      };
      console.log(err);
      callback(null, resData);
    }
  );
}

exports.handle_request = handle_request;
