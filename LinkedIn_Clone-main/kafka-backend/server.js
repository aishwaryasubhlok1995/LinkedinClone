var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');

var login = require("./services/User/login");
var signup = require("./services/User/signup");
var location = require("./services/User/location");
var prodetails = require("./services/User/prodetails");
var post_a_job = require("./services/Recruiter/post_a_job");
var posted_applications = require("./services/Recruiter/posted_applications");
var posted_jobs = require("./services/Recruiter/posted_jobs");
var edit_job = require("./services/Recruiter/edit_job");
var recruiterDashboardTop10 = require("./services/RecruiterDashboard/top10");
var recruiterDashboardTop5 = require("./services/RecruiterDashboard/top5");
var recruiterDashboardCity = require("./services/RecruiterDashboard/city");
var recruiterJobs = require("./services/RecruiterDashboard/recruiterJobs");
var clicksperjob = require("./services/profileStats/clicksperjob");
var ProfileViews = require("./services/profileStats/ProfileViews");
var jobSearch = require("./services/Job/jobSearch.js");
var Connection = require("./services/connection");
var Channel = require("./services/Chat/channel");
var Message = require("./services/Chat/message");
var User = require("./services/user");
var job_save = require("./services/Job/job_save");
var job_apply = require("./services/Job/job_apply");
var insertsummary = require("./services/insertsummary");
var experienceinsert = require("./services/experienceinsert");
var schoolinsert = require("./services/schoolinsert");
var skillsinsert = require("./services/skillsinsert");
var getuserdata = require("./services/getuserdata");
var getJobById = require("./services/Job/getJobById");
var getsavedjobs = require("./services/Job/getsavedjobs");
var getappliedjobs = require("./services/Job/job_applied");
var recruiterSavedJobs = require("./services/RecruiterDashboard/recruiterSavedJobs");
var recruiterTraceJobs = require("./services/RecruiterDashboard/recruiterTraceJob");
var signupschool = require("./services/signupschool");
var addPhoto = require("./services/User/addPhoto");
var postProfileView = require("./services/profileStats/postProfileView");
var addResume = require("./services/User/addResume");
var editskills = require("./services/editskills");
var editeducation = require("./services/editeducation");
var searchUserByName = require("./services/User/searchUserByName");
var getJobApplications = require("./services/Job/getJobApplications");
var postjobclicks = require("./services/profileStats/postJobClicks");


function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");

  consumer.on("message", function(message) {
    console.log("Message kafka....", message);
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("linkedinlogin", login);
handleTopicRequest("signupschool", signupschool);
handleTopicRequest("linkedinsignup", signup);
handleTopicRequest("linkedinloc", location);
handleTopicRequest("linkedinprodetails", prodetails);
handleTopicRequest("post_a_job", post_a_job);
handleTopicRequest("recruiterDashboardTop10_topic", recruiterDashboardTop10);
handleTopicRequest("recruiterDashboardTop5_topic", recruiterDashboardTop5);
handleTopicRequest("recruiterJobs_topic", recruiterJobs);
handleTopicRequest("get_profileviews", ProfileViews);
handleTopicRequest("posted_applications", posted_applications);
handleTopicRequest("posted_jobs", posted_jobs);
handleTopicRequest("edit_job", edit_job);
handleTopicRequest("recruiterDashboardCity_topic", recruiterDashboardCity);
handleTopicRequest("jobSearch_topic", jobSearch);
handleTopicRequest("get_clicksperjob", clicksperjob);
handleTopicRequest("connection", Connection);
handleTopicRequest("channel", Channel);
handleTopicRequest("message", Message);
handleTopicRequest("user", User);
handleTopicRequest("jobSave_topic", job_save);
handleTopicRequest("jobApply_topic", job_apply);
handleTopicRequest("summary", insertsummary);
handleTopicRequest("experience", experienceinsert);
handleTopicRequest("schoolinsert", schoolinsert);
handleTopicRequest("skillsinsert", skillsinsert);
handleTopicRequest("getuserdata", getuserdata);
handleTopicRequest("getJobById_topic", getJobById);
handleTopicRequest("getsavedjobs", getsavedjobs);
handleTopicRequest("getappliedjobs", getappliedjobs);
handleTopicRequest("recruiterSavedJobs", recruiterSavedJobs);
handleTopicRequest("recruiterTraceJobs", recruiterTraceJobs);
handleTopicRequest("addProfilePhoto_topic", addPhoto);
handleTopicRequest("postProfileView", postProfileView);
handleTopicRequest("addProfileResume_topic", addResume);
handleTopicRequest("skillsedit", editskills);
handleTopicRequest("editeducation", editeducation);
handleTopicRequest("getJobApplications_topic", getJobApplications);

handleTopicRequest("searchUserByName_topic", searchUserByName);
handleTopicRequest("postjobclicks", postjobclicks);
