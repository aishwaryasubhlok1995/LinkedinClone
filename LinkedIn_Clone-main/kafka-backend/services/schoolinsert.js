var Users = require("../models/user");
require("../db/mongoose");

function handle_request(msg, callback) {
  console.log("msg======", msg);
  Users.update(
    { email: msg.username },
    { $push: { education:{school: msg.school,
        degree: msg.degree,
        field:msg.fieldofstudy,
        grade:msg.grade,
        fromyear:msg.schoolfromyear,
        toyear:msg.schooltoyear,
     }} },
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