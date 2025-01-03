import React, { Component } from "react";
import supportingImage3 from "../../images/supportingImage3.jpg";
import supportingImage4 from "../../images/supportingImage4.jpg";
import supportingImage1 from "../../images/supportingImage1.png";
import homepagebckg from "../../images/homepagebckg.png";
import Modal from "react-responsive-modal";
import supportingImage2 from "../../images/supportingImage2.png";
import "../../css/jobDetails.css";
import { getToken } from "../common/auth";
import { Redirect } from "react-router";
import { searchJob, saveJob, applyJob } from "../../actions/jobActions";
import { connect } from "react-redux";
import Home from "../Header/head";
class JobDetails extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      open: false,
      properties1: []
    };
    this.apply = this.apply.bind(this);
    this.closebox = this.closebox.bind(this);
  }
  componentDidMount() {
    const foo = this.props.location.state
      ? this.props.location.state.job_id
      : "";
    console.log("Foo", this.props.search_job_results);
    var properties1 = this.props.search_job_results;
    console.log(properties1);
    var propertydetails = properties1.filter(function(property) {
      return property._id == foo;
    });
    this.setState({
      properties1: this.state.properties1.concat(propertydetails)
    });
  }
  apply= e =>{
        console.log(e._id);
      this.props.history.push(`/job-apply${e._id}`)
  }
  closebox() {
    this.setState({
      open: false
    });
  }
  render() {
    const token = getToken();

    let redirectVar = null;
    if (token === false) {
      redirectVar = <Redirect to="/login" />;
    }

    let Details1 = this.state.properties1.map(property => {
      return (
        <div
          style={{ position: "relative", left: "0", top: "0.8vw" }}
          class="detail"
        >
          {redirectVar}
          <img
            src={homepagebckg}
            style={{ width: "100%", height: "250px" }}
            class="image1"
          />
          <div
            class="col-5"
            style={{ float: "right", "padding-left": "100px" }}
          >
            <img
              src={supportingImage1}
              style={{ width: "400px", height: "500px" }}
            />
          </div>
          <div class="over">
            <div>
              <div class="row">
                <div class="col-4">
                  <img
                    src={property.logo}
                    style={{ width: "200px", height: "200px" }}
                    class="image2"
                  />
                </div>

                <div
                  className="col-8 "
                  style={{ "padding-left": "20px", "padding-top": "10px" }}
                >
                  <li class="blue">{property.title}</li>
                  <br />
                  {property.company}
                  <br />
                  {property.location}
                  <br />
                  <button class="Button" onClick={this.Search}>
                    Save
                  </button>
                  <button class="Button" onClick={this.apply.bind(this, property)}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="over1">
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

         
           
          </div>
        </div>
      );
    });

    return <div>
      <div>
        <Home></Home>
      </div>
    {Details1}</div>;
  }
}
const mapStateToProps = state => ({
  search_job_results: state.jobReducer.search_job_results,
  view: state.jobReducer.view
});

export default connect(
  mapStateToProps,
  { searchJob, saveJob, applyJob }
)(JobDetails);
