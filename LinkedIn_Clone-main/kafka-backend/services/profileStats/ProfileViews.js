var profileViews = require("../../models/profileViews");
require("../../db/mongoose");

function handle_request(msg, callback) {
  profileViews
    .find({
      userID: msg.email
    })
    .then(
      docs => {
        console.log("Documents for views fetched from MongoDB: ");
        console.log(JSON.stringify(docs, undefined, 2));
        callback(null, JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log(
          "There was a problem in getting the property details. Please try again."
        );
        callback(null, []);
      }
    );
}

exports.handle_request = handle_request;
