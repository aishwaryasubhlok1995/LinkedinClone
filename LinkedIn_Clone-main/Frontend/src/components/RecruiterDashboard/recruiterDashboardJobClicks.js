import React, { Component } from "react";
import "../../css/recruiterDashboard.css";
import Chart from "react-google-charts";
import { connect } from "react-redux";
import { getClicksPerJob } from "../../actions/recruiterDashboardActions";
import Header from "../Header/head";
import { getJWTUsername } from "../common/auth";

class recruiterDashboardJobClicks extends Component {
  componentDidMount() {
    var username = getJWTUsername();
    this.props.getClicksPerJob(username);
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
    console.log("PROPS: ", this.props.data_jobclicks);

    const data = [["Job Posting", "Clicks"]];

    this.props.data_jobclicks &&
      this.props.data_jobclicks.forEach(job => {
        data.push([job.title + " at " + job.company, parseInt(job.clicks)]);
      });

    console.log("DATA", data);

    return (
      <React.Fragment>
        <Header />
        <div className="sidebar_dashboard">
          <a href="#" onClick={this.handleFilter1}>
            <span className="active_link">Top 10 job postings</span>
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
          <a href="#">
            <span className="active_link">
              Number of clicks per job posting
            </span>
          </a>
          <br /> <br /> <br />
          <a href="#" onClick={this.handleFilter5}>
            Number of Saved Jobs
          </a>
          <br /> <br /> <br />
          <a href="#" onClick={this.handleFilter6}>
            Trace Job
          </a>
        </div>
        <div className="displayCharts">
          <Chart
            height="30vw"
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              title: "Clicks per Job Posting",
              chartArea: { width: "50%" },
              hAxis: {
                title: "Number of Clicks",
                minValue: 0
              },
              vAxis: {
                title: "Job Posting"
              }
            }}
            // For tests
            rootProps={{ "data-testid": "1" }}
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
  data_jobclicks: state.recruiterDashboard.data_jobclicks
});

export default connect(
  mapStateToProps,
  { getClicksPerJob }
)(recruiterDashboardJobClicks);
