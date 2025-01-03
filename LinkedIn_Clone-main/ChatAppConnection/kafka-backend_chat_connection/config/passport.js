var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../mongodb/user");

var config = require("./setting");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      User.findOne(
        {
          username: jwt_payload.username
        },
        function(err, user) {
          if (err) {
            return callback(err, false);
          }
          delete user.password;
          callback(null, user);
        }
      );
    })
  );
};
