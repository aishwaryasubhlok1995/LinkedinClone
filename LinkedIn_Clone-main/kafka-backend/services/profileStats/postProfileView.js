var { mongoose } = require("../../db/mongoose");

var pv = require("../../models/profileViews");
function handle_request(msg, callback) {
  var view = new pv({
    userID: msg.profileUsername,
    viewedBy: msg.viewerUsername,
    viewDate: new Date()
  });

  view.save().then(
    docs => {
      callback(null, docs);
      console.log(docs);
    },
    err => {
      console.log(err);
      res.code = "400";
      callback(null, "BAd Request");
    }
  );
}

exports.handle_request = handle_request;
