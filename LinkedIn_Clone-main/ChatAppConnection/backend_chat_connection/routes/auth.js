var passport = require("passport");
var settings = require("../config/setting");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var crypt = require("../lib/crypt");
var User = require("../mongodb/user");
var kafka = require("../kafka/client");

router.post("/register", function(request, response) {
  kafka.make_request("registration", request.body, function(err, results) {
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

  // if (!req.body.username || !req.body.password) {
  //   res.json({ success: false, msg: "Please pass username and password." });
  // } else {
  //   var passwordHash;
  //   crypt.createHash(
  //     req.body.password,
  //     function(result) {
  //       passwordHash = result;
  //       var newUser = new User({
  //         username: req.body.username,
  //         password: passwordHash,
  //         firstName: req.body.firstName,
  //         lastName: req.body.lastName,
  //         created: new Date(),
  //         avatar: req.body.avatar
  //       });
  //       // save the user
  //       // Attempt to save the user
  //       newUser.save().then(
  //         newUser => {
  //           response.status(200).json({
  //             success: true,
  //             message: "create user successfully"
  //           });
  //         },
  //         err => {
  //           response.status(400).json({
  //             success: false,
  //             message: "unable to create user"
  //           });
  //         }
  //       );
  //     },
  //     function(err) {
  //       response.status(500).json({
  //         success: false,
  //         message: "there is a server problem"
  //       });
  //     }
  //   );
  // }
});

// router.post("/login", function(request, response) {
//   User.findOne(
//     {
//       username: request.body.username
//     },
//     function(err, user) {
//       if (err) {
//         //send the error
//       } else {
//         if (user === null) {
//           //user not found
//           response.status(401).json({
//             success: false,
//             message: "Authentication failed. User not found."
//           });
//         } else {
//           var userResponse = {
//             id: user._id,
//             username: user.username
//           };
//           crypt.compareHash(
//             request.body.password,
//             user.password,
//             function(error, isMatch) {
//               if (isMatch && !error) {
//                 var token = jwt.sign(userResponse, settings.secret, {
//                   expiresIn: 10080 // in seconds
//                 });
//                 //login successfully
//                 response.status(200).json({
//                   success: true,
//                   token: "JWT " + token
//                 });
//               } else {
//                 //password not match
//                 response.status(401).json({
//                   success: false,
//                   message: "Authentication failed. Passwords did not match."
//                 });
//               }
//             },
//             function(err) {
//               response.status(401).json({
//                 success: false,
//                 message: "Authentication failed. User not found."
//               });
//             }
//           );
//         }
//       }
//     }
//   );
// });

module.exports = router;
