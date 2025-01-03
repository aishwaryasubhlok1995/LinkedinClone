import React, { Component } from "react";
import Header from "../Header/head";
import "../../css/connectionList.css";
import supportingimage4 from "../../images/supportingImage4.jpg";
import supportingimage5 from "../../images/supportingImage5.png";
import { getJWTUsername } from "../common/auth";
import { getAllConnections } from "../../actions/connectionsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class network extends Component {
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
      this.props.allConnections.connection.acceptedConnections.length === 0
    )
      return (
        <React.Fragment>
          <Header />
          <p className="notfound">You don't have any connections yet.</p>
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
            <div class="connection">
              <div className="connectionData">
                {this.props.allConnections.connection &&
                  this.props.allConnections.connection.acceptedConnections.map(
                    data => (
                      <div key={data ? data.firstname : ""}>
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
                                {data ? data.jobTitle : ""} |{" "}
                                {data ? data.companyName : ""}
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
                            <button class="message" onClick={this.sendMessage}>
                              {" "}
                              Message
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
  allConnections: state.connections.allConnections
});

export default connect(
  mapStateToProps,
  {
    getAllConnections
  }
)(network);
