var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
var mysql = require("mysql");

const port = process.env.PORT || 3001;
var passport = require("passport");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");
var requireAuth = passport.authenticate("jwt", { session: false });

var jwt = require("jsonwebtoken");
var redis = require("redis");
var client = redis.createClient();
const multer = require("multer");

app.use(morgan("dev"));
var kafka = require("./kafka/client");
// require("./db/mongoose");

//console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require("./config/passport")(passport);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "cmpe273_team2_linkedIn",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

var register = require("./routes/User/register");
var login = require("./routes/User/login");
var professionalDetails = require("./routes/User/professionalDetails");
var location = require("./routes/User/location");
var saveJob = require("./routes/Job/saveJob");
var searchJob = require("./routes/Job/searchJob");
var applyJob = require("./routes/Job/applyJob");
var recruiterDashboardTop10 = require("./routes/RecruiterDashboard/recruiterDashboardTop10");
var recruiterDashboardTop5 = require("./routes/RecruiterDashboard/recruiterDashboardTop5");
var recruiterJobs = require("./routes/RecruiterDashboard/recruiterJobs");
var recruiterDashboardCity = require("./routes/RecruiterDashboard/recruiterDashboardCity");
var postAJob = require("./routes/Recruiter/postAJob");
var postedApplications = require("./routes/Recruiter/postedApplications");
var postedJobs = require("./routes/Recruiter/postedJobs");
var editJob = require("./routes/Recruiter/editJob");
var profileViews = require("./routes/profileStats/profileViews");
var clicksPerJob = require("./routes/profileStats/clicksPerJob");
var connection = require("./routes/Connections/connection");
var channel = require("./routes/Chat/channel");
var message = require("./routes/Chat/message");
var user = require("./routes/User/user");
var insertsummary = require("./routes/User/summaryinsert");
var experienceinsert = require("./routes/User/experienceinsert");
var schoolinsert = require("./routes/User/schoolinsert");
var skillsinsert = require("./routes/User/skillsinsert");
var getuserdata = require("./routes/User/getuserdata");
var getJobById = require("./routes/Job/getJobById");
var getsavejob = require("./routes/Job/getsavedjob");
var recruiterSavedJobs = require("./routes/RecruiterDashboard/recruiterSavedJobs");
var recruiterTraceJobs = require("./routes/RecruiterDashboard/recruiterDashboardTraceJob");
var postjobclicks=require("./routes/Job/postjobclicks");
var deleteaccount = require("./routes/User/deleteuser");
var getappliedjobs = require("./routes/Job/getappliedjob");
var signupschool = require("./routes/User/signupschool");
var addPhoto = require("./routes/User/addPhoto");
var addResume = require("./routes/User/addResume");
var editskills = require("./routes/User/editskills");
var editeducation = require("./routes/User/editeducation");
app.use(editeducation);
var searchUserByName = require("./routes/User/searchUserByName");
var getJobApplications = require("./routes/Job/getJobApplications");

app.use(signupschool);
app.use(editskills);
app.use(getuserdata);
app.use(experienceinsert);
app.use(schoolinsert);
app.use(skillsinsert);
app.use(insertsummary);
app.use(register);
app.use(login);
app.use(professionalDetails);
app.use(location);
app.use(saveJob);
app.use(searchJob);
app.use(applyJob);
app.use(recruiterDashboardTop10);
app.use(recruiterDashboardTop5);
app.use(recruiterJobs);
app.use(recruiterDashboardCity);
app.use(postAJob);
app.use(postedApplications);
app.use(postedJobs);
app.use(editJob);
app.use(profileViews);
app.use(clicksPerJob);
app.use(getJobById);
app.use(getsavejob);
app.use(recruiterSavedJobs);
app.use(recruiterTraceJobs);
app.use(postjobclicks);
app.use("/connection", connection);
app.use("/api/auth/channel", channel);
app.use("/api/auth/message", message);
app.use("/api/auth/user", user);


app.use(deleteaccount);
app.use(getappliedjobs);
app.use(addPhoto);
app.use(addResume);
app.use(searchUserByName);
app.use(getJobApplications);
app.listen(3001);
console.log("Server Listening on port 3001");
