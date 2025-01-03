var jobApplication = require("../../../kafka-backend/models/jobApplication");

function handle_request(msg, callback) {
  // var newJobs = new Jobs(msg);
  var JobApp = new jobApplication({
    jobID: request.body.jobid,
    emailID: "aish@gmail.com",
    saved: 1,
    firstname: "",
    lastname: "",
    city: "",
    pointOfInformation: "",
    questions: "",
    disabilityQuestion: "",
    submitted: "",
    submittedTime: "",
    clickTime: "",
    postedBy: ""
  });
  JobApp.save()
    .then(() => {
      console.log("job posted");
      callback(null, msg);
    })
    .catch(err => {
      console.log(err);
      callback(err, []);
    });
}
exports.handle_request = handle_request;
