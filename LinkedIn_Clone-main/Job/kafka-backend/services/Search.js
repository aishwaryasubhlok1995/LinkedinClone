var {mongoose}=require('../../backend/mongoose');
var {jobdata}=require('../../backend/models/job');
function handle_request(msg, callback){
   
   
    console.log("Inside Search Request:",msg);



    var Job;
    // var Location;
    if(msg.Job=='')
     {
       Job="Internship"
    }
     else{
     Job=msg.Job
    }
    jobdata.find({
      title: Job
  
  
  }).then(docs=>{
     callback(null,docs);
     console.log(docs);
  },(err) => {
      console.log(err);
      res.code = "400";
    callback(null,"BAd Request");
  })
  

  
}

exports.handle_request = handle_request;