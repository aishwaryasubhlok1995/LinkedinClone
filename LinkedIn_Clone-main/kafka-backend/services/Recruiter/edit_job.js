var Jobs = require("../../models/job");

function handle_request(msg, callback) {
  Jobs.findOneAndUpdate({ _id: msg._id }, msg)
    .then(() => callback(null, msg))
    .catch(err => callback(err.errmsg), []);
}
exports.handle_request = handle_request;
