
var db = require('../../backend/app/db');
var pool = require('../../backend/pool');

function handle_request(msg, callback){
    
            console.log("True Mthod");
            var newUser = {
                username: msg.username,
                password: msg.password,
                firstname:msg.firstname,
                lastname:msg.lastname
            };
    
            // Attempt to save the user
            db.createUser(newUser, function (res) {
               console.log("user created");
                var resData={
                    username: msg.email,
                    password: msg.password,
                    firstname:msg.firstname,
                    lastname:msg.lastname
                 }
                callback(null,resData);
            }, function (err) {
                console.log("error creating user");
                console.log(err);
               callback(null,[]);
            });
    
}

exports.handle_request = handle_request;