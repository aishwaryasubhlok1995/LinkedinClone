import React, { Component } from "react";
import "../../css/homepage.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { getJWTUsername } from "../common/auth";
import { sendConnectionRequest } from "../../actions/connectionsActions";

import Header from "../Header/head";
import { DropdownMenu, MenuItem } from "react-bootstrap-dropdown-menu";
// import { getMaxListeners } from 'cluster';

//Define a Login Component
class ViewProfile extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      userdata: []
    };
    //Bind the handlers to this class
  }
  //Call the Will Mount to set the auth Flag to false
  async componentDidMount() {
    var headers = new Headers();
    //prevent page from refresh
    // e.preventDefault();
    const username = this.props.location.state.username;
    const data = {
      username: username
    };
    const viewerUsername = getJWTUsername();
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    const res = await axios
      .post("http://localhost:3001/getuserdata", data)
      .then(response => {
        console.log("Updated List", response.data.updatedList);
        this.setState({
          userdata: response.data.updatedList
        });
      });
    const data2 = {
      profileUsername: username,
      viewerUsername: viewerUsername
    };
    axios
      .post("http://localhost:3001/postProfileView", data2)
      .then(response => {
        console.log("View Sent");
      });
  }

  sendRequest = data => {
    var username = getJWTUsername();
    const connectionData = {
      connector: username,
      connectee: data.email
    };
    console.log(connectionData);

    this.props.sendConnectionRequest(connectionData, response => {
      if (response.data.message === "you are successfully to request connect") {
        window.alert("Request sent successfully");
      } else {
        window.alert("You have already sent a request to this person.");
      }
    });
  };

  render() {
    if (this.state.userdata == null) {
      return (
        <React.Fragment>
          <Header />
          <p className="notfound">User profile does not exist.</p>
        </React.Fragment>
      );
    }

    let experiencedata =
      this.state.userdata.experience &&
      this.state.userdata.experience.map(userdetail => {
        return (
          <div>
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
        <Header />
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
                      <button
                        data-control-name="edit_profile_photo"
                        class="profile-photo-edit__edit-btn"
                        data-ember-action=""
                        data-ember-action-1110="1110"
                      >
                        <img
                          src={this.state.userdata.photo}
                          class="profile-photo-edit__preview"
                          alt="Edit photo"
                          height="200"
                          width="200"
                        />
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
                          : ""}{" "}
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
                        {this.state.userdata ? this.state.userdata.school : ""}
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
                            <button
                              class="dropbtn"
                              onClick={() =>
                                this.sendRequest(this.state.userdata)
                              }
                            >
                              Connect
                            </button>
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
                            : ""}
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

              <div class="summary">
                <div class="summarybox">
                  <section class="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                    <h3>Summary</h3>
                    <div>
                      {this.state.userdata
                        ? this.state.userdata.profileSummary
                        : ""}
                    </div>
                  </section>
                  <section class="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                    <h3>Skills</h3>
                    <div>
                      {this.state.userdata ? this.state.userdata.skills : ""}
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
              </div>
            </div>
            <div class="sidebarad">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="box" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    username: state.username,
    summaryinserted: state.summaryinserted,
    userdata: state.userdata,
    newConnection: state.connections.newConnection
  };
};

// export default connect(mapStateToProps,{summaryinsert,experienceinsert,schoolinsert,skillsinsert})(Homepage);

export default connect(
  mapStateToProps,
  {
    sendConnectionRequest
  }
)(ViewProfile);
