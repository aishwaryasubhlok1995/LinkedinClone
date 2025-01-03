const mongoose = require("mongoose");

const profileViews = new mongoose.Schema({
  userID: String,
  viewedBy: String,
  viewDate: Date
});

module.exports = mongoose.model("profileViews", profileViews, "profileViews");
