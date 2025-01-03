import React, { Component } from "react";
import "../../css/jobSearch.css";
import { getJWTUsername } from "../common/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import supportingImage4 from "../../images/supportingImage4.jpg";
import supportingImage2 from "../../images/supportingImage2.png";
import {
  searchJob,
  saveJob,
  applyJob,
  getsavedJob
} from "../../actions/jobActions";
import Home from "./jobFilter";
import { getToken } from "../common/auth";
import { Redirect } from "react-router";
import request from "superagent";
import Dropzone from "react-dropzone";
var clicks = {};
const CLOUDINARY_UPLOAD_PRESET = "g4q2o6at";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/ungcmpe273/upload";

class JobSearch extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      Job: "",
      Location: "",
      properties1: [],
      view1: [],
      properties2: [],
      properties: [],
      appliedjobs: [],
      imageNumber: 0,
      hasApplied: "",
      imageView: [],
      userdata: [],
      url: "",
      open: false,
      clicks: {}
    };
    this.openbox = this.openbox.bind(this);
    this.closebox = this.closebox.bind(this);
    this.SearchChangeHandler = this.SearchChangeHandler.bind(this);
    this.LocationChangeHandler = this.LocationChangeHandler.bind(this);
    this.Search = this.Search.bind(this);
    this.view = this.view.bind(this);
    this.sendApplication = this.sendApplication.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }
  state = { uploadedFile: null };
  componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
    const data = {
      Job: this.state.Job,
      Location: this.state.Location,
      email: getJWTUsername(),
      username: getJWTUsername()
    };
    this.props.searchJob(data, async () => {
      console.log(this.props.search_job_results);

      this.setState({
        properties1: this.props.search_job_results,
        view1: this.state.view1.concat(this.props.search_job_results[0])
      });
      // this.state.properties1.map(property => {
      //   console.log(property.Icon);
      //   // axios
      //   //   .post("http://localhost:3001/download/" + property.Icon)
      //   //   .then(response => {
      //   //     console.log("Imgae Res : ", response);
      //   //     let imagePreview = "data:image/jpg;base64, " + response.data;
      //   //     this.setState({
      //   //       imageView: this.state.imageView.concat(imagePreview)
      //   //     });
      //   //   });
      // });
    });
    this.props.getsavedJob(data, async () => {
      this.setState({
        appliedjobs: this.state.appliedjobs.concat(this.props.savedjobs)
      });
    });
    const res = axios
      .post("http://localhost:3001/getuserdata", data)
      .then(response => {
        console.log("Updated List", response.data.updatedList);
        this.setState({
          userdata: response.data.updatedList
        });
      });
  }

  componentCleanup() {
    // this will hold the cleanup code
    // whatever you want to do when the component is unmounted or page refreshes
    console.log("IN COMPPP CLEANUPP");
    const data = { clicks: this.state.clicks };
    axios.post("http://localhost:3001/postjobclicks", data).then(response => {
      console.log("Clicks Posted");
    });
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

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
        console.log("url=", response.body.secure_url);
        this.setState({
          url: response.body.secure_url
        });
      }
    });
  }

  onResumeDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleResumeUpload(files[0]);
  };

  openbox() {
    this.setState({
      open: true
    });
  }
  closebox() {
    this.setState({
      open: false
    });
  }
  SearchChangeHandler = e => {
    this.setState({
      Job: e.target.value
    });
  };
  LocationChangeHandler = e => {
    this.setState({
      Location: e.target.value
    });
  };
  Search = e => {
    console.log("Clicked");
    this.setState({
      view1: []
    });
    const data = {
      Job: this.state.Job,
      Location: this.state.Location,
      userid: getJWTUsername()
    };
    console.log(data);
    if (this.state.Job == "" && this.state.Location == "") {
      alert("Fileds cannot be empty");
    } else {
      this.props.searchJob(data, () => {
        console.log(this.props.search_job_results);
        if (this.props.search_job_results.length == 0) {
          alert("No Jobs Available Try again");
        } else {
          this.setState({
            properties1: this.props.search_job_results,
            view1: this.state.view1.concat(this.props.search_job_results[0])
          });
          // this.state.properties1.map(property => {

          //   axios
          //     .post("http://localhost:3001/download/" + property.Icon)
          //     .then(response => {
          //       console.log("Imgae Res : ", response);
          //       let imagePreview = "data:image/jpg;base64, " + response.data;
          //       this.setState({
          //         imageView: this.state.imageView.concat(imagePreview)
          //       });
          //     });
          // });
        }
      });
    }
  };

  save = e => {
    console.log(e);

    const data = {
      jobid: e._id,
      Userid: getJWTUsername(),
      timestamp: new Date(),
      firstname: this.state.userdata.firstname,
      lastname: this.state.userdata.lastname,
      postedBy: e.postedBy
    };
    console.log("save data", data);
    this.props.saveJob(data, () => {
      alert("saved a job");
      this.props.history.push("./job-saved");
    });
  };

  sendApplication = e => {
    const data = {
      email: getJWTUsername(),
      jobid: e._id,
      timestamp: new Date(),
      firstname: this.state.userdata.firstname,
      lastname: this.state.userdata.lastname,
      url: this.state.url
    };
    console.log(data);
    this.props.applyJob(data, () => {
      alert("Applied for job");
      window.location.href = "/job-applied";
    });
  };

  view = e => {
    console.log(e);
    if (clicks[e]) clicks[e]++;
    else clicks[e] = 1;
    this.setState({
      clicks: clicks
    });
    console.log("CLLLL:", clicks);
    var properties1 = this.props.search_job_results;
    var savedjobs1 = this.props.savedjobs;
    console.log(properties1);
    var propertydetails = properties1.filter(function(property) {
      return property._id == e;
    });
    var index1 = savedjobs1.findIndex(function(item) {
      return item.jobID == e;
    });
    console.log(index1);

    if (index1 != -1) {
      this.setState({
        view1: propertydetails,
        imageNumber: index1,
        hasApplied: true
      });
    } else {
      this.setState({
        view1: propertydetails,
        imageNumber: index1,
        hasApplied: false
      });
      console.log(this.state.hasApplied);
    }
  };

  render() {
    // window.onbeforeunload = function(){
    //   console.log("IN WILL UNMOUNTTTTTT");
    //   const data = { clicks: this.state.clicks };
    //   axios.post("http://localhost:3001/postjobclicks", data).then(response => {
    //     console.log("Clicks Posted");
    //   });
    // };
    var userdata = this.state.userdata;

    var i = -1;

    console.log(this.props.savedjobs);

    let Details = this.state.properties1.map(property => {
      i = i + 1;

      const token = getToken();

      let redirectVar = null;
      if (token === false) {
        redirectVar = <Redirect to="/login" />;
      }
      return (
        <div class="row" style={{ paddingLeft: "5vw" }}>
          {redirectVar}

          <div class="Jobs  row">
            <div class="col-1">
              <img src={property.logo} />
            </div>
            <div
              class="col-11"
              style={{ "padding-left": "30px", "padding-top": "10px" }}
            >
              <li class="blue" onClick={this.view.bind(this, property._id)}>
                {property.title}
              </li>
              <br />
              {property.company}
              <br />
              {property.location}
              <br />
              {property.description}
              <br />
            </div>
          </div>
        </div>
      );
    });

    let Details1 = this.state.view1.map(property => {
      return (
        <div class="Jobs">
          <div class="row">
            <div class="col-4">
              <img
                src={property.logo}
                style={{ width: "200px", height: "150px" }}
              />
            </div>

            <div
              class="col-8"
              style={{ "padding-left": "20px", "padding-top": "10px" }}
            >
              <li class="blue">
                <a target="_blank">
                  <Link
                    to={{
                      pathname: "/job-details",
                      state: { job_id: property._id }
                    }}
                  >
                    {property.title}
                  </Link>
                </a>
              </li>
              <br />
              {property.company}
              <br />
              {property.location}
              <br />
              <button
                class="Button"
                onClick={this.save.bind(this, property)}
                disabled={this.state.hasApplied ? true : false}
              >
                Save
              </button>
              <button class="Button" onClick={this.openbox}>
                Apply
              </button>
            </div>
            <div class="row">
              <div
                class="col-4"
                style={{ "padding-left": "40px", "padding-top": "20px" }}
              >
                Job
                <br />
                <li> &bull;0 applicants</li>
              </div>
              <div
                class="col-4"
                style={{ "padding-left": "40px", "padding-top": "20px" }}
              >
                Company
                <br />
                <li>&bull; Architecture & Planning</li>
                <br />
                <li>&bull; 1000 employess</li>
              </div>
              <div
                class="col-4"
                style={{ "padding-left": "40px", "padding-top": "20px" }}
              >
                Connections
                <br />
                <li>&bull; 0 Connections</li>
              </div>
              <div
                style={{
                  "padding-left": "30px",
                  "padding-top": "20px",
                  color: "rgba(0,0,0,.6)"
                }}
              >
                Job Description
              </div>
              <hr />
            </div>

            <div class="row" style={{ "padding-left": "30px" }}>
              <div class="col-6">
                <div
                  style={{ "text-align": "justify", "padding-bottom": "10px" }}
                >
                  {" "}
                  {property.Details}
                </div>

                <div
                  style={{ "text-align": "justify", "padding-bottom": "10px" }}
                >
                  M Moser Associates is looking for a seasoned Interior Designer
                  to lead our San Francisco team of architects, interior
                  designers, and construction professionals in the design and
                  delivery of transformative large scale workplace projects.
                </div>
                <div
                  style={{ "text-align": "justify", "padding-bottom": "10px" }}
                >
                  M Moser aims to transform the way people work and as such we
                  are seeking design professionals who are motivated by people
                  and are inspired by how design connects elements of people,
                  organizations and culture, to realize business goals.
                </div>
                <div style={{ "text-align": "justify" }}>
                  As the Design Leader you will play a key role in advancing our
                  design solutions, in generating new ideas for both projects
                  and for the systems we use execute work, while maintaining
                  enthusiasm about achieving clients business goals through our
                  design
                </div>
              </div>
              <div class="col-6">
                <img
                  src={supportingImage2}
                  style={{ width: "250px", height: "500px" }}
                />
                <div
                  style={{ color: "rgba(0,0,0,.6)", "padding-bottom": "10px" }}
                >
                  Job Details
                </div>
                <div
                  style={{ color: "rgba(0,0,0,.75)", "font-size": "1.0rem" }}
                >
                  Employment Type
                </div>
                <div style={{ "padding-bottom": "10px" }}>Full Time</div>
                <div
                  style={{ color: "rgba(0,0,0,.75)", "font-size": "1.0rem" }}
                >
                  Industry
                </div>
                <div style={{ "padding-bottom": "10px" }}>Designing</div>
                <div
                  style={{ color: "rgba(0,0,0,.75)", "font-size": "1.0rem" }}
                >
                  Functions
                </div>
                <div style={{ "padding-bottom": "10px" }}>Planning</div>
              </div>
            </div>
            {/* ---------------------------Model------------------------------------------------------------------------- */}
            <div class="modal-dialog modal-lg">
              <Modal
                open={this.state.open}
                onClose={this.closebox}
                style={{ "min-width": "800px" }}
                center
              >
                <header class="modal-header">
                  <h2 style={{ color: "rgba(0,0,0,.75)" }}>
                    Apply To {property.company}
                  </h2>
                </header>
                <div class="row">
                  <div>
                    <img src={userdata.photo} />{" "}
                  </div>
                  <div class="col-4">
                    {userdata.firstname} <br />
                    Student <br />
                    San Jose
                  </div>
                </div>

                <div style={{ horizontalAlign: "middle" }}>
                  <span style={{ display: "block" }}>
                    Email:
                    <input
                      type="text"
                      placeholder={userdata.email}
                      onChange={this.propertyTopic}
                      style={{
                        "margin-bottom": "10px",
                        width: "100%",
                        height: "44px",
                        padding: "9px 14px",
                        "font-size": "10px",
                        "border-radius": "0px",
                        "line-height": "1.33",
                        "margin-top": "16px"
                      }}
                    />
                  </span>
                  Resume(Optional):
                  <br />
                  {/* <input
                    type="submit"
                    value="Upload Resume"
                    onClick={this.closebox}
                    style={{
                      "vertical-align": "middle",
                      width: "25%",
                      height: "40px",
                      "background-color": "light-grey",
                      "border-color": "light-grey",
                      "font-size": "18px",
                      color: "black",
                      "text-align": "center",
                      cursor: "pointer"
                    }}
                  /> */}
                  <Dropzone
                    className="dropzone"
                    multiple={false}
                    onDrop={this.onResumeDrop.bind(this)}
                  >
                    <p>Drop a resume or click to select a file to upload.</p>
                  </Dropzone>
                  <br />
                  Microsoft Word or PDF only (5MB)
                  <br /> <br />
                  We include a copy of your full profile with your application
                  Learn what we do with your resume
                  <br /> <br />
                  <span style={{ justifyContent: "center", display: "flex" }}>
                    <input
                      type="submit"
                      value="Cancel"
                      onClick={this.closebox}
                      style={{
                        "vertical-align": "middle",
                        width: "40%",
                        height: "44px",
                        "background-color": "light-grey",
                        "border-color": "light-grey",
                        "font-size": "18px",
                        color: "black",
                        padding: " 7px 31px",
                        "text-align": "center",
                        cursor: "pointer"
                      }}
                    />

                    <input
                      type="submit"
                      value="Submit Application"
                      onClick={this.sendApplication.bind(this, property)}
                      style={{
                        "margin-left": "5px",
                        "vertical-align": "middle",
                        width: "40%",
                        height: "44px",
                        "background-color": "#ff8a00",
                        "border-color": "#ff8a00",
                        "font-size": "18px",
                        color: "#FFE",
                        padding: " 7px 31px",
                        "text-align": "center",
                        cursor: "pointer"
                      }}
                    />
                  </span>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div class="menu">
        <div class="extendmenu row">
          <div class="icon">
            <a href="/home">
              {" "}
              <i class="fa fa-linkedin-square" />
            </a>
          </div>

          <div class="Searchfields">
            <div class="row">
              <div col="col-2" class="inputfield ">
                <input
                  style={{ "background-color": "#e1e9ee" }}
                  type="text"
                  placeholder="Search"
                  onChange={this.SearchChangeHandler}
                />
              </div>

              <div col="col-2" class="inputfield1 ">
                <input
                  style={{ "background-color": "#e1e9ee" }}
                  type="text"
                  placeholder="Job Location"
                  onChange={this.LocationChangeHandler}
                />
              </div>
            </div>
          </div>

          <button class="Button" onClick={this.Search}>
            Search
          </button>
          <div>
            <i class="fa fa-home w3-jumbo" />
            <div class="go-middle">
              <Link to="/job-saved">
                <a>
                  <span class="normal">viewsavedjobs</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Home />
        </div>

        <div>
          <div class="row">
            <div class="col-6">{Details}</div>
            <div class="col-6">{Details1}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  search_job_results: state.jobReducer.search_job_results,
  view: state.jobReducer.view,
  savedjobs: state.jobReducer.savejob
});

export default connect(
  mapStateToProps,
  { searchJob, saveJob, applyJob, getsavedJob }
)(JobSearch);
