const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  jobID: String,
  emailID: String,
  firstname: String,
  lastname: String,
  city: String,
  state:String,
  pointOfInformation: String,
  questions: Array,
  disabilityQuestion: Array,
  submitted: String,
  savedTime: Date,
  submittedTime: Date,
  clickTime: Date,
  postedBy: String,
  url:String
});

module.exports = mongoose.model(
  "jobApplication",
  jobApplicationSchema,
  "jobApplication"
);
