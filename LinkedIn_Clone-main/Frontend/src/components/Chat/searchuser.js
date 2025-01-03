import React, { Component } from "react";
import _ from "lodash";

export default class SearchUser extends Component {
  constructor(props) {
    super(props);
    this._onUserClick = this._onUserClick.bind(this);
  }

  _onUserClick(user) {
    if (this.props.onSelect) {
      this.props.onSelect(user);
    }
  }

  render() {
    const { search } = this.props;
    const users = this.props.store.getSearchUsers(search);

    return (
      <div className="search-user">
        <div className="user-list">
          {users.map((user, key) => {
            return (
              <div
                onClick={() => this._onUserClick(user)}
                key={key}
                className="user"
              >
                <img src={user.avatar} alt="..." />
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
