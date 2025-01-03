import React, { Component } from "react";
import Header from "../Header/head";
import "../../css/notFound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="notFoundbody">
        <Header />
        <p className="notfound">The page you have requested does not exist.</p>
      </div>
    );
  }
}

export default NotFound;
