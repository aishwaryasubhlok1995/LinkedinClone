import React, { Component } from "react";
import "../../css/recruiterDashboard.css";
import Chart from "react-google-charts";
import { connect } from "react-redux";
import {
  getJobTrace,
  getRecruiterJobs
} from "../../actions/recruiterDashboardActions";
import Header from "../Header/head";
import { getJWTUsername } from "../common/auth";
import * as cities from "./cities.json";
// const word = cities[0][0].city;
// console.log("WRD", word);

var found = cities.find(function(element) {
  return (element["city"] = "Fremont");
});

console.log("WRD", found);
class recruiterDashboardJobTrace extends Component {
  componentDidMount() {
    var username = getJWTUsername();
    this.props.getRecruiterJobs(username);
    // this.props.getJobTrace(username);
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

  handleSelectJob = () => {
    var job_select = document.getElementById("dashboard_select");
    var jobId = job_select.options[job_select.selectedIndex]
      ? job_select.options[job_select.selectedIndex].value
      : "";
    this.props.getJobTrace(jobId);

    // var x = document.getElementById("displayChartsCity");
    // x.style.display = "block";
  };

  render() {
    let jobs = this.props.recruiter_jobs;
    console.log(this.props.recruiter_jobs);
    let optionItems = null;
    if (jobs !== "Could not fetch job details.") {
      optionItems =
        jobs && jobs.map(job => <option key={job._id}>{job._id}</option>);
    }
    console.log("PROPS: ", this.props.data_tracejob);

    // const data = [["Job Posting", "Clicks"]];
    var dict = {};
    const data = [
      [
        "State",
        "Saving",
        // ,
        // "Doing Nothing",
        "Applying"
      ]
      // ["Florida", 200]
      // ["United States", 300],
      // ["Brazil", 400],
      // ["Canada", 500],
      // ["France", 600],
      // ["RU", 700]
    ];

    this.props.data_tracejob &&
      this.props.data_tracejob.forEach(app => {
        if (app.state != undefined)
          dict[app.state] = {
            saved: (app.submitted = "no" && app.savedTime) ? 1 : 0,
            applying: (app.submitted = "yes" && app.submittedTime) ? 1 : 0
            // doingnothing: (app.submitted = "no" && !app.savedTime) ? 1 : 0
          };
      });

    Object.keys(dict).forEach(key => {
      data.push([
        key,
        dict[key].saved,
        // dict[key].doingnothing,
        dict[key].applying
      ]);
    });

    console.log("DICT", data);

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
          <a href="#" onClick={this.handleFilter5}>
            Number of Saved Jobs
          </a>
          <br /> <br /> <br />
          <a href="#">
            <span className="active_link">Trace Job</span>
          </a>
          <br /> <br /> <br />
          <select id="dashboard_select">{optionItems}</select>{" "}
          <a
            href="#"
            onClick={this.handleSelectJob}
            className="dashboard_submit"
          >
            Submit
          </a>
        </div>

        <div className="displayCharts">
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  // const region = data[selection[0].row + 1];
                }
              }
            ]}
            options={{
              region: "US",
              resolution: "provinces"
            }}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={data}
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
  data_tracejob: state.recruiterDashboard.data_tracejob,
  recruiter_jobs: state.recruiterDashboard.recruiter_jobs
});

export default connect(
  mapStateToProps,
  { getJobTrace, getRecruiterJobs }
)(recruiterDashboardJobTrace);
