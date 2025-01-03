const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var kafka = require("../../kafka/client");
var express = require("express");
const router = express.Router();

router.post("/saveJob", function(request, response) {
  console.log("Save Job Post Request");
  kafka.make_request("jobSave_topic", request.body, function(err, results) {
    console.log("response from kafka",results);
    if (err) {
      response.json({
        status: "error",
        msg: "Error in retrieving data."
      });
    } else {
      
      response.json({
        updatedList:results
    });
    response.end();
    }
  });
});

module.exports = router;









// var { mongoose } = require("../../../kafka-backend/db/mongoose");

// var job=require('../../../kafka-backend/models/jobApplication')

// router.post("/saveJob", function(request, response) {
//   console.log(request.body);
// var Job =new job({
//   submitted:"no",
//   emailID:"aish@gmail.com"
// });

// Job.save().then(docs => {
//   console.log("Row Created : ", docs);
//   response.end("ok");
// });
// //   job.findOneAndUpdate({
// //     jobId:request.body.JobID
// //     //UserName:msg.earlier

// // },
// // {$set:
// //     {
// //      submitted:"no"

// //     }
// // },function(err,doc){
// //     if (err){

// //     }        
// //     else{
// //     console.log("Docs",doc);
// //    response.send("OK");
// //    }
// // }
// // );

module.exports = router;
