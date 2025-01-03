import React, { Component } from "react";
import _ from "lodash";
import avatar from "../images/avatar.jpg";
import UserForm from "./userform";

class UserBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    const me = store.getCurrentUser();
    const profileImg = _.get(me, "avatar");
    const name = _.get(me, "firstName") + " " + _.get(me, "lastName");
    return (
      <div className="user-bar">
        {!me ? (
          <button type="button" className="login-btn">
            Sign in
          </button>
        ) : null}
        <div className="profile-name">{name}</div>
        <div className="profile-image">
          <img src={profileImg ? profileImg : avatar} alt="My Image" />
        </div>
        {/* <UserForm /> */}
      </div>
    );
  }
}

export default UserBar;
