import React, { Component } from "react";
import Header from "../Header/head";
import "../../css/connectionList.css";
import supportingimage5 from "../../images/supportingImage5.png";
import { getJobApplications } from "../../actions/jobActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class ViewJobApplications extends Component {
  state = {
    currentPage: 1,
    pageSize: 5,
    imageView: []
  };
  componentDidMount() {
    this.props.getJobApplications(this.props.location.state.jobId);
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const paginatedData = paginate(
      this.props.jobApplications ? this.props.jobApplications : "",
      this.state.currentPage,
      this.state.pageSize
    );
    console.log("data=", this.props.jobApplications);
    if (this.props.jobApplications && this.props.jobApplications.length === 0)
      return (
        <React.Fragment>
          <Header />
          <p className="notfound">There are no applications for this job</p>
        </React.Fragment>
      );

    return (
      <div>
        <div>
          <Header />
        </div>

        <div style={{ "padding-top": "7vw" }} />
        <div class="row">
          <div class="postedJobs">
            <div className="jobData">
              {paginatedData.map(data => (
                <div key={data.firstname}>
                  <div class="row">
                    <div class="col-6" style={{ paddingTop: "2vw" }}>
                      <img src={data.photo} />
                      <div className="jobDetails">
                        <Link
                          to={{
                            pathname: "/viewprofile",
                            state: {
                              username: data.emailID
                            }
                          }}
                        >
                          <h1>
                            {data.firstname}, {data.lastname}
                          </h1>
                        </Link>

                        <br />
                        <div>
                          <p style={{ "font-size": "1rem" }}>
                            Resume:{" "}
                            {data.url ? (
                              <a>{data.url}</a>
                            ) : (
                              "The applicant has not submitted any resume."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>
              ))}
            </div>
          </div>

          <div className="image5">
            <img
              src={supportingimage5}
              style={{ width: "25vw", height: "30vw" }}
            />
          </div>
        </div>
        <div className="general_pagination">
          <Pagination
            itemsCount={
              this.props.jobApplications
                ? this.props.jobApplications.length
                : ""
            }
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobApplications: state.jobReducer.jobApplications
});

export default connect(
  mapStateToProps,
  {
    getJobApplications
  }
)(ViewJobApplications);
