import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./common/notFound";
import RecruiterDashboardCityWise from "./RecruiterDashboard/recruiterDashboardCityWise";
import RecruiterDashboardTop10 from "./RecruiterDashboard/recruiterDashboardTop10";
import RecruiterDashboardTop5 from "./RecruiterDashboard/recruiterDashboardTop5";
import RecruiterDashboardJobClicks from "./RecruiterDashboard/recruiterDashboardJobClicks";
import RecruiterDashboardJobSaves from "./RecruiterDashboard/recruiterDashboardSavedJobs";
import RecruiterDashboardTrace from "./RecruiterDashboard/recruiterDashboardTraceJob";

import Login from "./Applicant/login";
import PostSignUp from "./Applicant/postSignUp";
import ApplicantDetails from "./Applicant/applicantDetails";
import UserSchoolData from "./Applicant/userSchoolData";
import UserProfilePhoto from "./Applicant/userProfilePhoto";
import ProfileViews from "./ProfileViews/ProfileViews";
import Recruiter from "./Recruiter/Recruiter";

import jobDetails from "./Job/jobDetails";
import jobSearch from "./Job/jobSearch.jsx";
import Homepage from "./Applicant/home";
import jobApply from "./Job/jobApply";
import network from "./Connections/Network";
import { Provider } from "react-redux";
import PrivateRoute from "./common/PrivateRoute";
import Messaging from "../components/Chat/messenger";
import ChatStore from "../chatstore";
import store from "../store";
import ConnectionRequests from "./Connections/ConnectionRequests";
import PostAJob from "./Job/postAJob";
import ViewPostedJobs from "./Recruiter/ViewPostedJobs";
import EditJob from "./Job/jobEdit";
import ViewSavedJob from "./Job/ViewSavedJobs";
import ViewProfile from "./Applicant/viewprofile";
import ViewAppliedJob from "./Job/ViewAppliedJob";
import ViewJobApplications from "./Recruiter/ViewJobApplications";
import SearchUser from "./Connections/searchUser";

//Create a Main Component
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatstore: new ChatStore(this)
    };
  }

  render() {
    const { chatstore } = this.state;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              {/*Render Different Component based on Route*/}

              <Route exact path="/login" component={Login} />
              <Route path="/postsignup" component={PostSignUp} />
              <Route path="/applicantdetails" component={ApplicantDetails} />
              <Route path="/viewprofile" component={ViewProfile} />
              <Route path="/school" component={UserSchoolData} />
              <Route path="/profilepicture" component={UserProfilePhoto} />
              <PrivateRoute path="/network" component={network} />
              <PrivateRoute path="/myrequests" component={ConnectionRequests} />
              {/* <PrivateRoute path="/job-apply" component={jobApply} /> */}
              <Route
                path="/job-apply:id"
                component={jobApply}
                //  render={(props)=>(<jobApply {...props}/>)}
              />
              <Route
                path="/messaging"
                store={chatstore}
                render={props => <Messaging {...props} store={chatstore} />}
              />
              <PrivateRoute
                path="/recruiterdashboardcitywise"
                exact
                component={RecruiterDashboardCityWise}
              />
              <PrivateRoute
                path="/recruiterdashboardtop10"
                exact
                component={RecruiterDashboardTop10}
              />
              <PrivateRoute
                path="/recruiterdashboardtop5"
                exact
                component={RecruiterDashboardTop5}
              />
              <PrivateRoute path="/home" exact component={Homepage} />
              <PrivateRoute
                path="/recruiterdashboardjobclicks"
                exact
                component={RecruiterDashboardJobClicks}
              />
              <PrivateRoute
                path="/recruiterdashboardjobsaves"
                exact
                component={RecruiterDashboardJobSaves}
              />
              <PrivateRoute
                path="/recruiterdashboardtrace"
                exact
                component={RecruiterDashboardTrace}
              />

              <PrivateRoute
                path="/profileviews"
                exact
                component={ProfileViews}
              />
              <PrivateRoute path="/recruiter" component={Recruiter} />
              <PrivateRoute path="/job/new" component={PostAJob} />
              <PrivateRoute path="/user/search" component={SearchUser} />
              <PrivateRoute
                path="/job/posted-jobs"
                component={ViewPostedJobs}
              />
              <PrivateRoute path="/job/edit" component={EditJob} />
              <PrivateRoute path="/job-details" component={jobDetails} />
              <PrivateRoute path="/job-search" component={jobSearch} />
              <PrivateRoute path="/job-saved" component={ViewSavedJob} />
              <PrivateRoute
                path="/job/applications"
                component={ViewJobApplications}
              />
              <PrivateRoute path="/job-applied" component={ViewAppliedJob} />

              <Route path="/not-found" exact component={NotFound} />
              <Route path="/" exact component={Login} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
//Export The Main Component
export default Main;
