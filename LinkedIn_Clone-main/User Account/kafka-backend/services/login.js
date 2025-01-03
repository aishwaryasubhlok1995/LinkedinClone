
var {mongoose} = require('../../backend/db/mangoose');
var db = require('../../backend/app/db');
var crypt = require('../../backend/app/crypt');
var jwt = require('jsonwebtoken');
var config = require('../../backend/config/settings');

function handle_request(msg, callback){
    db.findUser({
        username: msg.username,
        password:msg.password
    }, function (res) {
        console.log("db response",res);
        if(res=="User not found.")
        {
            resData={
                status:400
            }
            console.log("response value null");
            callback(null,resData);
        }
        else{
        var user = {
            username: res.Username,
        };
         } 
        var passwordHash;
        console.log("Password is"+msg.password);
        console.log(res.password);
        crypt.createHash(msg.password, function (res) {
            passwordHash = res;
        })
        console.log(passwordHash);
        // Check if password matches
        crypt.compareHash(msg.password, res.password, function (err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                console.log(token);
                var resData={
                    authFlag:true,
                    username:msg.username,
                    firstname:res.firstname,
                    status:200
                }
                console.log("success");
                callback(null,resData);
            } else {
                resData={
                    status:400
                }
                console.log("error");
                console.log(err);
                callback(null,resData);
            }
        }, function (err) {
            resData={
                status:400
            }
            console.log(err);
           callback(null,resData);
        });
    }, function (err) {
        resData={
            status:400
        }
        console.log(err);
        callback(null,resData);
    });
}

exports.handle_request = handle_request;