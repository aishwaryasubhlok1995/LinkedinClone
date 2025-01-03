import React, { Component } from "react";
import Chart from "react-google-charts";
import "../../css/recruiterDashboard.css";
import Header from "../Header/head";
import {
  getRecruiterJobs,
  getRecruiterDashboardCity
} from "../../actions/recruiterDashboardActions";
import { connect } from "react-redux";
import { getJWTUsername } from "../common/auth";

class RecruiterDashboardCityWise extends Component {
  componentDidMount() {
    var username = getJWTUsername();
    this.props.getRecruiterJobs(username);
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
    this.props.getRecruiterDashboardCity(jobId);

    var x = document.getElementById("displayChartsCity");
    x.style.display = "block";
  };

  render() {
    let jobs = this.props.recruiter_jobs;
    let optionItems = null;
    if (jobs !== "Could not fetch job details.") {
      optionItems =
        jobs && jobs.map(job => <option key={job._id}>{job._id}</option>);
    }

    var data = [
      [
        "City",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    ];
    for (var index = 0; index < this.props.data_city.length; index++) {
      var flag = false;
      var rep_month = 0;
      var rep_count = 0;
      var rep_index = 0;
      for (var jindex = 1; jindex < index; jindex++) {
        if (
          this.props.data_city[index]._id &&
          this.props.data_city[index]._id.city == data[jindex][0]
        ) {
          flag = true;
          rep_month = this.props.data_city[index]._id.month;
          rep_count = this.props.data_city[index].count;
          rep_index = jindex;
          break;
        }
      }

      var count = this.props.data_city[index].count;
      var month = this.props.data_city[index]._id
        ? this.props.data_city[index]._id.month
        : 0;

      if (flag == false)
        data[index + 1] = [
          this.props.data_city[index]._id
            ? this.props.data_city[index]._id.city
            : "",
          month == 1 ? count : 0,
          month == 2 ? count : 0,
          month == 3 ? count : 0,
          month == 4 ? count : 0,
          month == 5 ? count : 0,
          month == 6 ? count : 0,
          month == 7 ? count : 0,
          month == 8 ? count : 0,
          month == 9 ? count : 0,
          month == 10 ? count : 0,
          month == 11 ? count : 0,
          month == 12 ? count : 0
        ];
      else {
        data[rep_index][rep_month] = rep_count;
      }
    }

    return (
      <React.Fragment>
        <Header />
        <div className="sidebar_dashboard">
          <a href="#" onClick={this.handleFilter1}>
            Top 10 job postings
          </a>
          <br /> <br /> <br />
          <a href="#">
            <span className="active_link">
              City-wise applications for a job posting
            </span>
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
          <a href="#" onClick={this.handleFilter6}>
            Trace Job
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

        <div className="displayChartsCity" id="displayChartsCity">
          {" "}
          <Chart
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            width="75vw"
            height="30vw"
            options={{
              //   isStacked: true,
              title: "City wise Applications/month for a job",
              hAxis: { title: "City", titleTextStyle: { color: "#333" } },
              vAxis: {
                title: "Number of Applications",
                titleTextStyle: { color: "#333" }
              }
              // legend: { position: "top", maxLines: 3 }
              //   chartArea: { width: "50%", height: "70%" }
            }}
            data={data}
          />
          <br />
          <br />
          <br />
          <br />
          <Chart
            chartType="Bar"
            width="75vw"
            height="30vw"
            data={data}
            loader={<div>Loading Chart</div>}
            options={{
              chart: {
                title: "City wise Applications/month for a job",
                subtitle: "For the year 2018"
              }
            }}
          />
          <br />
          <br />
          <br />
          <br />
          <Chart
            chartType="Line"
            width="75vw"
            height="30vw"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              chart: {
                title: "City wise Applications/month for a job",
                subtitle: "For the year 2018"
              }
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  recruiter_jobs: state.recruiterDashboard.recruiter_jobs,
  data_city: state.recruiterDashboard.data_city
});

export default connect(
  mapStateToProps,
  { getRecruiterJobs, getRecruiterDashboardCity }
)(RecruiterDashboardCityWise);
