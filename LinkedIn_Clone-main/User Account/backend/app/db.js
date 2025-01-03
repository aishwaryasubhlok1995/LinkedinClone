"use strict";
var mysql = require("mysql");
var crypt = require("./crypt");
var config = require("../config/settings");
var pool = require("../pool");
var db = {};
// var {mongoose} = require('../db/mangoose');
// var {Users} = require('../models/users');
// var {UserInfo}=require('../models/userinfo');
// Creating a connection object for connecting to mysql database
var connection = mysql.createConnection({
  host: config.database_host,
  limit: config.connectionLimit,
  port: config.database_port,
  user: config.database_user,
  password: config.database_password,
  database: config.database_name
  //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

//Connecting to database
pool.getConnection(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

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

    var sql2 =
      "INSERT INTO userdetails(username,firstname,lastname) VALUES ( " +
      mysql.escape(user.username) +
      "," +
      mysql.escape(user.firstname) +
      "," +
      mysql.escape(user.lastname) +
      ")";
    console.log(sql2);

    connection.query(sqlQuery, function(err) {
      if (err) {
        console.log("in usertable");
        console.log(err);
      } else {
        connection.query(sql2, function(err) {
          if (err) {
            console.log("in userdetails");
            console.log(err);
            failureCallback(err);
            return;
          } else {
            console.log("Success");
            successCallback();
          }
        });
      }
    });
  });
  // var userdata = new Users({
  //     firstname : user.firstname,
  //     lastname : user.lastname,
  //     username : user.username,
  //     plainpassword : user.password,
  //     password : passwordHash
  // });
  // var userinfo=new UserInfo(
  //     {
  //         firstname : user.firstname,
  //         lastname : user.lastname,
  //         username:user.username
  //     }
  // );
  // console.log(userdata);
  // //MongoDB method for insertion
  // userdata.save().then((userdata)=>{
  //     console.log("User Data created : ",userdata);
  //     userinfo.save().then((userinfo)=>{
  //         console.log("User info created",userinfo);
  //     })
  //     successCallback();
  // },(err)=>{
  //     console.log(err);
  //     console.log("Error Creating Book");
  //     failureCallback();
  // })

  // }, function (err) {
  //     console.log(err);
  //     failureCallback();
  // });
};

db.findUser = function(user, successCallback, failureCallback) {
  console.log("db username" + user.username);
  console.log("db password" + user.password);
  var sqlQuery =
    "SELECT * FROM usertable WHERE Username = '" + user.username + "';";
  console.log(sqlQuery);
  connection.query(sqlQuery, function(err, rows) {
    if (err) {
      failureCallback(err);
      console.log("in");
      return;
    }
    if (rows.length > 0) {
      console.log("data from login in db", rows);
      successCallback(rows[0]);
      console.log("insidesucces");
    } else {
      failureCallback("User not found.");
      console.log("Wrong arf");
    }
  });
};

module.exports = db;
