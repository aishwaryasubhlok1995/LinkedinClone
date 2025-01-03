var mongoose =require('mongoose');
var savejob= mongoose.model('SaveJob',{
   
   JobID:{
       type:"String"
   },
   Timestamp:{
       type:"String"
   },
   UserID:{
       type:"String"
   }


},'SaveJob')

module.exports = {savejob};