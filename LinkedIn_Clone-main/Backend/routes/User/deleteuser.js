const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var pool = require("../../pool");
var express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../../config/database");

router.post("/delete", function(request, response) {
  console.log("in request login", request.body.data);
  var sqlQuery =
   " UPDATE users SET isactive = '0' WHERE username = '"+request.body.username+"';";
  console.log(sqlQuery);
  pool.getConnection(function(err, con) {
    if (err) {
      console.log("Error path");
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sqlQuery, function(err, result) {
        if (err) {
          response.end("oh");
        } else {
         console.log("results",result);
         response.send("ok");
          // var sqlQuery2 = "UPDATE users SET isactive = 'y', WHERE username = '"+request.body.username+"';";
          // console.log(sqlQuery2);
          // con.query(sqlQuery2, function(err, result) {
          //   if (err) {
          //     response.end("oh");
          //   } else {
          //    console.log("results",result);
          //   }
          // });
        }
        }
      );
    }
  });
});
 


module.exports = router;
