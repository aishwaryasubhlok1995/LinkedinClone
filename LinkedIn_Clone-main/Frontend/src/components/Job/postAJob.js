import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Header from "../Header/head";
import { postAJob } from "../../actions/jobActions";
import { getJWTUsername } from "../common/auth";
import "../../css/postAJob.css";

import request from "superagent";
import Dropzone from "react-dropzone";

const CLOUDINARY_UPLOAD_PRESET = "g4q2o6at";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/ungcmpe273/upload";

class PostAJob extends Component {
  state = { companyLogo: "" };

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

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;

    let className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  renderTextArea(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <textarea
          className="form-control"
          rows="5"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    const username = getJWTUsername();

    values.postedDateTime = new Date();
    values.postedBy = username;
    values.logo = this.state.companyLogo;
    console.log(values);

    if (values.employmentType == null) values.employmentType = "Full-time";

    this.props.postAJob(values);
    window.location.reload();
    window.alert("Job posted successfully!");
  }

  render() {
    const { handleSubmit } = this.props;
    const username = getJWTUsername();

    const { newJob } = this.props;

    return (
      <React.Fragment>
        <Header />

        <hr />
        <div>
          <div className="job">
            <div className="jobphoto">
              <Dropzone
                className="dropzone"
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}
              >
                <p>
                  Drop the company logo or click to select a file to upload.
                </p>
              </Dropzone>
            </div>
          </div>
          <div className="job_body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="job_information">
                <h3>Job Information</h3>
                <Field
                  name="title"
                  component={this.renderField}
                  autoFocus
                  label="Title"
                />
                <Field
                  name="description"
                  component={this.renderTextArea}
                  label="Description"
                />
                <Field
                  name="industry"
                  component={this.renderField}
                  label="Industry"
                />
                <Field
                  name="location"
                  component={this.renderField}
                  label="Location"
                />
                <Field
                  name="jobFunction"
                  component={this.renderField}
                  label="Function"
                />
                <Field
                  name="company"
                  component={this.renderField}
                  label="Company"
                />
                <label>Type of Employment:</label>
                <Field
                  name="employmentType"
                  component="select"
                  className="form-control"
                >
                  <option />
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Fixed Term">Fixed Term</option>
                  <option value="Casual">Casual</option>
                  <option value="Shiftworkers">Shiftworkers</option>
                </Field>
                <button type="submit" className="btn btn-primary save">
                  Save changes
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Job Title cannot be empty";
  } else if (values.title.length > 30) {
    errors.title = "Job Title cannot be more than 30 characters long";
  } else if (!/^[a-zA-Z0-9\s]*$/.test(values.title)) {
    errors.title = "Incorrect Job Title format";
  }

  if (!values.description) {
    errors.description = "Job Description cannot be empty";
  } else if (values.description.length > 500) {
    errors.description = "Last Name cannot be more than 500 characters long";
  }

  if (!values.industry) {
    errors.industry = "Job Industry cannot be empty";
  } else if (values.industry.length > 30) {
    errors.industry = "Job Industry cannot be more than 30 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.industry)) {
    errors.industry = "Job Industry can contain only alphabets";
  }

  if (!values.location) {
    errors.location = "Job Location cannot be empty";
  } else if (values.location.length > 30) {
    errors.location = "Job Location cannot be more than 30 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.location)) {
    errors.location = "Job Location can contain only alphabets";
  }

  if (!values.jobFunction) {
    errors.jobFunction = "Job Function cannot be empty";
  } else if (values.jobFunction.length > 30) {
    errors.jobFunction = "Job Function cannot be more than 30 characters long";
  } else if (!/^[a-zA-Z\s]*$/.test(values.jobFunction)) {
    errors.jobFunction = "Job Function can contain only alphabets";
  }

  if (!values.company) {
    errors.company = "Company cannot be empty";
  } else if (values.company.length > 30) {
    errors.company = "Company cannot be more than 30 characters long";
  }

  return errors;
}

const mapStateToProps = state => ({
  newJob: state.jobReducer.newJob
});

export default reduxForm({
  validate,
  form: "jobForm"
})(
  connect(
    mapStateToProps,
    { postAJob }
  )(PostAJob)
);
