var Users = require("../models/user");
require("../db/mongoose");

function handle_request(msg, callback)
{
  console.log("msg======", msg); 
  Users.findOne({
    email:msg.username
    },
    function(err,result)
    {
        if(err)
        {
            console.log(err);
            callback(null,[]);
        }
        else
        {
            console.log("My Trips Data",result);
            callback(null,result);
        }
    })
}

exports.handle_request = handle_request;
