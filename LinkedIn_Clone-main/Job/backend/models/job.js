var mongoose =require('mongoose');
var jobdata= mongoose.model('JobDetails',{
   
   Company:{
       type:"String"
   },
   Position:{
       type:"String"
   },
   Location:{
       type:"String"
   },
   Details:{
       type:"String"
   },
   Icon:{
       type:"String"
   }


},'JobDetails')

module.exports = {jobdata};