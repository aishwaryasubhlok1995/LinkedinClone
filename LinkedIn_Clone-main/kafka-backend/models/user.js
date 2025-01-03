const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  experience: Array,
  education: Array,
  skills: Array,
  profileSummary: String,
  headline: String,
  projects: Array,
  isRecruiter: Boolean,
  phoneNumber: String,
  email: String,
  companyName: String,
  country: String,
  jobTitle: String,
  school: String,
  startyear: String,
  endyear: String,
  photo: String,
  resume: String
});

module.exports = mongoose.model("users", UserSchema);
