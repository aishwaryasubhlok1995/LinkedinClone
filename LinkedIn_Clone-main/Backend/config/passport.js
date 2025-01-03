// const mongoose = require("mongoose");
// const passport = require("passport");
// //var Users = require("../models/user");

// var ExtractJwt = require("passport-jwt").ExtractJwt;
// var JwtStrategy = require("passport-jwt").Strategy;

// var jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = "tasmanianDevil";

// passport.use(
//   new JwtStrategy(jwtOptions, (payload, done) => {
//     // console.log("PAYLOAD: ", payload);
//     Users.findOne({ email: payload.email }, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );

"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var db = require("../app/db");
var config = require("./database");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      db.findUser(
        { username: jwt_payload.username },
        function(res) {
          var user = res;
          delete user.password;
          callback(null, user);
        },
        function(err) {
          return callback(err, false);
        }
      );
    })
  );
};
