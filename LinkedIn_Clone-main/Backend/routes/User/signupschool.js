const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/signupschool", function(request, response) {
    console.log("In signup school method");
    kafka.make_request('signupschool',request.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            response.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            response.json({
                    updatedList:results
                });
                response.end();
            } 
    });
});

module.exports = router;
