import React, { Component } from "react";
import _ from "lodash";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
  }

  onTextFieldChange(event) {}
  render() {
    return (
      <div className="user-form">
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-item">
            <label>Email</label>
            <input
              onChange={this.onTextFieldChange}
              type="email"
              placeholder="Email address...."
              name="email"
            />
          </div>
          <div className="form-item">
            <label>Password</label>
            <input
              onChange={this.onTextFieldChange}
              type="password"
              placeholder="password...."
              name="password"
            />
          </div>
          <div className="form-actions">
            <button type="button">Create an account?</button>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserForm;
