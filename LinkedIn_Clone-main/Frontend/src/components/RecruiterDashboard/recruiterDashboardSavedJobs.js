import React, { Component } from "react";
import "../../css/recruiterDashboard.css";
import Chart from "react-google-charts";
import { connect } from "react-redux";
import { getRecruiterSavedJobs } from "../../actions/recruiterDashboardActions";
import Header from "../Header/head";
import { getJWTUsername } from "../common/auth";

class recruiterDashboardJobSaves extends Component {
  componentDidMount() {
    var username = getJWTUsername();
    this.props.getRecruiterSavedJobs(username);
  }
  handleFilter1 = () => {
    this.props.history.push("/recruiterdashboardtop10");
  };
  handleFilter2 = () => {
    this.props.history.push("/recruiterdashboardcitywise");
  };
  handleFilter3 = () => {
    this.props.history.push("/recruiterdashboardtop5");
  };
  handleFilter4 = () => {
    this.props.history.push("/recruiterdashboardjobclicks");
  };
  handleFilter5 = () => {
    this.props.history.push("/recruiterdashboardjobsaves");
  };
  handleFilter6 = () => {
    this.props.history.push("/recruiterdashboardtrace");
  };

  render() {
    console.log("PROPS: ", this.props.data_jobsaves);

    const data = [["Job Posting", "Saves"]];

    this.props.data_jobsaves &&
      Object.keys(this.props.data_jobsaves).forEach(key => {
        data.push([key, this.props.data_jobsaves[key]]);
      });

    console.log("DATA", data);

    return (
      <React.Fragment>
        <Header />
        <div className="sidebar_dashboard">
          <a href="#" onClick={this.handleFilter1}>
            Top 10 job postings
          </a>
          <br /> <br /> <br />
          <a href="#" onClick={this.handleFilter2}>
            City-wise applications for a job posting
          </a>
          <br /> <br /> <br />
          <a href="#" onClick={this.handleFilter3}>
            Top 5 job postings with least number of applications
          </a>
          <br /> <br /> <br />
          <a href="#" onClick={this.handleFilter4}>
            Number of clicks per job posting
          </a>
          <br /> <br /> <br />
          <a href="#">
            <span className="active_link">Number of Saved Jobs</span>
          </a>
          <br /> <br /> <br />
          <a href="#" onClick={this.handleFilter6}>
            Trace Job
          </a>
        </div>
        <div className="displayCharts">
          <Chart
            width={"75vw"}
            height={"30vw"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              title: "Total number of people who have saved your jobs",
              is3D: true
            }}
          />
          <br />
          <br />
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data_jobsaves: state.recruiterDashboard.data_jobsaves
});

export default connect(
  mapStateToProps,
  { getRecruiterSavedJobs }
)(recruiterDashboardJobSaves);
