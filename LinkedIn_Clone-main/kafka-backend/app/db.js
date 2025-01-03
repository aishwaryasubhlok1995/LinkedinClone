"use strict";
var mysql = require("mysql");
var crypt = require("./crypt");
var config = require("../config/database");
var pool = require("../pool");
var db = {};

db.createUser = function(user, successCallback, failureCallback) {
  var passwordHash;

  crypt.createHash(user.password, function(res) {
    passwordHash = res;

    console.log("enscrypted password", passwordHash);
    var sqlQuery =
      "INSERT INTO  users(firstname,lastname,username,password) VALUES ( " +
      mysql.escape(user.firstname) +
      " , " +
      mysql.escape(user.lastname) +
      " , " +
      mysql.escape(user.username) +
      "," +
      mysql.escape(passwordHash) +
      ") ";
    console.log(sqlQuery);
    pool.getConnection(function(err, con) {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Could Not Get Connection Object");
      } else {
        con.query(sqlQuery, function(err, result) {
          if (err) {
            failureCallback(err);
          } else {
            console.log("INSERT RESULT: ", result);
            successCallback();
          }
        });
      }
    });
  });
};

db.findUser = function(user, successCallback, failureCallback) {
  console.log("db username" + user.username);
  console.log("db password" + user.password);
  var sqlQuery =
    "SELECT * FROM users WHERE username = '" + user.username + "' and isactive=1;";
  console.log(sqlQuery);

  pool.getConnection(function(err, con) {
    ("INSIDE POOL MAKE CONNECTION");
    if (err) {
      ("INSIDE POOL ERROR MAKING CONNECTION");
      failureCallback(err);
    } else {
      ("INSIDE POOL MADE CONNECTION");
      con.query(sqlQuery, function(err, rows) {
        if (err) {
          console.log("INSIDE SQL CANT CONNECT");
          failureCallback(err);
          console.log("in");
          return;
        }
        if (rows.length > 0) {
          console.log("data from login in db", rows);
          console.log("INSIDE SQL USER FOUND AND MAKING KEY");
          console.log("STRINGIFIED ROWS:", JSON.stringify(rows[0]));
          successCallback(rows[0]);
          console.log("insidesucces");
        } else {
          console.log("INSIDE SQL NO USER FOUND");
         
          failureCallback("User not found.");
          console.log("Wrong arf");
        }
      });
    }
  });

  /*SQL Caching with REDIS */
};

module.exports = db;
