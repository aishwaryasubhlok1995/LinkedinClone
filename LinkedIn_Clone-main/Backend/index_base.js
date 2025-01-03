var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
var mysql = require("mysql");
var pool = require("./pool");
const port = process.env.PORT || 3001;
var passport = require("passport");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");
var requireAuth = passport.authenticate("jwt", { session: false });
var crypt = require("./app/crypt");
var db = require("./app/db");
app.use(morgan("dev"));
var kafka = require("./kafka/client");
require("./db/mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config/database");

//console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require("./config/passport")(passport);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "cmpe273_team2_linkedIn",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.post("/login", function(request, response) {
  console.log("in request login", request.body);
  db.findUser(
    {
      username: request.body.username,
      password: request.body.password
    },
    function(res) {
      console.log("db response", res);
      if (res == "User not found.") {
        resData = {
          status: 400
        };
        console.log("response value null");
        response.end(JSON.stringify(resData));
      } else {
        var user = {
          username: res.Username
        };
      }
      var passwordHash;

      console.log(res.password);
      crypt.createHash(request.body.password, function(res) {
        passwordHash = res;
      });
      console.log("hash=", passwordHash);
      // Check if password matches
      crypt.compareHash(
        request.body.password,
        res.password,
        function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, config.secret, {
              expiresIn: 10080 // in seconds
            });
            console.log("token=", token);
            const newToken = "Bearer " + token;
            console.log("token=", newToken);
            response.end(newToken);
          } else {
            resData = {
              status: 400
            };
            console.log("error");
            console.log(err);
            response.end(JSON.stringify(resData));
          }
        },
        function(err) {
          resData = {
            status: 400
          };
          console.log(err);
          response.end(JSON.stringify(resData));
        }
      );
    },
    function(err) {
      resData = {
        status: 400
      };
      console.log(err);
      response.end(JSON.stringify(resData));
    }
  );
});

app.listen(3001);
console.log("Server Listening on port 3001");
