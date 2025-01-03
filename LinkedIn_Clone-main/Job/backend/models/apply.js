var mongoose =require('mongoose');
var Applyjob= mongoose.model('ApplyJob',{
   
   JobID:{
       type:"String"
   },
   Timestamp:{
       type:"String"
   },
   UserID:{
       type:"String"
   }


},'ApplyJob')

module.exports = {Applyjob};