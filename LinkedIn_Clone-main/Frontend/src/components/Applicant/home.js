import React, { Component } from "react";
import "../../css/homepage.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { getJWTUsername } from "../common/auth";
import { summaryinsert } from "../../actions/applicantActions";
import { experienceinsert } from "../../actions/applicantActions";
import { schoolinsert } from "../../actions/applicantActions";
import { skillsinsert } from "../../actions/applicantActions";
import Head from "../Header/head";
import { Link } from "react-router-dom";
import { DropdownMenu, MenuItem } from "react-bootstrap-dropdown-menu";
import { addPhoto, addResume } from "../../actions/applicantActions";
import { If } from "react-if";
import request from "superagent";
import Dropzone from "react-dropzone";
const CLOUDINARY_UPLOAD_PRESET = "g4q2o6at";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/ungcmpe273/upload";
// import { getMaxListeners } from 'cluster';

//Define a Login Component
class Homepage extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname: "",
      lastname: "",
      headline: "",
      country: "",
      zipcode: "",
      location: "",
      industry: "",
      summary: "",
      jobtitle: "",
      jobcompany: "",
      joblocation: "",
      jobstartmonth: "",
      jobstartyear: "",
      jobendmonth: "",
      jobendyear: "",
      jobfield: "",
      jobdesc: "",
      school: "",
      degree: "",
      fieldofstudy: "",
      grade: "",
      schoolfromyear: "",
      schooltoyear: "",
      skills: "",
      userdata: "",
      newHeadline: "",
      index: ""
    };
    //Bind the handlers to this class
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.summaryChangeHandler = this.summaryChangeHandler.bind(this);
    this.industryChangeHandler = this.industryChangeHandler.bind(this);
    this.skillsChangeHandler = this.skillsChangeHandler.bind(this);

    this.jobtitleChangeHandler = this.jobtitleChangeHandler.bind(this);
    this.jobcompanyChangeHandler = this.jobcompanyChangeHandler.bind(this);
    this.joblocationChangeHandler = this.joblocationChangeHandler.bind(this);
    this.jobstartmonthChangeHandler = this.jobstartmonthChangeHandler.bind(
      this
    );
    this.jobstartyearChangeHandler = this.jobstartyearChangeHandler.bind(this);
    this.jobendmonthChangeHandler = this.jobendmonthChangeHandler.bind(this);

    this.jobendyearChangeHandler = this.jobendyearChangeHandler.bind(this);
    this.jobfieldChangeHandler = this.jobfieldChangeHandler.bind(this);
    this.jobdescChangeHandler = this.jobdescChangeHandler.bind(this);

    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
    this.fieldofstudyChangeHandler = this.fieldofstudyChangeHandler.bind(this);
    this.gradeChangeHandler = this.gradeChangeHandler.bind(this);
    this.schoolfromyearChangeHandler = this.schoolfromyearChangeHandler.bind(
      this
    );
    this.schooltoyearChangeHandler = this.schooltoyearChangeHandler.bind(this);
    this.submitschool = this.submitschool.bind(this);
    this.submitExperience = this.submitExperience.bind(this);
    this.submitSummary = this.submitSummary.bind(this);
    this.submitskills = this.submitskills.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  async componentDidMount() {
    var headers = new Headers();
    //prevent page from refresh
    // e.preventDefault();
    const username = getJWTUsername();
    const data = {
      username: username
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    const res = await axios
      .post("http://localhost:3001/getuserdata", data)
      .then(response => {
        console.log("Updated List", response.data.updatedList);
        this.setState({
          userdata: response.data.updatedList,
          headline: response.data.updatedList.headline,
          summary: response.data.updatedList.profileSummary,
          skills: response.data.updatedList.experience
            ? response.data.updatedList.experience[0]
              ? response.data.updatedList.experience[0].skills
              : ""
            : "",
          school: response.data.updatedList.experience
            ? response.data.updatedList.experience[0]
              ? response.data.updatedList.experience[0].school
              : ""
            : "",
          fieldofstudy: response.data.updatedList.experience
            ? response.data.updatedList.experience[0]
              ? response.data.updatedList.experience[0].fieldofstudy
              : ""
            : "",
          degree: response.data.updatedList.experience
            ? response.data.updatedList.experience[0]
              ? response.data.updatedList.experience[0].degree
              : ""
            : "",
          grade: response.data.updatedList.experience
            ? response.data.updatedList.experience[0]
              ? response.data.updatedList.experience[0].grade
              : ""
            : ""
        });
      });
    console.log(this.state.school);
    // document.getElementById("topcard-headline").text=this.state.headline
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({ companyLogo: response.body.secure_url });
        window.alert("Image uploaded successfully!");
        console.log("url=", response.body.secure_url);
        this.props.addPhoto(response.body.secure_url, getJWTUsername());
        window.location.reload();
      } else {
        window.alert("There was an error in uploading the image!");
      }
    });
  }

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  };

  handleResumeUpload(file) {
    console.log("file=", file);
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        // save to db
        console.log("resume=", response.body.secure_url);
        this.props.addResume(response.body.secure_url, getJWTUsername());
        window.location.reload();
      }
    });
  }

  onResumeDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleResumeUpload(files[0]);
  };

  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  headlineChangeHandler = e => {
    this.setState({
      headline: e.target.value
    });
  };
  // //password change handler to update state variable with the text entered by the user
  countryChangeHandler = e => {
    this.setState({
      country: e.target.value
    });
  };
  zipcodeChangeHandler = e => {
    this.setState({
      zipcode: e.target.value
    });
  };
  locationChangeHandler = e => {
    this.setState({
      location: e.target.value
    });
  };
  summaryChangeHandler = e => {
    this.setState({
      summary: e.target.value
    });
  };

  skillsChangeHandler = e => {
    this.setState({
      skills: e.target.value
    });
  };

  industryChangeHandler = e => {
    this.setState({
      industry: e.target.value
    });
  };

  degreeChangeHandler = e => {
    this.setState({
      degree: e.target.value
    });
  };

  schoolChangeHandler = e => {
    this.setState({
      school: e.target.value
    });
  };

  fieldofstudyChangeHandler = e => {
    this.setState({
      fieldofstudy: e.target.value
    });
  };
  // //password change handler to update state variable with the text entered by the user
  gradeChangeHandler = e => {
    this.setState({
      grade: e.target.value
    });
  };
  schoolfromyearChangeHandler = e => {
    this.setState({
      schoolfromyear: e.target.value
    });
  };
  schooltoyearChangeHandler = e => {
    this.setState({
      schooltoyear: e.target.value
    });
  };

  jobtitleChangeHandler = e => {
    this.setState({
      jobtitle: e.target.value
    });
  };

  jobcompanyChangeHandler = e => {
    this.setState({
      jobcompany: e.target.value
    });
  };

  joblocationChangeHandler = e => {
    this.setState({
      joblocation: e.target.value
    });
  };
  // //password change handler to update state variable with the text entered by the user
  jobstartmonthChangeHandler = e => {
    this.setState({
      jobstartmonth: e.target.value
    });
  };
  jobstartyearChangeHandler = e => {
    this.setState({
      jobstartyear: e.target.value
    });
  };
  jobendmonthChangeHandler = e => {
    this.setState({
      jobendmonth: e.target.value
    });
  };
  jobendyearChangeHandler = e => {
    this.setState({
      jobendyear: e.target.value
    });
  };
  jobfieldChangeHandler = e => {
    this.setState({
      jobfield: e.target.value
    });
  };
  jobdescChangeHandler = e => {
    this.setState({
      jobdesc: e.target.value
    });
  };
  // // //submit Login handler to send a request to the node backend
  submitSummary = e => {
    var headers = new Headers();
    console.log("in submit summary method");
    //prevent page from refresh
    e.preventDefault();
    const username = getJWTUsername();
    const data = {
      username: username,
      headline: this.state.headline,
      summary: this.state.summary
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    this.props.summaryinsert(data);
    window.location.reload();
  };

  submitExperience = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const username = getJWTUsername();

    const data = {
      username: username,
      jobtitle: this.state.jobtitle,
      jobcompany: this.state.jobcompany,
      joblocation: this.state.joblocation,
      jobstartmonth: this.state.jobstartmonth,
      jobstartyear: this.state.jobstartyear,
      jobendmonth: this.state.jobendmonth,
      jobendyear: this.state.jobendyear,
      jobfield: this.state.jobfield,
      jobdesc: this.state.jobdesc
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    this.props.experienceinsert(data);
    window.location.reload();
  };

  submitschool = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const username = getJWTUsername();

    const data = {
      username: username,
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      grade: this.state.grade,
      schoolfromyear: this.state.schoolfromyear,
      schooltoyear: this.state.schooltoyear
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    this.props.schoolinsert(data);
    window.location.reload();
  };

  submitskills = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const username = getJWTUsername();
    const data = {
      username: username,
      skills: this.state.skills
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    this.props.skillsinsert(data);
    window.location.reload();
  };

  editskills = e => {
    var headers = new Headers();
    e.preventDefault();
    console.log("in edit skills");
    const username = getJWTUsername();
    const data = {
      username: username,
      skills: this.state.skills
    };

    axios.post("http://localhost:3001/editskills", data).then(response => {
      window.location.reload();
    });
  };

  editeducation = e => {
    var headers = new Headers();
    e.preventDefault();
    console.log("in edit education");
    const username = getJWTUsername();
    const data = {
      username: username,
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      grade: this.state.grade,
      startyear: this.state.startyear,
      endyear: this.state.endyear
    };

    axios.post("http://localhost:3001/editeducation", data).then(response => {
      window.location.reload();
    });
  };

  render() {
    console.log(this.state.userdata ? this.state.userdata.firstname : "");
    // const {userdetails}=this.state.userdata[0] ? this.state.userdata[0].firstname:"";
    let experiencedata =
      this.state.userdata.experience &&
      this.state.userdata.experience.map((userdetail, i) => {
        return (
          <div>
            <button
              class="prodetailsbutton"
              data-toggle="modal"
              data-target="#editexperience"
            >
              Edit
            </button>
            <p>{userdetail.title}</p>
            <p>{userdetail.company}</p>
            <p>{userdetail.location}</p>
            <p>{userdetail.from}</p>
            <p> </p>
            <p>{userdetail.to}</p>
            <p>{userdetail.desc}</p>
            <p>{userdetail.industry}</p>
          </div>
        );
      });
    let education =
      this.state.userdata.education &&
      this.state.userdata.education.map(userdetail => {
        return (
          <div>
            <button
              class="schoolbutton"
              data-toggle="modal"
              data-target="#editeducation"
            >
              Edit
            </button>
            <p>{userdetail.school}</p>
            <p>{userdetail.degree}</p>
            <p>{userdetail.field}</p>
            <p>{userdetail.grade}</p>
            <p>{userdetail.fromyear}</p>
            <p>{userdetail.toyear}</p>
          </div>
        );
      });
    return (
      <div>
        <Head />
        <div class="pv-content profile-view-grid neptune-grid two-column ghost-animate-in ">
          <section
            id="ember1102"
            class="pv-ad-banner--light ad-banner-container is-header-zone ember-view"
          >
            <iframe
              class="ad-banner"
              width="100%"
              height="17"
              src="about:blank"
              scrolling="no"
              title="advertisement"
            />
          </section>
          <div style={{ height: "100%", width: "100%" }}>
            <div class="core-rail" role="main">
              <div
                id="ember1103"
                class="Elevation-2dp profile-background-image profile-background-image--loading ember-view"
              />

              <div id="ember1104" class="ember-view">
                <section
                  id="ember1105"
                  class="pv-profile-section pv-top-card-section artdeco-container-card ember-view"
                >
                  <div class="pv-top-card-section__profile-photo-container pv-top-card-v2-section__profile-photo-container">
                    <div class="pv-top-card-section__photo-wrapper pv-top-card-v2-section__photo-wrapper">
                      {" "}
                      <button
                        data-control-name="edit_profile_photo"
                        class="profile-photo-edit__edit-btn"
                        data-ember-action=""
                        data-ember-action-1110="1110"
                      >
                        <Dropzone
                          className="dropzone"
                          multiple={false}
                          accept="image/*"
                          onDrop={this.onImageDrop.bind(this)}
                        >
                          <span class="profile-photo-edit__edit-icon svg-icon-wrap">
                            <li-icon
                              aria-hidden="true"
                              type="pencil-icon"
                              size="small"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                x="0"
                                y="0"
                                preserveAspectRatio="xMinYMin meet"
                                class="artdeco-icon"
                                focusable="false"
                              >
                                <path
                                  d="M14.71,4L12,1.29a1,1,0,0,0-1.41,0L3,8.85,1,15l6.15-2,7.55-7.55A1,1,0,0,0,15,4.71,1,1,0,0,0,14.71,4Zm-8.84,7.6-1.5-1.5L9.42,5.07l1.5,1.5Zm5.72-5.72-1.5-1.5,1.17-1.17,1.5,1.5Z"
                                  class="small-icon"
                                />
                              </svg>
                            </li-icon>
                          </span>
                        </Dropzone>
                        <img
                          src={this.state.userdata.photo}
                          class="profile-photo-edit__preview"
                          alt="Edit photo"
                          height="128"
                          width="128"
                        />
                      </button>
                    </div>
                  </div>

                  <div class="pv-top-card-v2-section__meta-info display-flex">
                    <span
                      id="ember1111"
                      style={{ display: "none" }}
                      class="pv-member-badge--for-top-card-v2 pv-member-badge ember-view"
                    >
                      <span class="visually-hidden">
                        {this.state.userdata
                          ? this.state.userdata.firstname
                          : ""}
                        has a account
                      </span>
                    </span>

                    <a
                      data-control-name="edit_top_card"
                      href="/in/kesha-shah-2925b2135/edit/topcard/"
                      id="ember1113"
                      class="pv-top-card-section__edit button-tertiary-medium-round ember-view"
                    >
                      {" "}
                      <span class="svg-icon-wrap">
                        <span class="visually-hidden">Edit Profile</span>
                        <li-icon aria-hidden="true" type="pencil-icon">
                          <svg
                            viewBox="0 0 24 24"
                            width="24px"
                            height="24px"
                            x="0"
                            y="0"
                            preserveAspectRatio="xMinYMin meet"
                            class="artdeco-icon"
                            focusable="false"
                          >
                            <path
                              d="M21.71,5L19,2.29a1,1,0,0,0-1.41,0L4,15.85,2,22l6.15-2L21.71,6.45A1,1,0,0,0,22,5.71,1,1,0,0,0,21.71,5ZM6.87,18.64l-1.5-1.5L15.92,6.57l1.5,1.5ZM18.09,7.41l-1.5-1.5,1.67-1.67,1.5,1.5Z"
                              class="large-icon"
                              style={{ fill: "currentColor" }}
                            />
                          </svg>
                        </li-icon>
                      </span>
                    </a>
                  </div>

                  <div id="ember1115" class="mt4 display-flex ember-view">
                    <div class="pv-top-card-v2-section__info mr5">
                      <div>
                        <h1 class="pv-top-card-section__name inline t-24 t-black">
                          {this.state.userdata
                            ? this.state.userdata.firstname
                            : ""}{" "}
                          {this.state.userdata
                            ? this.state.userdata.lastname
                            : ""}
                        </h1>
                      </div>

                      <h2 class="pv-top-card-section__headline  t-33 t-black">
                        {this.state.userdata.education
                          ? this.state.userdata.education[0]
                            ? this.state.userdata.education[0].degree
                            : ""
                          : ""}{" "}
                        Student at{" "}
                        {this.state.userdata ? this.state.userdata.school : ""}{" "}
                      </h2>

                      <h3 class="pv-top-card-section__location t-33 t-black--light  inline-block">
                        {this.state.userdata ? this.state.userdata.city : ""} ,{" "}
                        {this.state.userdata ? this.state.userdata.country : ""}
                      </h3>
                      <div class="profilesection">
                        <div class="pv-top-card-v2-section__actions mt4 display-flex">
                          <section
                            id="ember1116"
                            class="pe-hub-section mb2 ember-view"
                          >
                            <div class="dropdown">
                              <button class="dropbtn">
                                Add Profile Section
                              </button>
                              <div class="dropdown-content">
                                <a data-toggle="modal" href="#myModal">
                                  Summary
                                </a>
                                <a data-toggle="modal" href="#experience">
                                  Work Experience
                                </a>
                                <a data-toggle="modal" href="#education">
                                  Education
                                </a>
                                <a data-toggle="modal" href="#skills">
                                  Skills
                                </a>
                                <a data-toggle="modal" href="#resume">
                                  Resume
                                </a>
                              </div>
                            </div>
                          </section>

                          <span
                            id="ember1120"
                            class="pv-s-profile-actions__overflow ember-view"
                          >
                            <button
                              aria-label="More actions"
                              aria-expanded="false"
                              id="ember1187"
                              class="pv-s-profile-actions__overflow-toggle  button-secondary-large-muted mh1 ml2 artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view"
                            >
                              <span class="artdeco-button__text t-33">
                                More…
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="pv-top-card-v2-section__links">
                      <button
                        href="#education-section"
                        data-control-name="education_see_more"
                        class="pv-top-card-v2-section__link pv-top-card-v2-section__link-education mb1"
                        data-ember-action=""
                        data-ember-action-1122="1122"
                      >
                        <span
                          id="ember1124"
                          class="pv-top-card-v2-section__entity-name pv-top-card-v2-section__school-name text-align-left ml2 t-33 t-black t-bold lt-line-clamp lt-line-clamp--multi-line ember-view"
                          style={{ "-webkit-line-clamp": "2" }}
                        >
                          {" "}
                          {this.state.userdata.education
                            ? this.state.userdata.education[0]
                              ? this.state.userdata.education[0].school
                              : ""
                            : ""}{" "}
                        </span>
                      </button>

                      <a
                        data-control-name="contact_see_more"
                        href="/home"
                        id="ember1125"
                        class="pv-top-card-v2-section__link pv-top-card-v2-section__link--contact-info mb1 ember-view"
                      >
                        {" "}
                        <span class="svg-icon-wrap">
                          <span class="visually-hidden">See contact info</span>
                          <li-icon
                            aria-hidden="true"
                            type="address-book-icon"
                            class="pv-top-card-v2-section__icon mh1"
                            size="medium"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              x="0"
                              y="0"
                              preserveAspectRatio="xMinYMin meet"
                              focusable="false"
                            >
                              <path
                                d="M16,15H10a3.24,3.24,0,0,1,1.79-2.89L12,12h2l0.21,0.11A3.24,3.24,0,0,1,16,15ZM13,8h0a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2h0a2,2,0,0,0,2-2h0A2,2,0,0,0,13,8Zm8-4V20a2,2,0,0,1-2,2H5V19H3V17H5V13H3V11H5V7H3V5H5V2H19A2,2,0,0,1,21,4ZM19,4H7V20H19V4Z"
                                class="large-icon"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </li-icon>
                        </span>
                        <span class="pv-top-card-v2-section__entity-name pv-top-card-v2-section__contact-info ml2 t-33 t-black t-bold">
                          See contact info
                        </span>
                      </a>
                      <a
                        data-control-name="topcard_view_all_connections"
                        href="/network"
                        id="ember1126"
                        class="pv-top-card-v2-section__link pv-top-card-v2-section__link--connections ember-view"
                      >
                        {" "}
                        <span class="svg-icon-wrap">
                          <span class="visually-hidden">
                            <Link to="/network">See connections</Link>
                          </span>
                          <li-icon
                            aria-hidden="true"
                            type="people-icon"
                            class="pv-top-card-v2-section__icon mh1"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="24px"
                              height="24px"
                              x="0"
                              y="0"
                              preserveAspectRatio="xMinYMin meet"
                              class="artdeco-icon"
                              focusable="false"
                            >
                              <path
                                d="M20.74,14.2L19,13.54V12.86l0.25-.41A5,5,0,0,0,20,9.82V9a3,3,0,0,0-6,0V9.82a5,5,0,0,0,.75,2.63L15,12.86v0.68l-1,.37a4,4,0,0,0-.58-0.28l-2.45-1V10.83A8,8,0,0,0,12,7V6A4,4,0,0,0,4,6V7a8,8,0,0,0,1,3.86v1.84l-2.45,1A4,4,0,0,0,0,17.35V20a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V17.47A3.5,3.5,0,0,0,20.74,14.2ZM16,8.75a1,1,0,0,1,2,0v1.44a3,3,0,0,1-.38,1.46l-0.33.6a0.25,0.25,0,0,1-.22.13H16.93a0.25,0.25,0,0,1-.22-0.13l-0.33-.6A3,3,0,0,1,16,10.19V8.75ZM6,5.85a2,2,0,0,1,4,0V7.28a6,6,0,0,1-.71,2.83L9,10.72a1,1,0,0,1-.88.53H7.92A1,1,0,0,1,7,10.72l-0.33-.61A6,6,0,0,1,6,7.28V5.85ZM14,19H2V17.25a2,2,0,0,1,1.26-1.86L7,13.92v-1a3,3,0,0,0,1,.18H8a3,3,0,0,0,1-.18v1l3.72,1.42A2,2,0,0,1,14,17.21V19Zm7,0H16V17.35a4,4,0,0,0-.55-2l1.05-.4V14.07a2,2,0,0,0,.4.05h0.2a2,2,0,0,0,.4-0.05v0.88l2.53,1a1.5,1.5,0,0,1,1,1.4V19Z"
                                class="large-icon"
                                style={{ fill: "currentColor" }}
                              />
                            </svg>
                          </li-icon>
                        </span>
                        <span class="pv-top-card-v2-section__entity-name pv-top-card-v2-section__connections ml2 t-33 t-black t-bold">
                          <Link to="/network"> See connections </Link>
                        </span>
                      </a>
                    </div>
                  </div>

                  <div
                    id="ember1128"
                    class="pv-top-card-section__summary ember-view"
                  >
                    <div
                      id="ember1129"
                      class="pv-top-card-section__summary-treasury mt4 pv-treasury-list-preview ember-view"
                    />
                  </div>
                </section>
              </div>
            </div>
            <div class="pv-content__right-rail right-rail">
              <div
                id="ember8838"
                class="pv-profile-info-section mb4 ember-view"
                style={{ "margin-top": "-40vw" }}
              >
                <div
                  id="ember8839"
                  class="pv-view-public-profile-section pv-profile-info-section-button relative ember-view"
                >
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                    id="ember8840"
                    class="pv-view-public-profile-section__button pv-profile-info-section-button__button ember-view"
                  >
                    {" "}
                   
                  </a>
                
                </div>

                <hr class="divider mt4 mb4" />
                <div
                  id="ember8842"
                  class="mt2 pv-add-secondary-language-section pv-profile-info-section-button relative ember-view"
                >
                  <a
                    data-control-name="add_secondary_language"
                    href="/in/kesha-shah-2925b2135/edit/secondary-language/"
                    id="ember8843"
                    class="pv-add-secondary-language-section__button pv-profile-info-section-button__button ember-view"
                  >
                    {" "}
                   
                  </a>
                
                  <div
                    id="ember8844"
                    class="pv-add-secondary-language-section__button-icon pv-profile-info-section-button__button-icon ember-view"
                  >
                    <div class="hovercard-container" />
                  </div>
                </div>
              </div>
            </div>

            <div class="homesummary">
              <section class="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                <h3>Summary</h3>
                <div>
                  <button
                    class="summarybutton"
                    data-toggle="modal"
                    data-target="#editsummary"
                  >
                    Edit
                  </button>
                  <br />
                  Resume:
                  <a href={this.state.userdata.resume}>Download Resume</a>
                  <p>
                    {this.state.userdata ? this.state.userdata.headline : ""}
                  </p>
                  <p>
                    {this.state.userdata
                      ? this.state.userdata.profileSummary
                      : ""}
                  </p>
                </div>
              </section>
              <section class="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                <h3>Skills</h3>
                <div>
                  <button
                    class="skillsbutton"
                    data-toggle="modal"
                    data-target="#editskills"
                  >
                    Edit
                  </button>
                  <p>
                    {" "}
                    {this.state.userdata ? this.state.userdata.skills : ""}
                  </p>
                </div>
              </section>
              <section class="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                <h3>Experience</h3>
                <div>{experiencedata}</div>
              </section>
              <section class="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                <h3>Education</h3>
                <div>{education}</div>
              </section>
            </div>

            <div class="sidebarad">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="box" />
              </div>
            </div>

            <div class="profilestrength">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="box" />
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="editexperience" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Experience</h4>
              </div>
              <div class="modal-body">
                <div class="pe-s-form__body pe-form-body">
                  <div
                    id="ember1628"
                    class="pe-form-field position-title floating-label ember-view"
                  >
                    <div class="pe-form-field position-title  ">
                      <div id="ember1629" class="ember-view">
                        {" "}
                        <label
                          for="position-title-typeahead"
                          class="mb1 required"
                        >
                          Title
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember1630-results"
                          id="position-title-typeahead"
                          placeholder="Ex: Manager"
                          maxlength="100"
                          type="text"
                          onChange={this.jobtitleChangeHandler}
                        />
                      </div>

                      <div id="ember1632" class="ember-view" />
                    </div>
                  </div>

                  <div
                    id="ember1633"
                    class="pe-form-field position-company-name has-logo floating-label ember-view"
                  >
                    <div class="pe-logo-container">
                      <img
                        class="lazy-image pe-logo-container__img ghost-company loaded"
                        alt=""
                        height="24"
                        width="24"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      />

                      <div id="ember1634" class="ember-view">
                        {" "}
                        <label
                          for="position-company-typeahead"
                          class="mb1 required"
                        >
                          Company
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember1635-results"
                          id="position-company-typeahead"
                          placeholder="Ex: Microsoft"
                          maxlength="100"
                          type="text"
                          onChange={this.jobcompanyChangeHandler}
                        />
                      </div>
                    </div>

                    <div id="ember1637" class="ember-view" />
                  </div>

                  <div
                    id="ember1638"
                    class="pe-form-field position-location-name floating-label ember-view"
                  >
                    <div class="pe-form-field position-location-name  ">
                      <div id="ember1639" class="ember-view">
                        {" "}
                        <label for="position-location-typeahead" class="mb1 ">
                          Location
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember1640-results"
                          id="position-location-typeahead"
                          placeholder="Ex: London, United Kingdom"
                          maxlength="80"
                          type="text"
                          onChange={this.joblocationChangeHandler}
                        />
                      </div>

                      <div id="ember1642" class="ember-view" />
                    </div>
                  </div>

                  <div
                    id="ember1643"
                    class="pe-secondary-locale-tooltip-trigger ember-view"
                  >
                    <fieldset
                      id="ember1644"
                      class="pe-form-time-period pe-form-field ember-view"
                    >
                      <div class="pe-form-time-period__container">
                        <fieldset class="pe-form-time-period__start-date">
                          <label class="pe-form-field__label t-14 t-black t-normal required">
                            From
                          </label>

                          <div class="pe-form-time-period__date-field ">
                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-month"
                              >
                                Start month
                              </label>
                              <span id="ember1645" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_month"
                                  name="startMonth"
                                  id="position-start-month"
                                  class="ember-view"
                                  onChange={this.jobstartmonthChangeHandler}
                                >
                                  <option value="">Month</option>
                                  <option value="1">January</option>
                                  <option value="2">February</option>
                                  <option value="3">March</option>
                                  <option value="4">April</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">August</option>
                                  <option value="9">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </span>
                            </div>

                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-year"
                              >
                                Start year
                              </label>
                              <span id="ember1659" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_year"
                                  name="startYear"
                                  id="position-start-year"
                                  class="ember-view"
                                >
                                  {" "}
                                  <option
                                    value=""
                                    onChange={this.jobstartyearChangeHandler}
                                  >
                                    Year
                                  </option>
                                  <option value="2018">2018</option>
                                  <option value="2017">2017</option>
                                  <option value="2016">2016</option>
                                  <option value="2015">2015</option>
                                  <option value="2014">2014</option>
                                  <option value="2013">2013</option>
                                  <option value="2012">2012</option>
                                  <option value="2011">2011</option>
                                  <option value="2010">2010</option>
                                  <option value="2009">2009</option>
                                  <option value="2008">2008</option>
                                  <option value="2007">2007</option>
                                  <option value="2006">2006</option>
                                  <option value="2005">2005</option>
                                  <option value="2004">2004</option>
                                  <option value="2003">2003</option>
                                  <option value="2002">2002</option>
                                  <option value="2001">2001</option>
                                  <option value="2000">2000</option>
                                  <option value="1999">1999</option>
                                  <option value="1998">1998</option>
                                  <option value="1997">1997</option>
                                  <option value="1996">1996</option>
                                  <option value="1995">1995</option>
                                  <option value="1994">1994</option>
                                  <option value="1993">1993</option>
                                  <option value="1992">1992</option>
                                  <option value="1991">1991</option>
                                  <option value="1990">1990</option>
                                  <option value="1989">1989</option>
                                  <option value="1988">1988</option>
                                  <option value="1987">1987</option>
                                  <option value="1986">1986</option>
                                  <option value="1985">1985</option>
                                  <option value="1984">1984</option>
                                  <option value="1983">1983</option>
                                  <option value="1982">1982</option>
                                  <option value="1981">1981</option>
                                  <option value="1980">1980</option>
                                  <option value="1979">1979</option>
                                  <option value="1978">1978</option>
                                  <option value="1977">1977</option>
                                  <option value="1976">1976</option>
                                  <option value="1975">1975</option>
                                  <option value="1974">1974</option>
                                  <option value="1973">1973</option>
                                  <option value="1972">1972</option>
                                  <option value="1971">1971</option>
                                  <option value="1970">1970</option>
                                  <option value="1969">1969</option>
                                  <option value="1968">1968</option>
                                  <option value="1967">1967</option>
                                  <option value="1966">1966</option>
                                  <option value="1965">1965</option>
                                  <option value="1964">1964</option>
                                  <option value="1963">1963</option>
                                  <option value="1962">1962</option>
                                  <option value="1961">1961</option>
                                  <option value="1960">1960</option>
                                  <option value="1959">1959</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div id="ember1797" class="ember-view" />
                    </fieldset>
                  </div>

                  <div
                    id="ember1643"
                    class="pe-secondary-locale-tooltip-trigger ember-view"
                  >
                    <fieldset
                      id="ember1644"
                      class="pe-form-time-period pe-form-field ember-view"
                    >
                      <div class="pe-form-time-period__container">
                        <fieldset class="pe-form-time-period__start-date">
                          <label class="pe-form-field__label t-14 t-black t-normal required">
                            To
                          </label>

                          <div class="pe-form-time-period__date-field ">
                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-month"
                              >
                                End month
                              </label>
                              <span id="ember1645" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_month"
                                  name="startMonth"
                                  id="position-start-month"
                                  class="ember-view"
                                  onChange={this.jobendmonthChangeHandler}
                                >
                                  <option value="">Month</option>
                                  <option value="1">January</option>
                                  <option value="2">February</option>
                                  <option value="3">March</option>
                                  <option value="4">April</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">August</option>
                                  <option value="9">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </span>
                            </div>

                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-year"
                              >
                                End year
                              </label>
                              <span id="ember1659" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_year"
                                  name="startYear"
                                  id="position-start-year"
                                  class="ember-view"
                                >
                                  {" "}
                                  <option
                                    value=""
                                    onChange={this.jobendyearChangeHandler}
                                  >
                                    Year
                                  </option>
                                  <option value="2018">2018</option>
                                  <option value="2017">2017</option>
                                  <option value="2016">2016</option>
                                  <option value="2015">2015</option>
                                  <option value="2014">2014</option>
                                  <option value="2013">2013</option>
                                  <option value="2012">2012</option>
                                  <option value="2011">2011</option>
                                  <option value="2010">2010</option>
                                  <option value="2009">2009</option>
                                  <option value="2008">2008</option>
                                  <option value="2007">2007</option>
                                  <option value="2006">2006</option>
                                  <option value="2005">2005</option>
                                  <option value="2004">2004</option>
                                  <option value="2003">2003</option>
                                  <option value="2002">2002</option>
                                  <option value="2001">2001</option>
                                  <option value="2000">2000</option>
                                  <option value="1999">1999</option>
                                  <option value="1998">1998</option>
                                  <option value="1997">1997</option>
                                  <option value="1996">1996</option>
                                  <option value="1995">1995</option>
                                  <option value="1994">1994</option>
                                  <option value="1993">1993</option>
                                  <option value="1992">1992</option>
                                  <option value="1991">1991</option>
                                  <option value="1990">1990</option>
                                  <option value="1989">1989</option>
                                  <option value="1988">1988</option>
                                  <option value="1987">1987</option>
                                  <option value="1986">1986</option>
                                  <option value="1985">1985</option>
                                  <option value="1984">1984</option>
                                  <option value="1983">1983</option>
                                  <option value="1982">1982</option>
                                  <option value="1981">1981</option>
                                  <option value="1980">1980</option>
                                  <option value="1979">1979</option>
                                  <option value="1978">1978</option>
                                  <option value="1977">1977</option>
                                  <option value="1976">1976</option>
                                  <option value="1975">1975</option>
                                  <option value="1974">1974</option>
                                  <option value="1973">1973</option>
                                  <option value="1972">1972</option>
                                  <option value="1971">1971</option>
                                  <option value="1970">1970</option>
                                  <option value="1969">1969</option>
                                  <option value="1968">1968</option>
                                  <option value="1967">1967</option>
                                  <option value="1966">1966</option>
                                  <option value="1965">1965</option>
                                  <option value="1964">1964</option>
                                  <option value="1963">1963</option>
                                  <option value="1962">1962</option>
                                  <option value="1961">1961</option>
                                  <option value="1960">1960</option>
                                  <option value="1959">1959</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div id="ember1797" class="ember-view" />
                    </fieldset>
                  </div>

                  <div id="ember1818" class="pe-form-field mb3 ember-view">
                    <div class="pe-form-field">
                      <label
                        for="position-industry"
                        class="pe-form-field__label required"
                      >
                        Industry
                      </label>

                      <select
                        name="industry"
                        id="position-industry"
                        class="position-industry mt1 ember-view"
                      >
                        {" "}
                        <option value="" onChange={this.jobfieldChangeHandler}>
                          Choose an industry…
                        </option>
                        <option value="urn:li:fs_industry:47">
                          Accounting
                        </option>
                        <option value="urn:li:fs_industry:94">
                          Airlines/Aviation
                        </option>
                        <option value="urn:li:fs_industry:120">
                          Alternative Dispute Resolution
                        </option>
                        <option value="urn:li:fs_industry:125">
                          Alternative Medicine
                        </option>
                        <option value="urn:li:fs_industry:127">
                          Animation
                        </option>
                        <option value="urn:li:fs_industry:19">
                          Apparel &amp; Fashion
                        </option>
                        <option value="urn:li:fs_industry:50">
                          Architecture &amp; Planning
                        </option>
                        <option value="urn:li:fs_industry:111">
                          Arts &amp; Crafts
                        </option>
                        <option value="urn:li:fs_industry:53">
                          Automotive
                        </option>
                        <option value="urn:li:fs_industry:52">
                          Aviation &amp; Aerospace
                        </option>
                        <option value="urn:li:fs_industry:41">Banking</option>
                        <option value="urn:li:fs_industry:12">
                          Biotechnology
                        </option>
                        <option value="urn:li:fs_industry:36">
                          Broadcast Media
                        </option>
                        <option value="urn:li:fs_industry:49">
                          Building Materials
                        </option>
                        <option value="urn:li:fs_industry:138">
                          Business Supplies &amp; Equipment
                        </option>
                        <option value="urn:li:fs_industry:129">
                          Capital Markets
                        </option>
                        <option value="urn:li:fs_industry:54">Chemicals</option>
                        <option value="urn:li:fs_industry:90">
                          Civic &amp; Social Organization
                        </option>
                        <option value="urn:li:fs_industry:51">
                          Civil Engineering
                        </option>
                        <option value="urn:li:fs_industry:128">
                          Commercial Real Estate
                        </option>
                        <option value="urn:li:fs_industry:118">
                          Computer &amp; Network Security
                        </option>
                        <option value="urn:li:fs_industry:109">
                          Computer Games
                        </option>
                        <option value="urn:li:fs_industry:3">
                          Computer Hardware
                        </option>
                        <option value="urn:li:fs_industry:5">
                          Computer Networking
                        </option>
                        <option value="urn:li:fs_industry:4">
                          Computer Software
                        </option>
                        <option value="urn:li:fs_industry:48">
                          Construction
                        </option>
                        <option value="urn:li:fs_industry:24">
                          Consumer Electronics
                        </option>
                        <option value="urn:li:fs_industry:25">
                          Consumer Goods
                        </option>
                        <option value="urn:li:fs_industry:91">
                          Consumer Services
                        </option>
                        <option value="urn:li:fs_industry:18">Cosmetics</option>
                        <option value="urn:li:fs_industry:65">Dairy</option>
                        <option value="urn:li:fs_industry:1">
                          Defense &amp; Space
                        </option>
                        <option value="urn:li:fs_industry:99">Design</option>
                        <option value="urn:li:fs_industry:132">
                          E-learning
                        </option>
                        <option value="urn:li:fs_industry:69">
                          Education Management
                        </option>
                        <option value="urn:li:fs_industry:112">
                          Electrical &amp; Electronic Manufacturing
                        </option>
                        <option value="urn:li:fs_industry:28">
                          Entertainment
                        </option>
                        <option value="urn:li:fs_industry:86">
                          Environmental Services
                        </option>
                        <option value="urn:li:fs_industry:110">
                          Events Services
                        </option>
                        <option value="urn:li:fs_industry:76">
                          Executive Office
                        </option>
                        <option value="urn:li:fs_industry:122">
                          Facilities Services
                        </option>
                        <option value="urn:li:fs_industry:63">Farming</option>
                        <option value="urn:li:fs_industry:43">
                          Financial Services
                        </option>
                        <option value="urn:li:fs_industry:38">Fine Art</option>
                        <option value="urn:li:fs_industry:66">Fishery</option>
                        <option value="urn:li:fs_industry:34">
                          Food &amp; Beverages
                        </option>
                        <option value="urn:li:fs_industry:23">
                          Food Production
                        </option>
                        <option value="urn:li:fs_industry:101">
                          Fundraising
                        </option>
                        <option value="urn:li:fs_industry:26">Furniture</option>
                        <option value="urn:li:fs_industry:29">
                          Gambling &amp; Casinos
                        </option>
                        <option value="urn:li:fs_industry:145">
                          Glass, Ceramics &amp; Concrete
                        </option>
                        <option value="urn:li:fs_industry:75">
                          Government Administration
                        </option>
                        <option value="urn:li:fs_industry:148">
                          Government Relations
                        </option>
                        <option value="urn:li:fs_industry:140">
                          Graphic Design
                        </option>
                        <option value="urn:li:fs_industry:124">
                          Health, Wellness &amp; Fitness
                        </option>
                        <option value="urn:li:fs_industry:68">
                          Higher Education
                        </option>
                        <option value="urn:li:fs_industry:14">
                          Hospital &amp; Health Care
                        </option>
                        <option value="urn:li:fs_industry:31">
                          Hospitality
                        </option>
                        <option value="urn:li:fs_industry:137">
                          Human Resources
                        </option>
                        <option value="urn:li:fs_industry:134">
                          Import &amp; Export
                        </option>
                        <option value="urn:li:fs_industry:88">
                          Individual &amp; Family Services
                        </option>
                        <option value="urn:li:fs_industry:147">
                          Industrial Automation
                        </option>
                        <option value="urn:li:fs_industry:84">
                          Information Services
                        </option>
                        <option value="urn:li:fs_industry:96">
                          Information Technology &amp; Services
                        </option>
                        <option value="urn:li:fs_industry:42">Insurance</option>
                        <option value="urn:li:fs_industry:74">
                          International Affairs
                        </option>
                        <option value="urn:li:fs_industry:141">
                          International Trade &amp; Development
                        </option>
                        <option value="urn:li:fs_industry:6">Internet</option>
                        <option value="urn:li:fs_industry:45">
                          Investment Banking
                        </option>
                        <option value="urn:li:fs_industry:46">
                          Investment Management
                        </option>
                        <option value="urn:li:fs_industry:73">Judiciary</option>
                        <option value="urn:li:fs_industry:77">
                          Law Enforcement
                        </option>
                        <option value="urn:li:fs_industry:9">
                          Law Practice
                        </option>
                        <option value="urn:li:fs_industry:10">
                          Legal Services
                        </option>
                        <option value="urn:li:fs_industry:72">
                          Legislative Office
                        </option>
                        <option value="urn:li:fs_industry:30">
                          Leisure, Travel &amp; Tourism
                        </option>
                        <option value="urn:li:fs_industry:85">Libraries</option>
                        <option value="urn:li:fs_industry:116">
                          Logistics &amp; Supply Chain
                        </option>
                        <option value="urn:li:fs_industry:143">
                          Luxury Goods &amp; Jewelry
                        </option>
                        <option value="urn:li:fs_industry:55">Machinery</option>
                        <option value="urn:li:fs_industry:11">
                          Management Consulting
                        </option>
                        <option value="urn:li:fs_industry:95">Maritime</option>
                        <option value="urn:li:fs_industry:97">
                          Market Research
                        </option>
                        <option value="urn:li:fs_industry:80">
                          Marketing &amp; Advertising
                        </option>
                        <option value="urn:li:fs_industry:135">
                          Mechanical Or Industrial Engineering
                        </option>
                        <option value="urn:li:fs_industry:126">
                          Media Production
                        </option>
                        <option value="urn:li:fs_industry:17">
                          Medical Device
                        </option>
                        <option value="urn:li:fs_industry:13">
                          Medical Practice
                        </option>
                        <option value="urn:li:fs_industry:139">
                          Mental Health Care
                        </option>
                        <option value="urn:li:fs_industry:71">Military</option>
                        <option value="urn:li:fs_industry:56">
                          Mining &amp; Metals
                        </option>
                        <option value="urn:li:fs_industry:35">
                          Motion Pictures &amp; Film
                        </option>
                        <option value="urn:li:fs_industry:37">
                          Museums &amp; Institutions
                        </option>
                        <option value="urn:li:fs_industry:115">Music</option>
                        <option value="urn:li:fs_industry:114">
                          Nanotechnology
                        </option>
                        <option value="urn:li:fs_industry:81">
                          Newspapers
                        </option>
                        <option value="urn:li:fs_industry:100">
                          Non-profit Organization Management
                        </option>
                        <option value="urn:li:fs_industry:57">
                          Oil &amp; Energy
                        </option>
                        <option value="urn:li:fs_industry:113">
                          Online Media
                        </option>
                        <option value="urn:li:fs_industry:123">
                          Outsourcing/Offshoring
                        </option>
                        <option value="urn:li:fs_industry:87">
                          Package/Freight Delivery
                        </option>
                        <option value="urn:li:fs_industry:146">
                          Packaging &amp; Containers
                        </option>
                        <option value="urn:li:fs_industry:61">
                          Paper &amp; Forest Products
                        </option>
                        <option value="urn:li:fs_industry:39">
                          Performing Arts
                        </option>
                        <option value="urn:li:fs_industry:15">
                          Pharmaceuticals
                        </option>
                        <option value="urn:li:fs_industry:131">
                          Philanthropy
                        </option>
                        <option value="urn:li:fs_industry:136">
                          Photography
                        </option>
                        <option value="urn:li:fs_industry:117">Plastics</option>
                        <option value="urn:li:fs_industry:107">
                          Political Organization
                        </option>
                        <option value="urn:li:fs_industry:67">
                          Primary/Secondary Education
                        </option>
                        <option value="urn:li:fs_industry:83">Printing</option>
                        <option value="urn:li:fs_industry:105">
                          Professional Training &amp; Coaching
                        </option>
                        <option value="urn:li:fs_industry:102">
                          Program Development
                        </option>
                        <option value="urn:li:fs_industry:79">
                          Public Policy
                        </option>
                        <option value="urn:li:fs_industry:98">
                          Public Relations &amp; Communications
                        </option>
                        <option value="urn:li:fs_industry:78">
                          Public Safety
                        </option>
                        <option value="urn:li:fs_industry:82">
                          Publishing
                        </option>
                        <option value="urn:li:fs_industry:62">
                          Railroad Manufacture
                        </option>
                        <option value="urn:li:fs_industry:64">Ranching</option>
                        <option value="urn:li:fs_industry:44">
                          Real Estate
                        </option>
                        <option value="urn:li:fs_industry:40">
                          Recreational Facilities &amp; Services
                        </option>
                        <option value="urn:li:fs_industry:89">
                          Religious Institutions
                        </option>
                        <option value="urn:li:fs_industry:144">
                          Renewables &amp; Environment
                        </option>
                        <option value="urn:li:fs_industry:70">Research</option>
                        <option value="urn:li:fs_industry:32">
                          Restaurants
                        </option>
                        <option value="urn:li:fs_industry:27">Retail</option>
                        <option value="urn:li:fs_industry:121">
                          Security &amp; Investigations
                        </option>
                        <option value="urn:li:fs_industry:7">
                          Semiconductors
                        </option>
                        <option value="urn:li:fs_industry:58">
                          Shipbuilding
                        </option>
                        <option value="urn:li:fs_industry:20">
                          Sporting Goods
                        </option>
                        <option value="urn:li:fs_industry:33">Sports</option>
                        <option value="urn:li:fs_industry:104">
                          Staffing &amp; Recruiting
                        </option>
                        <option value="urn:li:fs_industry:22">
                          Supermarkets
                        </option>
                        <option value="urn:li:fs_industry:8">
                          Telecommunications
                        </option>
                        <option value="urn:li:fs_industry:60">Textiles</option>
                        <option value="urn:li:fs_industry:130">
                          Think Tanks
                        </option>
                        <option value="urn:li:fs_industry:21">Tobacco</option>
                        <option value="urn:li:fs_industry:108">
                          Translation &amp; Localization
                        </option>
                        <option value="urn:li:fs_industry:92">
                          Transportation/Trucking/Railroad
                        </option>
                        <option value="urn:li:fs_industry:59">Utilities</option>
                        <option value="urn:li:fs_industry:106">
                          Venture Capital &amp; Private Equity
                        </option>
                        <option value="urn:li:fs_industry:16">
                          Veterinary
                        </option>
                        <option value="urn:li:fs_industry:93">
                          Warehousing
                        </option>
                        <option value="urn:li:fs_industry:133">
                          Wholesale
                        </option>
                        <option value="urn:li:fs_industry:142">
                          Wine &amp; Spirits
                        </option>
                        <option value="urn:li:fs_industry:119">Wireless</option>
                        <option value="urn:li:fs_industry:103">
                          Writing &amp; Editing
                        </option>
                      </select>
                    </div>
                  </div>

                  <div id="ember1969" class="ember-view">
                    <div id="ember1970" class="pe-form-field mb3 ember-view">
                      <input
                        tabindex="0"
                        id="position-update-headline-checkbox"
                        class="ember-checkbox state-checkbox visually-hidden toggle-switch__input ember-view"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <div
                    id="ember1800"
                    class="pe-form-field position-description floating-label ember-view"
                  >
                    <label
                      for="position-description"
                      class="pe-form-field__label label-text"
                    >
                      Description
                    </label>

                    <textarea
                      name="description"
                      id="position-description"
                      class="ember-text-area pe-form-field__textarea ember-view"
                      onChange={this.jobdescChangeHandler}
                    />
                  </div>
                  <div
                    id="ember1802"
                    class="pe-form-field pe-treasury-view ember-view"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.submitExperience}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="experience" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Experience</h4>
              </div>
              <div class="modal-body">
                <div class="pe-s-form__body pe-form-body">
                  <div
                    id="ember1628"
                    class="pe-form-field position-title floating-label ember-view"
                  >
                    <div class="pe-form-field position-title  ">
                      <div id="ember1629" class="ember-view">
                        {" "}
                        <label
                          for="position-title-typeahead"
                          class="mb1 required"
                        >
                          Title
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember1630-results"
                          id="position-title-typeahead"
                          placeholder="Ex: Manager"
                          maxlength="100"
                          type="text"
                          onChange={this.jobtitleChangeHandler}
                        />
                      </div>

                      <div id="ember1632" class="ember-view" />
                    </div>
                  </div>

                  <div
                    id="ember1633"
                    class="pe-form-field position-company-name has-logo floating-label ember-view"
                  >
                    <div class="pe-logo-container">
                      <img
                        class="lazy-image pe-logo-container__img ghost-company loaded"
                        alt=""
                        height="24"
                        width="24"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      />

                      <div id="ember1634" class="ember-view">
                        {" "}
                        <label
                          for="position-company-typeahead"
                          class="mb1 required"
                        >
                          Company
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember1635-results"
                          id="position-company-typeahead"
                          placeholder="Ex: Microsoft"
                          maxlength="100"
                          type="text"
                          onChange={this.jobcompanyChangeHandler}
                        />
                      </div>
                    </div>

                    <div id="ember1637" class="ember-view" />
                  </div>

                  <div
                    id="ember1638"
                    class="pe-form-field position-location-name floating-label ember-view"
                  >
                    <div class="pe-form-field position-location-name  ">
                      <div id="ember1639" class="ember-view">
                        {" "}
                        <label for="position-location-typeahead" class="mb1 ">
                          Location
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember1640-results"
                          id="position-location-typeahead"
                          placeholder="Ex: London, United Kingdom"
                          maxlength="80"
                          type="text"
                          onChange={this.joblocationChangeHandler}
                        />
                      </div>

                      <div id="ember1642" class="ember-view" />
                    </div>
                  </div>

                  <div
                    id="ember1643"
                    class="pe-secondary-locale-tooltip-trigger ember-view"
                  >
                    <fieldset
                      id="ember1644"
                      class="pe-form-time-period pe-form-field ember-view"
                    >
                      <div class="pe-form-time-period__container">
                        <fieldset class="pe-form-time-period__start-date">
                          <label class="pe-form-field__label t-14 t-black t-normal required">
                            From
                          </label>

                          <div class="pe-form-time-period__date-field ">
                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-month"
                              >
                                Start month
                              </label>
                              <span id="ember1645" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_month"
                                  name="startMonth"
                                  id="position-start-month"
                                  class="ember-view"
                                  onChange={this.jobstartmonthChangeHandler}
                                >
                                  <option value="">Month</option>
                                  <option value="1">January</option>
                                  <option value="2">February</option>
                                  <option value="3">March</option>
                                  <option value="4">April</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">August</option>
                                  <option value="9">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </span>
                            </div>

                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-year"
                              >
                                Start year
                              </label>
                              <span id="ember1659" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_year"
                                  name="startYear"
                                  id="position-start-year"
                                  class="ember-view"
                                >
                                  {" "}
                                  <option
                                    value=""
                                    onChange={this.jobstartyearChangeHandler}
                                  >
                                    Year
                                  </option>
                                  <option value="2018">2018</option>
                                  <option value="2017">2017</option>
                                  <option value="2016">2016</option>
                                  <option value="2015">2015</option>
                                  <option value="2014">2014</option>
                                  <option value="2013">2013</option>
                                  <option value="2012">2012</option>
                                  <option value="2011">2011</option>
                                  <option value="2010">2010</option>
                                  <option value="2009">2009</option>
                                  <option value="2008">2008</option>
                                  <option value="2007">2007</option>
                                  <option value="2006">2006</option>
                                  <option value="2005">2005</option>
                                  <option value="2004">2004</option>
                                  <option value="2003">2003</option>
                                  <option value="2002">2002</option>
                                  <option value="2001">2001</option>
                                  <option value="2000">2000</option>
                                  <option value="1999">1999</option>
                                  <option value="1998">1998</option>
                                  <option value="1997">1997</option>
                                  <option value="1996">1996</option>
                                  <option value="1995">1995</option>
                                  <option value="1994">1994</option>
                                  <option value="1993">1993</option>
                                  <option value="1992">1992</option>
                                  <option value="1991">1991</option>
                                  <option value="1990">1990</option>
                                  <option value="1989">1989</option>
                                  <option value="1988">1988</option>
                                  <option value="1987">1987</option>
                                  <option value="1986">1986</option>
                                  <option value="1985">1985</option>
                                  <option value="1984">1984</option>
                                  <option value="1983">1983</option>
                                  <option value="1982">1982</option>
                                  <option value="1981">1981</option>
                                  <option value="1980">1980</option>
                                  <option value="1979">1979</option>
                                  <option value="1978">1978</option>
                                  <option value="1977">1977</option>
                                  <option value="1976">1976</option>
                                  <option value="1975">1975</option>
                                  <option value="1974">1974</option>
                                  <option value="1973">1973</option>
                                  <option value="1972">1972</option>
                                  <option value="1971">1971</option>
                                  <option value="1970">1970</option>
                                  <option value="1969">1969</option>
                                  <option value="1968">1968</option>
                                  <option value="1967">1967</option>
                                  <option value="1966">1966</option>
                                  <option value="1965">1965</option>
                                  <option value="1964">1964</option>
                                  <option value="1963">1963</option>
                                  <option value="1962">1962</option>
                                  <option value="1961">1961</option>
                                  <option value="1960">1960</option>
                                  <option value="1959">1959</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div id="ember1797" class="ember-view" />
                    </fieldset>
                  </div>

                  <div
                    id="ember1643"
                    class="pe-secondary-locale-tooltip-trigger ember-view"
                  >
                    <fieldset
                      id="ember1644"
                      class="pe-form-time-period pe-form-field ember-view"
                    >
                      <div class="pe-form-time-period__container">
                        <fieldset class="pe-form-time-period__start-date">
                          <label class="pe-form-field__label t-14 t-black t-normal required">
                            To
                          </label>

                          <div class="pe-form-time-period__date-field ">
                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-month"
                              >
                                End month
                              </label>
                              <span id="ember1645" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_month"
                                  name="startMonth"
                                  id="position-start-month"
                                  class="ember-view"
                                  onChange={this.jobendmonthChangeHandler}
                                >
                                  <option value="">Month</option>
                                  <option value="1">January</option>
                                  <option value="2">February</option>
                                  <option value="3">March</option>
                                  <option value="4">April</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">August</option>
                                  <option value="9">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </span>
                            </div>

                            <div class="pe-form-time-period__date-unit">
                              <label
                                class="visually-hidden"
                                for="position-start-year"
                              >
                                End year
                              </label>
                              <span id="ember1659" class="ember-view">
                                <select
                                  data-control-name="edit_position_start_date_year"
                                  name="startYear"
                                  id="position-start-year"
                                  class="ember-view"
                                >
                                  {" "}
                                  <option
                                    value=""
                                    onChange={this.jobendyearChangeHandler}
                                  >
                                    Year
                                  </option>
                                  <option value="2018">2018</option>
                                  <option value="2017">2017</option>
                                  <option value="2016">2016</option>
                                  <option value="2015">2015</option>
                                  <option value="2014">2014</option>
                                  <option value="2013">2013</option>
                                  <option value="2012">2012</option>
                                  <option value="2011">2011</option>
                                  <option value="2010">2010</option>
                                  <option value="2009">2009</option>
                                  <option value="2008">2008</option>
                                  <option value="2007">2007</option>
                                  <option value="2006">2006</option>
                                  <option value="2005">2005</option>
                                  <option value="2004">2004</option>
                                  <option value="2003">2003</option>
                                  <option value="2002">2002</option>
                                  <option value="2001">2001</option>
                                  <option value="2000">2000</option>
                                  <option value="1999">1999</option>
                                  <option value="1998">1998</option>
                                  <option value="1997">1997</option>
                                  <option value="1996">1996</option>
                                  <option value="1995">1995</option>
                                  <option value="1994">1994</option>
                                  <option value="1993">1993</option>
                                  <option value="1992">1992</option>
                                  <option value="1991">1991</option>
                                  <option value="1990">1990</option>
                                  <option value="1989">1989</option>
                                  <option value="1988">1988</option>
                                  <option value="1987">1987</option>
                                  <option value="1986">1986</option>
                                  <option value="1985">1985</option>
                                  <option value="1984">1984</option>
                                  <option value="1983">1983</option>
                                  <option value="1982">1982</option>
                                  <option value="1981">1981</option>
                                  <option value="1980">1980</option>
                                  <option value="1979">1979</option>
                                  <option value="1978">1978</option>
                                  <option value="1977">1977</option>
                                  <option value="1976">1976</option>
                                  <option value="1975">1975</option>
                                  <option value="1974">1974</option>
                                  <option value="1973">1973</option>
                                  <option value="1972">1972</option>
                                  <option value="1971">1971</option>
                                  <option value="1970">1970</option>
                                  <option value="1969">1969</option>
                                  <option value="1968">1968</option>
                                  <option value="1967">1967</option>
                                  <option value="1966">1966</option>
                                  <option value="1965">1965</option>
                                  <option value="1964">1964</option>
                                  <option value="1963">1963</option>
                                  <option value="1962">1962</option>
                                  <option value="1961">1961</option>
                                  <option value="1960">1960</option>
                                  <option value="1959">1959</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div id="ember1797" class="ember-view" />
                    </fieldset>
                  </div>

                  <div id="ember1818" class="pe-form-field mb3 ember-view">
                    <div class="pe-form-field">
                      <label
                        for="position-industry"
                        class="pe-form-field__label required"
                      >
                        Industry
                      </label>

                      <select
                        name="industry"
                        id="position-industry"
                        class="position-industry mt1 ember-view"
                      >
                        {" "}
                        <option value="" onChange={this.jobfieldChangeHandler}>
                          Choose an industry…
                        </option>
                        <option value="urn:li:fs_industry:47">
                          Accounting
                        </option>
                        <option value="urn:li:fs_industry:94">
                          Airlines/Aviation
                        </option>
                        <option value="urn:li:fs_industry:120">
                          Alternative Dispute Resolution
                        </option>
                        <option value="urn:li:fs_industry:125">
                          Alternative Medicine
                        </option>
                        <option value="urn:li:fs_industry:127">
                          Animation
                        </option>
                        <option value="urn:li:fs_industry:19">
                          Apparel &amp; Fashion
                        </option>
                        <option value="urn:li:fs_industry:50">
                          Architecture &amp; Planning
                        </option>
                        <option value="urn:li:fs_industry:111">
                          Arts &amp; Crafts
                        </option>
                        <option value="urn:li:fs_industry:53">
                          Automotive
                        </option>
                        <option value="urn:li:fs_industry:52">
                          Aviation &amp; Aerospace
                        </option>
                        <option value="urn:li:fs_industry:41">Banking</option>
                        <option value="urn:li:fs_industry:12">
                          Biotechnology
                        </option>
                        <option value="urn:li:fs_industry:36">
                          Broadcast Media
                        </option>
                        <option value="urn:li:fs_industry:49">
                          Building Materials
                        </option>
                        <option value="urn:li:fs_industry:138">
                          Business Supplies &amp; Equipment
                        </option>
                        <option value="urn:li:fs_industry:129">
                          Capital Markets
                        </option>
                        <option value="urn:li:fs_industry:54">Chemicals</option>
                        <option value="urn:li:fs_industry:90">
                          Civic &amp; Social Organization
                        </option>
                        <option value="urn:li:fs_industry:51">
                          Civil Engineering
                        </option>
                        <option value="urn:li:fs_industry:128">
                          Commercial Real Estate
                        </option>
                        <option value="urn:li:fs_industry:118">
                          Computer &amp; Network Security
                        </option>
                        <option value="urn:li:fs_industry:109">
                          Computer Games
                        </option>
                        <option value="urn:li:fs_industry:3">
                          Computer Hardware
                        </option>
                        <option value="urn:li:fs_industry:5">
                          Computer Networking
                        </option>
                        <option value="urn:li:fs_industry:4">
                          Computer Software
                        </option>
                        <option value="urn:li:fs_industry:48">
                          Construction
                        </option>
                        <option value="urn:li:fs_industry:24">
                          Consumer Electronics
                        </option>
                        <option value="urn:li:fs_industry:25">
                          Consumer Goods
                        </option>
                        <option value="urn:li:fs_industry:91">
                          Consumer Services
                        </option>
                        <option value="urn:li:fs_industry:18">Cosmetics</option>
                        <option value="urn:li:fs_industry:65">Dairy</option>
                        <option value="urn:li:fs_industry:1">
                          Defense &amp; Space
                        </option>
                        <option value="urn:li:fs_industry:99">Design</option>
                        <option value="urn:li:fs_industry:132">
                          E-learning
                        </option>
                        <option value="urn:li:fs_industry:69">
                          Education Management
                        </option>
                        <option value="urn:li:fs_industry:112">
                          Electrical &amp; Electronic Manufacturing
                        </option>
                        <option value="urn:li:fs_industry:28">
                          Entertainment
                        </option>
                        <option value="urn:li:fs_industry:86">
                          Environmental Services
                        </option>
                        <option value="urn:li:fs_industry:110">
                          Events Services
                        </option>
                        <option value="urn:li:fs_industry:76">
                          Executive Office
                        </option>
                        <option value="urn:li:fs_industry:122">
                          Facilities Services
                        </option>
                        <option value="urn:li:fs_industry:63">Farming</option>
                        <option value="urn:li:fs_industry:43">
                          Financial Services
                        </option>
                        <option value="urn:li:fs_industry:38">Fine Art</option>
                        <option value="urn:li:fs_industry:66">Fishery</option>
                        <option value="urn:li:fs_industry:34">
                          Food &amp; Beverages
                        </option>
                        <option value="urn:li:fs_industry:23">
                          Food Production
                        </option>
                        <option value="urn:li:fs_industry:101">
                          Fundraising
                        </option>
                        <option value="urn:li:fs_industry:26">Furniture</option>
                        <option value="urn:li:fs_industry:29">
                          Gambling &amp; Casinos
                        </option>
                        <option value="urn:li:fs_industry:145">
                          Glass, Ceramics &amp; Concrete
                        </option>
                        <option value="urn:li:fs_industry:75">
                          Government Administration
                        </option>
                        <option value="urn:li:fs_industry:148">
                          Government Relations
                        </option>
                        <option value="urn:li:fs_industry:140">
                          Graphic Design
                        </option>
                        <option value="urn:li:fs_industry:124">
                          Health, Wellness &amp; Fitness
                        </option>
                        <option value="urn:li:fs_industry:68">
                          Higher Education
                        </option>
                        <option value="urn:li:fs_industry:14">
                          Hospital &amp; Health Care
                        </option>
                        <option value="urn:li:fs_industry:31">
                          Hospitality
                        </option>
                        <option value="urn:li:fs_industry:137">
                          Human Resources
                        </option>
                        <option value="urn:li:fs_industry:134">
                          Import &amp; Export
                        </option>
                        <option value="urn:li:fs_industry:88">
                          Individual &amp; Family Services
                        </option>
                        <option value="urn:li:fs_industry:147">
                          Industrial Automation
                        </option>
                        <option value="urn:li:fs_industry:84">
                          Information Services
                        </option>
                        <option value="urn:li:fs_industry:96">
                          Information Technology &amp; Services
                        </option>
                        <option value="urn:li:fs_industry:42">Insurance</option>
                        <option value="urn:li:fs_industry:74">
                          International Affairs
                        </option>
                        <option value="urn:li:fs_industry:141">
                          International Trade &amp; Development
                        </option>
                        <option value="urn:li:fs_industry:6">Internet</option>
                        <option value="urn:li:fs_industry:45">
                          Investment Banking
                        </option>
                        <option value="urn:li:fs_industry:46">
                          Investment Management
                        </option>
                        <option value="urn:li:fs_industry:73">Judiciary</option>
                        <option value="urn:li:fs_industry:77">
                          Law Enforcement
                        </option>
                        <option value="urn:li:fs_industry:9">
                          Law Practice
                        </option>
                        <option value="urn:li:fs_industry:10">
                          Legal Services
                        </option>
                        <option value="urn:li:fs_industry:72">
                          Legislative Office
                        </option>
                        <option value="urn:li:fs_industry:30">
                          Leisure, Travel &amp; Tourism
                        </option>
                        <option value="urn:li:fs_industry:85">Libraries</option>
                        <option value="urn:li:fs_industry:116">
                          Logistics &amp; Supply Chain
                        </option>
                        <option value="urn:li:fs_industry:143">
                          Luxury Goods &amp; Jewelry
                        </option>
                        <option value="urn:li:fs_industry:55">Machinery</option>
                        <option value="urn:li:fs_industry:11">
                          Management Consulting
                        </option>
                        <option value="urn:li:fs_industry:95">Maritime</option>
                        <option value="urn:li:fs_industry:97">
                          Market Research
                        </option>
                        <option value="urn:li:fs_industry:80">
                          Marketing &amp; Advertising
                        </option>
                        <option value="urn:li:fs_industry:135">
                          Mechanical Or Industrial Engineering
                        </option>
                        <option value="urn:li:fs_industry:126">
                          Media Production
                        </option>
                        <option value="urn:li:fs_industry:17">
                          Medical Device
                        </option>
                        <option value="urn:li:fs_industry:13">
                          Medical Practice
                        </option>
                        <option value="urn:li:fs_industry:139">
                          Mental Health Care
                        </option>
                        <option value="urn:li:fs_industry:71">Military</option>
                        <option value="urn:li:fs_industry:56">
                          Mining &amp; Metals
                        </option>
                        <option value="urn:li:fs_industry:35">
                          Motion Pictures &amp; Film
                        </option>
                        <option value="urn:li:fs_industry:37">
                          Museums &amp; Institutions
                        </option>
                        <option value="urn:li:fs_industry:115">Music</option>
                        <option value="urn:li:fs_industry:114">
                          Nanotechnology
                        </option>
                        <option value="urn:li:fs_industry:81">
                          Newspapers
                        </option>
                        <option value="urn:li:fs_industry:100">
                          Non-profit Organization Management
                        </option>
                        <option value="urn:li:fs_industry:57">
                          Oil &amp; Energy
                        </option>
                        <option value="urn:li:fs_industry:113">
                          Online Media
                        </option>
                        <option value="urn:li:fs_industry:123">
                          Outsourcing/Offshoring
                        </option>
                        <option value="urn:li:fs_industry:87">
                          Package/Freight Delivery
                        </option>
                        <option value="urn:li:fs_industry:146">
                          Packaging &amp; Containers
                        </option>
                        <option value="urn:li:fs_industry:61">
                          Paper &amp; Forest Products
                        </option>
                        <option value="urn:li:fs_industry:39">
                          Performing Arts
                        </option>
                        <option value="urn:li:fs_industry:15">
                          Pharmaceuticals
                        </option>
                        <option value="urn:li:fs_industry:131">
                          Philanthropy
                        </option>
                        <option value="urn:li:fs_industry:136">
                          Photography
                        </option>
                        <option value="urn:li:fs_industry:117">Plastics</option>
                        <option value="urn:li:fs_industry:107">
                          Political Organization
                        </option>
                        <option value="urn:li:fs_industry:67">
                          Primary/Secondary Education
                        </option>
                        <option value="urn:li:fs_industry:83">Printing</option>
                        <option value="urn:li:fs_industry:105">
                          Professional Training &amp; Coaching
                        </option>
                        <option value="urn:li:fs_industry:102">
                          Program Development
                        </option>
                        <option value="urn:li:fs_industry:79">
                          Public Policy
                        </option>
                        <option value="urn:li:fs_industry:98">
                          Public Relations &amp; Communications
                        </option>
                        <option value="urn:li:fs_industry:78">
                          Public Safety
                        </option>
                        <option value="urn:li:fs_industry:82">
                          Publishing
                        </option>
                        <option value="urn:li:fs_industry:62">
                          Railroad Manufacture
                        </option>
                        <option value="urn:li:fs_industry:64">Ranching</option>
                        <option value="urn:li:fs_industry:44">
                          Real Estate
                        </option>
                        <option value="urn:li:fs_industry:40">
                          Recreational Facilities &amp; Services
                        </option>
                        <option value="urn:li:fs_industry:89">
                          Religious Institutions
                        </option>
                        <option value="urn:li:fs_industry:144">
                          Renewables &amp; Environment
                        </option>
                        <option value="urn:li:fs_industry:70">Research</option>
                        <option value="urn:li:fs_industry:32">
                          Restaurants
                        </option>
                        <option value="urn:li:fs_industry:27">Retail</option>
                        <option value="urn:li:fs_industry:121">
                          Security &amp; Investigations
                        </option>
                        <option value="urn:li:fs_industry:7">
                          Semiconductors
                        </option>
                        <option value="urn:li:fs_industry:58">
                          Shipbuilding
                        </option>
                        <option value="urn:li:fs_industry:20">
                          Sporting Goods
                        </option>
                        <option value="urn:li:fs_industry:33">Sports</option>
                        <option value="urn:li:fs_industry:104">
                          Staffing &amp; Recruiting
                        </option>
                        <option value="urn:li:fs_industry:22">
                          Supermarkets
                        </option>
                        <option value="urn:li:fs_industry:8">
                          Telecommunications
                        </option>
                        <option value="urn:li:fs_industry:60">Textiles</option>
                        <option value="urn:li:fs_industry:130">
                          Think Tanks
                        </option>
                        <option value="urn:li:fs_industry:21">Tobacco</option>
                        <option value="urn:li:fs_industry:108">
                          Translation &amp; Localization
                        </option>
                        <option value="urn:li:fs_industry:92">
                          Transportation/Trucking/Railroad
                        </option>
                        <option value="urn:li:fs_industry:59">Utilities</option>
                        <option value="urn:li:fs_industry:106">
                          Venture Capital &amp; Private Equity
                        </option>
                        <option value="urn:li:fs_industry:16">
                          Veterinary
                        </option>
                        <option value="urn:li:fs_industry:93">
                          Warehousing
                        </option>
                        <option value="urn:li:fs_industry:133">
                          Wholesale
                        </option>
                        <option value="urn:li:fs_industry:142">
                          Wine &amp; Spirits
                        </option>
                        <option value="urn:li:fs_industry:119">Wireless</option>
                        <option value="urn:li:fs_industry:103">
                          Writing &amp; Editing
                        </option>
                      </select>
                    </div>
                  </div>

                  <div id="ember1969" class="ember-view">
                    <div id="ember1970" class="pe-form-field mb3 ember-view">
                      <input
                        tabindex="0"
                        id="position-update-headline-checkbox"
                        class="ember-checkbox state-checkbox visually-hidden toggle-switch__input ember-view"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <div
                    id="ember1800"
                    class="pe-form-field position-description floating-label ember-view"
                  >
                    <label
                      for="position-description"
                      class="pe-form-field__label label-text"
                    >
                      Description
                    </label>

                    <textarea
                      name="description"
                      id="position-description"
                      class="ember-text-area pe-form-field__textarea ember-view"
                      onChange={this.jobdescChangeHandler}
                    />
                  </div>
                  <div
                    id="ember1802"
                    class="pe-form-field pe-treasury-view ember-view"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.submitExperience}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="education" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Education</h4>
              </div>
              <div class="modal-body">
                <div class="pe-s-form__body pe-form-body">
                  <div class="pe-form-field edu-school-name has-logo  ">
                    <div class="pe-logo-container">
                      <img
                        class="lazy-image pe-logo-container__img ghost-school loaded"
                        alt=""
                        height="24"
                        width="24"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      />

                      <div id="ember2873" class="ember-view">
                        {" "}
                        <label for="edu-school-typeahead" class="mb1 required">
                          School
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember2874-results"
                          id="edu-school-typeahead"
                          placeholder="Ex: Boston University"
                          type="text"
                          onChange={this.schoolChangeHandler}
                        />
                      </div>
                    </div>

                    <div id="ember2876" class="ember-view" />
                  </div>

                  <div class="pe-form-field edu-degree-name">
                    <div id="ember2877" class="ember-view">
                      {" "}
                      <label for="edu-degree-typeahead" class="mb1 ">
                        Degree
                      </label>
                      <input
                        role="combobox"
                        autocomplete="off"
                        spellcheck="false"
                        aria-autocomplete="list"
                        aria-owns="ember2878-results"
                        id="edu-degree-typeahead"
                        placeholder="Ex: Bachelor’s"
                        type="text"
                        onChange={this.degreeChangeHandler}
                      />
                    </div>

                    <div id="ember2880" class="ember-view" />
                  </div>

                  <div class="pe-form-field edu-field-of-study">
                    <div id="ember2881" class="ember-view">
                      {" "}
                      <label for="edu-field-of-study-typeahead" class="mb1 ">
                        Field of study
                      </label>
                      <input
                        role="combobox"
                        autocomplete="off"
                        spellcheck="false"
                        aria-autocomplete="list"
                        aria-owns="ember2882-results"
                        id="edu-field-of-study-typeahead"
                        placeholder="Ex: Business"
                        type="text"
                        onChange={this.fieldofstudyChangeHandler}
                      />
                    </div>

                    <div id="ember2884" class="ember-view" />
                  </div>

                  <div class="pe-form-field floating-label  ">
                    <label
                      for="edu-grade"
                      class="pe-form-field__label label-text"
                    >
                      Grade
                    </label>

                    <input
                      name="grade"
                      maxlength="80"
                      id="edu-grade"
                      class="ember-text-field pe-form-field__text-input ember-view"
                      type="text"
                      onChange={this.gradeChangeHandler}
                    />
                  </div>

                  <div
                    id="ember2887"
                    class="pe-secondary-locale-tooltip-trigger ember-view"
                  >
                    <fieldset class="pe-form-field pe-form-time-period ">
                      <div class="pe-form-time-period__container">
                        <div class="pe-form-time-period__start-date">
                          <label
                            for="pe-education-form__start-year"
                            class="pe-form-field__label"
                          >
                            From Year
                          </label>
                          <span id="ember2888" class="ember-view">
                            <select
                              data-control-name="edit_education_start_year"
                              name="startYear"
                              id="pe-education-form__start-year"
                              class="pe-education-form__start-year ember-view"
                            >
                              {" "}
                              <option
                                value=""
                                onChange={this.schoolfromyearChangeHandler}
                              >
                                Year
                              </option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                              <option value="1919">1919</option>
                              <option value="1918">1918</option>
                              <option value="1917">1917</option>
                              <option value="1916">1916</option>
                              <option value="1915">1915</option>
                              <option value="1914">1914</option>
                              <option value="1913">1913</option>
                              <option value="1912">1912</option>
                              <option value="1911">1911</option>
                              <option value="1910">1910</option>
                              <option value="1909">1909</option>
                              <option value="1908">1908</option>
                              <option value="1907">1907</option>
                              <option value="1906">1906</option>
                              <option value="1905">1905</option>
                              <option value="1904">1904</option>
                              <option value="1903">1903</option>
                              <option value="1902">1902</option>
                              <option value="1901">1901</option>
                              <option value="1900">1900</option>
                            </select>
                          </span>
                        </div>

                        <div class="pe-form-time-period__end-date">
                          <label
                            for="pe-education-form__end-year"
                            class="pe-form-field__label"
                          >
                            To Year (or expected)
                          </label>
                          <span id="ember3009" class="ember-view">
                            <select
                              data-control-name="edit_education_end_year"
                              id="pe-education-form__end-year"
                              class="pe-education-form__end-year ember-view"
                            >
                              {" "}
                              <option
                                value=""
                                onChange={this.schooltoyearChangeHandler}
                              >
                                Year
                              </option>
                              <option value="2025">2025</option>
                              <option value="2024">2024</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                              <option value="2019">2019</option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                              <option value="1919">1919</option>
                              <option value="1918">1918</option>
                              <option value="1917">1917</option>
                              <option value="1916">1916</option>
                              <option value="1915">1915</option>
                              <option value="1914">1914</option>
                              <option value="1913">1913</option>
                              <option value="1912">1912</option>
                              <option value="1911">1911</option>
                              <option value="1910">1910</option>
                              <option value="1909">1909</option>
                              <option value="1908">1908</option>
                              <option value="1907">1907</option>
                              <option value="1906">1906</option>
                              <option value="1905">1905</option>
                              <option value="1904">1904</option>
                              <option value="1903">1903</option>
                              <option value="1902">1902</option>
                              <option value="1901">1901</option>
                              <option value="1900">1900</option>
                            </select>
                          </span>
                        </div>
                      </div>

                      <div id="ember3137" class="ember-view" />
                    </fieldset>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.submitschool}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>

        <div id="editeducation" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Education</h4>
              </div>
              <div class="modal-body">
                <div class="pe-s-form__body pe-form-body">
                  <div class="pe-form-field edu-school-name has-logo  ">
                    <div class="pe-logo-container">
                      <img
                        class="lazy-image pe-logo-container__img ghost-school loaded"
                        alt=""
                        height="24"
                        width="24"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      />

                      <div id="ember2873" class="ember-view">
                        {" "}
                        <label for="edu-school-typeahead" class="mb1 required">
                          School
                        </label>
                        <input
                          role="combobox"
                          autocomplete="off"
                          spellcheck="false"
                          aria-autocomplete="list"
                          aria-owns="ember2874-results"
                          id="edu-school-typeahead"
                          placeholder="Ex: Boston University"
                          type="text"
                          value={this.state.school}
                          onChange={this.schoolChangeHandler}
                        />
                      </div>
                    </div>

                    <div id="ember2876" class="ember-view" />
                  </div>

                  <div class="pe-form-field edu-degree-name">
                    <div id="ember2877" class="ember-view">
                      {" "}
                      <label for="edu-degree-typeahead" class="mb1 ">
                        Degree
                      </label>
                      <input
                        role="combobox"
                        autocomplete="off"
                        spellcheck="false"
                        aria-autocomplete="list"
                        aria-owns="ember2878-results"
                        id="edu-degree-typeahead"
                        placeholder="Ex: Bachelor’s"
                        type="text"
                        value={this.state.degree}
                        onChange={this.degreeChangeHandler}
                      />
                    </div>

                    <div id="ember2880" class="ember-view" />
                  </div>

                  <div class="pe-form-field edu-field-of-study">
                    <div id="ember2881" class="ember-view">
                      {" "}
                      <label for="edu-field-of-study-typeahead" class="mb1 ">
                        Field of study
                      </label>
                      <input
                        role="combobox"
                        autocomplete="off"
                        spellcheck="false"
                        aria-autocomplete="list"
                        aria-owns="ember2882-results"
                        id="edu-field-of-study-typeahead"
                        placeholder="Ex: Business"
                        type="text"
                        value={this.state.fieldofstudy}
                        onChange={this.fieldofstudyChangeHandler}
                      />
                    </div>

                    <div id="ember2884" class="ember-view" />
                  </div>

                  <div class="pe-form-field floating-label  ">
                    <label
                      for="edu-grade"
                      class="pe-form-field__label label-text"
                    >
                      Grade
                    </label>

                    <input
                      name="grade"
                      maxlength="80"
                      id="edu-grade"
                      class="ember-text-field pe-form-field__text-input ember-view"
                      type="text"
                      value={this.state.grade}
                      onChange={this.gradeChangeHandler}
                    />
                  </div>

                  <div
                    id="ember2887"
                    class="pe-secondary-locale-tooltip-trigger ember-view"
                  >
                    <fieldset class="pe-form-field pe-form-time-period ">
                      <div class="pe-form-time-period__container">
                        <div class="pe-form-time-period__start-date">
                          <label
                            for="pe-education-form__start-year"
                            class="pe-form-field__label"
                          >
                            From Year
                          </label>
                          <span id="ember2888" class="ember-view">
                            <select
                              data-control-name="edit_education_start_year"
                              name="startYear"
                              id="pe-education-form__start-year"
                              class="pe-education-form__start-year ember-view"
                            >
                              {" "}
                              <option
                                value=""
                                onChange={this.schoolfromyearChangeHandler}
                              >
                                Year
                              </option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                              <option value="1919">1919</option>
                              <option value="1918">1918</option>
                              <option value="1917">1917</option>
                              <option value="1916">1916</option>
                              <option value="1915">1915</option>
                              <option value="1914">1914</option>
                              <option value="1913">1913</option>
                              <option value="1912">1912</option>
                              <option value="1911">1911</option>
                              <option value="1910">1910</option>
                              <option value="1909">1909</option>
                              <option value="1908">1908</option>
                              <option value="1907">1907</option>
                              <option value="1906">1906</option>
                              <option value="1905">1905</option>
                              <option value="1904">1904</option>
                              <option value="1903">1903</option>
                              <option value="1902">1902</option>
                              <option value="1901">1901</option>
                              <option value="1900">1900</option>
                            </select>
                          </span>
                        </div>

                        <div class="pe-form-time-period__end-date">
                          <label
                            for="pe-education-form__end-year"
                            class="pe-form-field__label"
                          >
                            To Year (or expected)
                          </label>
                          <span id="ember3009" class="ember-view">
                            <select
                              data-control-name="edit_education_end_year"
                              id="pe-education-form__end-year"
                              class="pe-education-form__end-year ember-view"
                            >
                              {" "}
                              <option
                                value=""
                                onChange={this.schooltoyearChangeHandler}
                              >
                                Year
                              </option>
                              <option value="2025">2025</option>
                              <option value="2024">2024</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                              <option value="2019">2019</option>
                              <option value="2018">2018</option>
                              <option value="2017">2017</option>
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                              <option value="2006">2006</option>
                              <option value="2005">2005</option>
                              <option value="2004">2004</option>
                              <option value="2003">2003</option>
                              <option value="2002">2002</option>
                              <option value="2001">2001</option>
                              <option value="2000">2000</option>
                              <option value="1999">1999</option>
                              <option value="1998">1998</option>
                              <option value="1997">1997</option>
                              <option value="1996">1996</option>
                              <option value="1995">1995</option>
                              <option value="1994">1994</option>
                              <option value="1993">1993</option>
                              <option value="1992">1992</option>
                              <option value="1991">1991</option>
                              <option value="1990">1990</option>
                              <option value="1989">1989</option>
                              <option value="1988">1988</option>
                              <option value="1987">1987</option>
                              <option value="1986">1986</option>
                              <option value="1985">1985</option>
                              <option value="1984">1984</option>
                              <option value="1983">1983</option>
                              <option value="1982">1982</option>
                              <option value="1981">1981</option>
                              <option value="1980">1980</option>
                              <option value="1979">1979</option>
                              <option value="1978">1978</option>
                              <option value="1977">1977</option>
                              <option value="1976">1976</option>
                              <option value="1975">1975</option>
                              <option value="1974">1974</option>
                              <option value="1973">1973</option>
                              <option value="1972">1972</option>
                              <option value="1971">1971</option>
                              <option value="1970">1970</option>
                              <option value="1969">1969</option>
                              <option value="1968">1968</option>
                              <option value="1967">1967</option>
                              <option value="1966">1966</option>
                              <option value="1965">1965</option>
                              <option value="1964">1964</option>
                              <option value="1963">1963</option>
                              <option value="1962">1962</option>
                              <option value="1961">1961</option>
                              <option value="1960">1960</option>
                              <option value="1959">1959</option>
                              <option value="1958">1958</option>
                              <option value="1957">1957</option>
                              <option value="1956">1956</option>
                              <option value="1955">1955</option>
                              <option value="1954">1954</option>
                              <option value="1953">1953</option>
                              <option value="1952">1952</option>
                              <option value="1951">1951</option>
                              <option value="1950">1950</option>
                              <option value="1949">1949</option>
                              <option value="1948">1948</option>
                              <option value="1947">1947</option>
                              <option value="1946">1946</option>
                              <option value="1945">1945</option>
                              <option value="1944">1944</option>
                              <option value="1943">1943</option>
                              <option value="1942">1942</option>
                              <option value="1941">1941</option>
                              <option value="1940">1940</option>
                              <option value="1939">1939</option>
                              <option value="1938">1938</option>
                              <option value="1937">1937</option>
                              <option value="1936">1936</option>
                              <option value="1935">1935</option>
                              <option value="1934">1934</option>
                              <option value="1933">1933</option>
                              <option value="1932">1932</option>
                              <option value="1931">1931</option>
                              <option value="1930">1930</option>
                              <option value="1929">1929</option>
                              <option value="1928">1928</option>
                              <option value="1927">1927</option>
                              <option value="1926">1926</option>
                              <option value="1925">1925</option>
                              <option value="1924">1924</option>
                              <option value="1923">1923</option>
                              <option value="1922">1922</option>
                              <option value="1921">1921</option>
                              <option value="1920">1920</option>
                              <option value="1919">1919</option>
                              <option value="1918">1918</option>
                              <option value="1917">1917</option>
                              <option value="1916">1916</option>
                              <option value="1915">1915</option>
                              <option value="1914">1914</option>
                              <option value="1913">1913</option>
                              <option value="1912">1912</option>
                              <option value="1911">1911</option>
                              <option value="1910">1910</option>
                              <option value="1909">1909</option>
                              <option value="1908">1908</option>
                              <option value="1907">1907</option>
                              <option value="1906">1906</option>
                              <option value="1905">1905</option>
                              <option value="1904">1904</option>
                              <option value="1903">1903</option>
                              <option value="1902">1902</option>
                              <option value="1901">1901</option>
                              <option value="1900">1900</option>
                            </select>
                          </span>
                        </div>
                      </div>

                      <div id="ember3137" class="ember-view" />
                    </fieldset>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.editschool}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <br />
          <br />
        </div>

        <div class="modal fade" id="editskills" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Skills</h4>
              </div>
              <div class="modal-body">
                <div class="type-ahead-input">
                  <label for="a11y-ember3230" class="visually-hidden">
                    Skill (ex: Data Analysis)
                  </label>
                  <input
                    placeholder="Skill (ex: Data Analysis)"
                    autocorrect="off"
                    autocapitalize="off"
                    id="a11y-ember3230"
                    class="ember-text-field ember-view"
                    value={this.state.skills ? this.state.skills : ""}
                    onChange={this.skillsChangeHandler}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.editskills}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="skills" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Skills</h4>
              </div>
              <div class="modal-body">
                <div class="type-ahead-input">
                  <label for="a11y-ember3230" class="visually-hidden">
                    Skill (ex: Data Analysis)
                  </label>
                  <input
                    placeholder="Skill (ex: Data Analysis)"
                    autocorrect="off"
                    autocapitalize="off"
                    id="a11y-ember3230"
                    class="ember-text-field ember-view"
                    onChange={this.skillsChangeHandler}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.submitskills}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="resume" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Upload resume</h4>
              </div>
              <div class="modal-body">
                <div class="type-ahead-input">
                  <label for="a11y-ember3230" class="visually-hidden">
                    Resume
                  </label>
                  {/* <input class="ember-text-field ember-view" type="file" /> */}
                  <Dropzone
                    className="dropzone"
                    multiple={false}
                    onDrop={this.onResumeDrop.bind(this)}
                  >
                    <p>Drop a resume or click to select a file to upload.</p>
                  </Dropzone>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Edit Intro</h4>
              </div>
              <div class="modal-body">
                <div class="pe-s-multi-field" />

                <div
                  class="pe-form-field pe-top-card-form__headline-field floating-label  "
                  data-form-elem-focus="true"
                >
                  <label
                    for="topcard-headline"
                    class="pe-form-field__label label-text required"
                  >
                    Headline
                  </label>

                  <textarea
                    name="headline"
                    id="topcard-headline"
                    class="pe-top-card-form__headline-text ember-text-area pe-form-field__textarea ember-view"
                    onChange={this.headlineChangeHandler}
                  />
                </div>
                <div
                  id="ember3332"
                  class="pe-form-field pe-top-card-form__location-picker ember-view"
                >
                  <div class="pe-s-multi-field" />
                </div>

                <div class="pe-form-field summary-field floating-label  ">
                  <label
                    for="topcard-summary"
                    class="pe-form-field__label label-text"
                  >
                    Summary
                  </label>

                  <textarea
                    name="summary"
                    id="topcard-summary"
                    class="ember-text-area pe-form-field__textarea ember-view"
                    onChange={this.summaryChangeHandler}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.submitSummary}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="editsummary" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Edit Intro</h4>
              </div>
              <div class="modal-body">
                <div class="pe-s-multi-field" />

                <div
                  class="pe-form-field pe-top-card-form__headline-field floating-label  "
                  data-form-elem-focus="true"
                >
                  <label
                    for="topcard-headline"
                    class="pe-form-field__label label-text required"
                  >
                    Headline
                  </label>

                  <textarea
                    name="headline"
                    id="topcard-headline"
                    class="pe-top-card-form__headline-text ember-text-area pe-form-field__textarea ember-view"
                    value={this.state.headline}
                    onChange={this.headlineChangeHandler}
                  />
                </div>
                <div
                  id="ember3332"
                  class="pe-form-field pe-top-card-form__location-picker ember-view"
                >
                  <div class="pe-s-multi-field" />
                </div>

                <div class="pe-form-field summary-field floating-label  ">
                  <label
                    for="topcard-summary"
                    class="pe-form-field__label label-text"
                  >
                    Summary
                  </label>

                  <textarea
                    name="summary"
                    id="topcard-summary"
                    class="ember-text-area pe-form-field__textarea ember-view"
                    value={this.state.summary}
                    onChange={this.summaryChangeHandler}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.submitSummary}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    username: state.username,
    summaryinserted: state.summaryinserted,
    userdata: state.userdata,
    url: state.applicantLogin.url
  };
};

export default connect(
  mapStateToProps,
  {
    summaryinsert,
    experienceinsert,
    schoolinsert,
    skillsinsert,
    addPhoto,
    addResume
  }
)(Homepage);
