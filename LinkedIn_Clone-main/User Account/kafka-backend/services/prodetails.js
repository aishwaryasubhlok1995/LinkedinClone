var mysql = require('mysql');
var db = require('../../backend/app/db');
var pool = require('../../backend/pool');
function handle_request(msg, callback){
    
    var sqlQuery = "UPDATE userdetails SET jobtitle = " +mysql.escape( msg.jobtitle )+ ",company = " +mysql.escape( msg.company )+ " WHERE firstname="+mysql.escape(msg.firstname)+"";
    console.log(sqlQuery);
    pool.getConnection(function(err,con){
            if(err){
                console.log("Could not get connection object");
                callback(null,[]);
            }else
            {
                con.query(sqlQuery,function(err){
                    if (err){
                        console.log("in");
                        console.log("Error while updating",err);
                        callback(null,[]);
                    }
                    else{
                                var resData=
                                {
                                    status:200,
                                    data:"data inserted"
                                }
                                callback(null,resData);
                            }   
               });
            }
        });
    
}

exports.handle_request = handle_request;