import React, { Component } from "react";
import "../../css/recruiterDashboard.css";
import Chart from "react-google-charts";
import { connect } from "react-redux";
import { getRecruiterDashboardTop10 } from "../../actions/recruiterDashboardActions";
import Header from "../Header/head";
import { getJWTUsername } from "../common/auth";

class RecruiterDashboardTop10 extends Component {
  componentDidMount() {
    var username = getJWTUsername();
    this.props.getRecruiterDashboardTop10(username);
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
    var data = [
      [
        "Job",
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
    for (var index = 0; index < this.props.data_top10.length; index++) {
      var flag = false;
      var rep_month = 0;
      var rep_count = 0;
      var rep_index = 0;
      for (var jindex = 1; jindex < index; jindex++) {
        if (
          this.props.data_top10[index].jobId &&
          this.props.data_top10[index].jobId == data[jindex][0]
        ) {
          flag = true;
          rep_month = this.props.data_top10[index]._id.month;
          rep_count = this.props.data_top10[index].count;
          rep_index = jindex;
          break;
        }
      }

      var count = this.props.data_top10[index].count;
      var month = this.props.data_top10[index]._id
        ? this.props.data_top10[index]._id.month
        : 0;

      if (flag == false)
        data[index + 1] = [
          this.props.data_top10[index]._id
            ? this.props.data_top10[index].jobId
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
    console.log(data);
    // const data = [
    //   [
    //     "Job",
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December"
    //   ],
    //   ["Job1", 1000, 400, 200, 1000, 400, 200, 1000, 400, 200, 1000, 400, 200],
    //   ["Job2", 1170, 460, 250, 1170, 460, 250, 1170, 460, 250, 1170, 460, 250],
    //   ["Job3", 660, 1120, 300, 660, 1120, 300, 660, 1120, 300, 660, 1120, 300],
    //   ["Job4", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350],
    //   ["Job5", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350],
    //   ["Job6", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350],
    //   ["Job7", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350],
    //   ["Job8", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350],
    //   ["Job9", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350],
    //   ["Job10", 1030, 540, 350, 1030, 540, 350, 1030, 540, 350, 1030, 540, 350]
    // ];

    return (
      <React.Fragment>
        <Header />
        <div className="sidebar_dashboard">
          <a href="#">
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
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            width="75vw"
            height="25vw"
            options={{
              //   isStacked: true,
              title: "Applications/month for 10 Job postings",
              hAxis: { title: "Job", titleTextStyle: { color: "#333" } },
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
                title: "Applications/month for 10 Job postings",
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
                title: "Applications/month for 10 Job postings",
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
  data_top10: state.recruiterDashboard.data_top10
});

export default connect(
  mapStateToProps,
  { getRecruiterDashboardTop10 }
)(RecruiterDashboardTop10);
