var Jobs = require("../../models/job");

function handle_request(msg, callback) {
  var username = msg.username;
  Jobs.find({ postedBy: username })
    .then(res => {
      callback(null, res);
    })
    .catch(err => callback(err.errmsg, []));
}
exports.handle_request = handle_request;
