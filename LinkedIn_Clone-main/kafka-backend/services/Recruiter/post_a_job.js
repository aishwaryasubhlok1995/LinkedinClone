var Jobs = require("../../models/job");
var UserSchema = require("../../models/user");

function handle_request(msg, callback) {
  // var newJobs = new Jobs(msg);
  var newJobs = new Jobs({
    title: msg.title,
    description: msg.description,
    industry: msg.industry,
    employmentType: msg.employmentType,
    location: msg.location,
    jobFunction: msg.jobFunction,
    applicantsCount: 0,
    viewsCount: 0,
    postedDateTime: msg.postedDateTime,
    clicks: 0,
    postedBy: msg.postedBy,
    company: msg.company,
    adminId: msg.adminId,
    jobId: msg.jobId,
    logo: msg.logo
  });
  newJobs
    .save()
    .then(() => {
      console.log("job posted");
      var email = msg.adminId;
      UserSchema.findOneAndUpdate({ email }, { isRecruiter: true })
        .then(() => console.log("user is recruiter"))
        .catch(() => console.log("update user as recruiter failed"));
      callback(null, msg);
    })
    .catch(err => {
      callback(err.errmsg, []);
    });
}
exports.handle_request = handle_request;
