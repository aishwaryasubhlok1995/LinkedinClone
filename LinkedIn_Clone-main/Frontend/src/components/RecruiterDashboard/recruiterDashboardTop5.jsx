import React, { Component } from "react";
import "../../css/recruiterDashboard.css";
import Chart from "react-google-charts";
import Header from "../Header/head";
import { connect } from "react-redux";
import { getRecruiterDashboardTop5 } from "../../actions/recruiterDashboardActions";
import { getJWTUsername } from "../common/auth";

class RecruiterDashboardTop5 extends Component {
  componentDidMount() {
    var username = getJWTUsername();
    this.props.getRecruiterDashboardTop5(username);
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
    console.log("props=", this.props.data_top5);
    var data = [["Job", "Number of Applications"]];
    for (var index = 0; index < this.props.data_top5.length; index++) {
      data[index + 1] = [
        this.props.data_top5[index]._id
          ? this.props.data_top5[index]._id.jobId
          : "",
        this.props.data_top5[index].count
      ];
    }

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
          <a href="#">
            <span className="active_link">
              Top 5 job postings with least number of applications
            </span>
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
        </div>
        <div className="displayCharts">
          <Chart
            width={"75vw"}
            height={"30vw"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              title: "Top 5 Jobs with least number of Applications",
              is3D: true
            }}
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
                title: "Top 5 Jobs with least number of Applications",
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
                title: "Top 5 Jobs with least number of Applications",
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
  data_top5: state.recruiterDashboard.data_top5
});

export default connect(
  mapStateToProps,
  { getRecruiterDashboardTop5 }
)(RecruiterDashboardTop5);
