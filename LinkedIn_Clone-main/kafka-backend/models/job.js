const mongoose = require("mongoose");

const jobdataSchema = new mongoose.Schema({
  title: String,
  description: String,
  industry: String,
  employmentType: String,
  location: String,
  jobFunction: String,
  applicantsCount: String,
  viewsCount: String,
  postedDateTime: Date,
  clicks: Number,
  postedBy: String,
  company: String,
  adminId: String,
  jobId: String,
  logo: String
});

module.exports = mongoose.model("job", jobdataSchema, "job");
