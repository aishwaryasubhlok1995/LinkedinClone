var Users = require("../models/user");
require("../db/mongoose");

function handle_request(msg, callback) {
  console.log("msg======", msg);
  Users.update(
    { email: msg.username },
    { $push: { experience:{title: msg.jobtitle,
        company: msg.jobcompany,
        location:msg.joblocation,
        from:msg.jobstartmonth + msg.jobstartyear ,
        to:msg.jobendmonth + msg.jobendyear,
        desc:msg.jobdesc,
        industry:msg.jobfield }} },
    function(err, result) {
      if (err) {
        callback(err, "Error");
      } else {
        console.log("Data Updated");
        callback(null, result);
      }
    }
  );
}
exports.handle_request = handle_request;