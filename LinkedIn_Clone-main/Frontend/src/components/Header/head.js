import React, { Component } from "react";
import supportingImage4 from "../../images/supportingImage4.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/jobSearch.css";
import { getJWTUsername } from "../common/auth";
class Header extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {};
    this.clear = this.clear.bind(this);
  }
  clear() {
    localStorage.clear();
    this.props.history.push("/login");
  }
  delete() {
    const data = {
      username: getJWTUsername()
    };
    console.log(data);
    axios.post("http://localhost:3001/delete", data).then(response => {
      alert(
        "Sorry to see you going u can active ur account by again logging in :)"
      );

      window.location.href = "http://localhost:3000/login";
      localStorage.clear();
    });
  }
  render() {
    return (
      <div class="menu">
        <div class="extendmenu row">
          <div class="icon">
            <Link to="/login">
              <a>
                {" "}
                <i class="fa fa-linkedin-square" />
              </a>
            </Link>
          </div>

          <div class="searchhead">
            <div class="row">
              <input
                style={{ "background-color": "#e1e9ee" }}
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          <div class="row" style={{ paddingLeft: "5vw",  }}>
            <div class="col-2">
              <div class="go-inline">
                <div className="home">
                  <a href="/home">
                    <i class="fa fa-home w3-jumbo" />
                  </a>
                </div>
                <div class="go-middle">
                  <a href="/home">
                    <span class="normal">Home</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-2.75">
              <div class="go-inline">
                <div>
                  <a href="/network">
                    <i
                      class="fa fa-user w3-jumbo"
                      style={{ "padding-left": "20%", marginRight: "0" }}
                    />
                  </a>
                </div>
                <div class="go-middle">
                  <li
                    class="blue"
                    class="nav-item dropdown"
                    style={{ opacity: "unset"}}
                  >
                    <a
                      class="nav-link dropdown-toggle normal blue"
                      id="navbardrop"
                      data-toggle="dropdown"
                      style={{ padding:".1rem 1rem" }}
                    >
                      <span class="normal">Network</span>
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="/network">
                        My Network
                      </a>
                      <a class="dropdown-item" href="/myrequests">
                        My Requests
                      </a>
                      <a class="dropdown-item" href="/user/search">
                        Search User
                      </a>
                    </div>
                  </li>
                </div>
              </div>
            </div>
            <div class="col-2.5" style={{ paddingLeft: "0.5vw" }}>
              <div class="go-inline">
                <div>
                  <a href="/job/new">
                    <i
                      class="fa fa-briefcase w3-jumbo"
                      style={{ "padding-left": "0.5vw" }}
                    />
                  </a>
                </div>
                <div class="go-middle">
                  <li
                    class="blue"
                    class="nav-item dropdown"
                    style={{ opacity: "unset", padding: 0, height: 0 }}
                  >
                    <a
                      class=" dropdown-toggle"
                      id="navbardrop"
                      data-toggle="dropdown"
                    >
                      <span class="normal">My Jobs</span>{" "}
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="/job/new">
                        Post Job
                      </a>
                      <a class="dropdown-item" href="/job/posted-jobs">
                        View Posted Jobs
                      </a>
                      <a class="dropdown-item" href="/recruiterdashboardtop10">
                        My Dashboard
                      </a>
                      <a class="dropdown-item" href="/job-saved">
                        Saved Jobs
                      </a>
                      <a class="dropdown-item" href="/job-applied">
                        Applied Jobs
                      </a>
                      <a class="dropdown-item" href="/job-search">
                        Search A Job
                      </a>
                    </div>
                  </li>
                </div>
              </div>
            </div>
            <div class="col-2.5">
              <div class="go-inline">
                <div>
                  <a href="/home">
                    <i
                      class="fa fa-bell-o w3-jumbo"
                      style={{
                        alignContent: "center",
                        "padding-left": "1.5vw"
                      }}
                    />
                  </a>
                </div>
                <div class="go-middle">
                  <a href="/home">
                    <span class="normal" style={{ alignContent: "center" }}>
                      Notifications
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-2.5">
              <div class="go-inline">
                <div>
                  <a href="/messaging">
                    <i
                      class="fa fa-envelope w3-jumbo"
                      style={{
                        alignContent: "center",
                        "padding-left": "1.5vw"
                      }}
                    />
                  </a>
                </div>
                <div class="go-middle">
                  <a href="/messaging">
                    <span class="normal">Messaging</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="go-middle">
              <li
                class="blue"
                class="nav-item dropdown"
                style={{ opacity: "unset", padding: "1.5vw",fontSize:"1rem" }}
              >
                <a
                  class=" dropdown-toggle"
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  <span class="normal" />
                  Logout{" "}
                </a>
                <div class="dropdown-menu">
                  <li>
                    {" "}
                    <a class="dropdown-item" href="/login" onClick={this.clear}>
                      Logout
                    </a>
                  </li>
                  <a class="dropdown-item" onClick={this.delete}>
                    Delete Your Account
                  </a>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
