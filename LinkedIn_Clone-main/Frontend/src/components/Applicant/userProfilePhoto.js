import React, { Component } from "react";
import "../../css/userProfilePhoto.css";
import { Redirect } from "react-router";
import { getSignupToken } from "../common/auth";
import request from "superagent";
import Dropzone from "react-dropzone";
import { addPhoto } from "../../actions/applicantActions";
import { connect } from "react-redux";

const CLOUDINARY_UPLOAD_PRESET = "g4q2o6at";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/ungcmpe273/upload";

//Define a Login Component
class UserProfilePhoto extends Component {
  handleSkip = () => {
    this.props.history.push("/school");
  };

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
        this.props.addPhoto(
          response.body.secure_url,
          localStorage.getItem("signup")
        );
        this.props.history.push("/school");
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

  render() {
    const signupStatus = getSignupToken();

    let redirectVar = null;
    if (signupStatus === false) {
      redirectVar = <Redirect to="/login" />;
    }

    return (
      <div class="container">
        {redirectVar}
        <div class="authentication-outlet nav-hidden">
          <div class="onboarding-main" role="main">
            <nav class="onboarding-main__nav full-width">
              <div class="neptune-grid">
                <a href="#" class="onboarding-main__nav-link ember-view">
                  <span class="visually-hidden">LinkedIn</span>
                </a>
              </div>
            </nav>

            <div class="onboarding-main__container">
              <div id="ember526" class="ember-view">
                <div
                  id="ember527"
                  class="onboarding-widget onboarding-photo neptune-grid ember-view"
                >
                  {" "}
                  <header
                    id="ember528"
                    class="onboarding-header mhA text-align-center pt6 ember-view"
                  >
                    {" "}
                    <h1 class="onboarding-header__title mb2">
                      Adding a photo helps people recognize you
                    </h1>
                    <h2 class="onboarding-header__subtitle" />
                  </header>
                  <section class="onboarding-photo__card mhA ph6 pv5">
                    <div class="onboarding-photo__hovercard display-flex">
                      <div class="onboarding-photo__hovercard-content absolute">
                        <div id="ember529" class="ember-view">
                          {" "}
                          <artdeco-hoverable-trigger
                            tabindex="-1"
                            id="ember537"
                            class="absolute mt3 ember-view"
                          />
                          <artdeco-hoverable-trigger
                            tabindex="0"
                            id="ember530"
                            class="absolute ember-view"
                          >
                            {" "}
                            <div
                              aria-expanded="false"
                              aria-controls="artdeco-hoverable-hovercard-content"
                              class="onboarding-input-tooltip__trigger"
                            >
                              <span name="photo-tooltip" role="button">
                                <li-icon
                                  aria-hidden="true"
                                  type="question-pebble-icon"
                                  class="onboarding-photo__hovercard-pebble-icon t-14 t-black--light t-normal "
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
                                      d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2zM12,20.2c-4.5,0-8.2-3.7-8.2-8.2S7.5,3.8,12,3.8c4.5,0,8.2,3.7,8.2,8.2S16.5,20.2,12,20.2zM11,16h2v2h-2V16zM16,9.3V10c0,1.7-1.3,2.9-3,2.9V14h-2v-1c0-1.1,0.9-2,2-2h0.3c0.5,0,0.9-0.4,0.9-0.9v-1.3c0-0.5-0.4-0.9-0.9-0.9h-2.6c-0.5,0-0.9,0.4-0.9,0.9V10H8V9.3C8,7.5,9.5,6,11.3,6h1.5C14.5,6,16,7.5,16,9.3z"
                                      class="large-icon"
                                      style={{ fill: "currentColor" }}
                                    />
                                  </svg>
                                </li-icon>
                              </span>
                            </div>
                            <div
                              id="hovercard-content"
                              class="ember-view"
                              style={{ display: "none" }}
                            >
                              <div id="ember532" class="ember-view" />
                            </div>
                          </artdeco-hoverable-trigger>
                        </div>{" "}
                      </div>
                    </div>

                    <div class="onboarding-photo__card-header">
                      <div class="onboarding-photo__card-photo-wrapper EntityPhoto-circle-8 mhA mvA">
                        <label
                          for="onboarding-photo-upload-input"
                          class="visually-hidden"
                        >
                          Profile photo
                        </label>

                        <div
                          id="ember533"
                          class="onboarding-photo__card-edit-photo profile-photo-edit ember-view"
                        >
                          {" "}
                          <div class="profile-photo-edit__camera-plus" />
                          <input
                            id="onboarding-photo-upload-input"
                            class="profile-photo-edit__file-upload-input"
                            accept="image/*"
                            type="file"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="onboarding-photo__card-body text-align-center">
                      <div class="onboarding-photo__card-information mt4">
                        <h2 class="onboarding-photo__card-headline t-16 t-black t-normal mt1">
                          --
                        </h2>
                        <h3 class="onboarding-photo__card-location t-14 t-black--light t-normal mt1 inline-block">
                          United States
                        </h3>
                      </div>

                      <div class="onboarding-photo__card-actions text-align-center mt6">
                        {/* <input
                          id="onboarding-photo__add-button-input"
                          class="onboarding-photo__add-input"
                          accept="image/*"
                          type="file"
                        /> */}
                        <Dropzone
                          className="dropzone"
                          multiple={false}
                          accept="image/*"
                          onDrop={this.onImageDrop.bind(this)}
                        >
                          <p>
                            Drop the company logo or click to select a file to
                            upload.
                          </p>
                        </Dropzone>
                        <label
                          data-control-name="choose_file"
                          for="onboarding-photo__add-button-input"
                          id="ember534"
                          class="onboarding-widget__cta onboarding-photo__add-button button-primary-large t-20 t-white t-bold full-width mv0 ember-view"
                        >
                          {" "}
                          Add photo
                        </label>
                        <button
                          onClick={this.handleSkip}
                          data-control-name="skip"
                          id="ember535"
                          class="onboarding-widget__cta onboarding-photo__skip-button button-tertiary-small-muted mt4 ember-view"
                        >
                          {" "}
                          Skip
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div id="ember536" class="ember-view" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state =>{
//     console.log(state);
//     return {
//         authFlag : state.authFlag
//     }
// }

// const mapDispatchStateToProps = dispatch => {
//     return {
//         onSubmitHandle : (data) => {
//             axios.post('http://localhost:3001/login', data)
//                 .then((response) => {
//                     console.log(response.data);
//                     dispatch({type: 'LOGIN',payload : response.data.updatedList,statusCode : response.status})
//             });
//         }
//     }
// }

// export default connect(mapStateToProps,mapDispatchStateToProps)(SignupLogin;

const mapStateToProps = state => ({
  url: state.applicantLogin.url
});

export default connect(
  mapStateToProps,
  { addPhoto }
)(UserProfilePhoto);
