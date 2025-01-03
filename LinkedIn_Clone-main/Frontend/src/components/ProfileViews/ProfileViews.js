import React, { Component } from "react";
import "../../css/recruiterDashboard.css";
import Chart from "react-google-charts";
import { connect } from "react-redux";
import { getProfileViews } from "../../actions/profileViewsAction";
import { getToken } from "../common/auth";
import { Redirect } from "react-router";

class ProfileViews extends Component {
  componentDidMount() {
    this.props.getProfileViews();
  }
  render() {
    const token = getToken();
    let redirectVar = null;
    if (token === false) {
      redirectVar = <Redirect to="/login" />;
    }

    var week_start = new Date();
    week_start.setDate(week_start.getDate() - 7);

    var allviews = {};
    var total_views = this.props.data_profileviews.length;
    var profileviews = this.props.data_profileviews;

    profileviews = profileviews.filter(v => {
      const a = new Date(v.viewDate);
      const b = new Date(week_start);
      return new Date(a.getDate()) >= new Date(b.getDate());
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    var i;
    for (i = 29; i >= 0; i--) {
      var date = new Date();
      date.setDate(date.getDate() - i);
      var datestring = monthNames[date.getMonth()] + " " + date.getDate();
      allviews[datestring] = 0;
    }

    this.props.data_profileviews.forEach(eachview => {
      var date = new Date(eachview.viewDate);
      var datestring = monthNames[date.getMonth()] + " " + date.getDate();
      allviews[datestring]++;
    });

    const data = [["Day", "views"]];

    for (const [date, numviews] of Object.entries(allviews)) {
      data.push([date, numviews]);
    }

    return (
      <React.Fragment>
        {redirectVar}
        <div className="displayviews">
          <Chart
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            width="100vw"
            height="30vw"
            options={{
              //   isStacked: true,
              title: `${total_views} profile viewers in the past 30 days`
            }}
            data={data}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data_profileviews: state.getProfileViewsReducer.data_profileviews
});

export default connect(
  mapStateToProps,
  { getProfileViews }
)(ProfileViews);
