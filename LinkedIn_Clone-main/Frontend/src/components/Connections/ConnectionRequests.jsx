import React, { Component } from "react";
import Header from "../Header/head";
import "../../css/connectionList.css";
import supportingimage4 from "../../images/supportingImage4.jpg";
import supportingimage5 from "../../images/supportingImage5.png";
import { getJWTUsername } from "../common/auth";
import {
  getAllConnections,
  acceptConnection,
  rejectConnection
} from "../../actions/connectionsActions";
import { connect } from "react-redux";
//import { If, Else } from "react-if";
import { Link } from "react-router-dom";

class ConnectionRequests extends Component {
  sendMessage = () => {
    this.props.history.push("/messaging");
  };

  accept = data => {
    var username = getJWTUsername();
    const connectionData = {
      connector: data.email,
      connectee: username
    };
    console.log(connectionData);
    this.props.acceptConnection(connectionData);
    window.location.reload();
  };

  reject = data => {
    var username = getJWTUsername();
    const connectionData = {
      connector: data.email,
      connectee: username
    };
    this.props.rejectConnection(connectionData);
    window.location.reload();
  };

  componentDidMount() {
    var username = getJWTUsername();
    this.props.getAllConnections(username);
  }

  render() {
    if (
      this.props.allConnections.connection &&
      this.props.allConnections.connection.receivedConnections.length === 0
    )
      return (
        <React.Fragment>
          <Header />
          <p className="notfound">You have no connection requests.</p>
        </React.Fragment>
      );
    else {
      return (
        <div>
          <div>
            <Header />
          </div>
          <div style={{ "padding-top": "7vw" }} />
          <div class="row">
            <div class="acceptRejectConnection">
              <div className="connectionData">
                {this.props.allConnections.connection &&
                  this.props.allConnections.connection.receivedConnections.map(
                    data => (
                      <div key={data.firstname}>
                        <div class="row">
                          <div class="col-2">
                            <img
                              src={data.photo}
                              style={{
                                width: "7vw",
                                height: "7vw",
                                "border-radius": "50%"
                              }}
                            />
                          </div>

                          <div class="col-6" style={{ paddingTop: "2vw" }}>
                            <Link
                              to={{
                                pathname: "/viewprofile",
                                state: {
                                  username: data.email
                                }
                              }}
                            >
                              <b>
                                {data ? data.firstname : ""}{" "}
                                {data ? data.lastname : ""}
                              </b>
                            </Link>
                            <br />
                            <div>
                              <p style={{ "font-size": "0.6rem" }}>
                                {data.jobTitle} | {data.companyName}
                              </p>
                              <p style={{ "font-size": "0.6rem" }}>
                                {" "}
                                Connected 5 days ago
                              </p>
                            </div>
                          </div>
                          <div
                            class="col-2"
                            style={{ float: "right", paddingTop: "2vw" }}
                          >
                            <button
                              class="message"
                              onClick={() => this.accept(data)}
                            >
                              {" "}
                              Accept
                            </button>
                          </div>
                          <div class="col-2" style={{ paddingTop: "2vw" }}>
                            <button
                              class="message"
                              onClick={() => this.reject(data)}
                            >
                              {" "}
                              Reject
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="image5">
              <img
                src={supportingimage5}
                style={{ width: "25vw", height: "30vw" }}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  allConnections: state.connections.allConnections,
  acceptConnection: state.connections.acceptConnection,
  rejectConnection: state.connections.rejectConnection
});

export default connect(
  mapStateToProps,
  {
    getAllConnections,
    acceptConnection,
    rejectConnection
  }
)(ConnectionRequests);
