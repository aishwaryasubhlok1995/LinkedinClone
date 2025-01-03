var { mongoose } = require("../../db/mongoose");

var jobApp = require("../../models/jobApplication");

var job = require("../../models/job");
var save_dict = {};
function handle_request(msg, callback) {
  var count;
  console.log(msg);
  job.find(
    {
      postedBy: msg.email
    },
    function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        // console.log("Docs", doc);
        if (docs == null) {
          console.log(null);
          callback(null, null);
        } else if (docs) {
          console.log("In saves:");
          docs.forEach((doc, idx) => {
            jobApp.find(
              {
                jobID: doc._id,
                submitted: "no"
              },
              function(err, saves) {
                console.log("In saves:");
                console.log("DOC ID", doc._id);
                if (err) {
                  console.log("In saved job find err", err);
                } else {
                  console.log("Docs saved", saves);
                  if (saves.length == 0) {
                    console.log("In saved job find null");
                    save_dict[doc.title + " at " + doc.company] = 0;
                    if (idx == Object.keys(save_dict).length - 1) {
                      console.log("DICT:", save_dict);
                      callback(null, save_dict);
                    }
                  } else {
                    console.log("In saved job found", saves.length);
                    save_dict[doc.title + " at " + doc.company] = saves.length;
                    console.log("SD ", save_dict);
                    console.log("SD LEN", Object.keys(save_dict).length);
                    console.log("DOC LEN", docs.length);
                    console.log("IDX:", idx);
                    if (idx == Object.keys(save_dict).length - 1) {
                      console.log("DICT:", save_dict);
                      callback(null, save_dict);
                    }
                  }
                }
              }
            );
          });
        }
        // console.log("DICT:", save_dict);
        // callback(null, save_dict);
      }
    }
  );
}

exports.handle_request = handle_request;
