import React, { Component } from "react";
import avatar from "../images/avatar.jpg";
import classNames from "classnames";
import { OrderedMap } from "immutable";
import _ from "lodash";
import SearchUser from "./searchuser";
import { ObjectId } from "bson";
import { throws } from "assert";
import moment from "moment";
import UserBar from "./userbar";

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      newMessage: "",
      searchUser: "",
      showSearchUser: false
    };

    this._onResize = this._onResize.bind(this);
    //this.addTextMessage = this.addTextMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.scrollMessagesToBottom = this.scrollMessagesToBottom.bind(this);
    this._onCreateChannel = this._onCreateChannel.bind(this);
    this.renderChannelTitle = this.renderChannelTitle.bind(this);
  }

  renderChannelTitle(channel = {}) {
    let title = "";

    if (!_.isEmpty(channel)) {
      const members = this.props.store.getMembersFromChannel(channel);

      const membersName = [];
      members.forEach(member => {
        membersName.push(
          _.get(member, "firstName") + " " + _.get(member, "lastName")
        );
      });
      if (membersName.length === 0 && _.get(channel, "isNew")) {
        title = "New message";
      } else {
        title = membersName.join();
      }
    }
    return <h2>{title}</h2>;
  }

  _onCreateChannel() {
    const channelId = new ObjectId().toString();
    const currentUser = this.props.store.getCurrentUser();
    const currentUserId = _.get(currentUser, "_id");

    const newChannel = {
      _id: channelId,
      title: "",
      lastMessage: "",
      members: new OrderedMap(),
      messages: new OrderedMap(),
      isNew: true,
      userId: currentUserId,
      created: new Date()
    };

    newChannel.members = newChannel.members.set(currentUserId, true);
    this.props.store.onCreateNewChannel(newChannel);
  }

  scrollMessagesToBottom() {
    if (this.messageRef) {
      this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
    }
  }
  _onResize() {
    this.setState({
      height: window.innerHeight
    });
  }

  renderMessage(message) {
    const text = _.get(message, "body", "");
    const html = _.split(text, "\n").map((line, key) => {
      return <p key={key} dangerouslySetInnerHTML={{ __html: line }} />;
    });
    return html;
  }

  handleSend() {
    const { newMessage } = this.state;
    if (_.trim(newMessage).length) {
      const messageId = new ObjectId().toString();
      const activatedChannel = this.props.store.getActivatedChannel();

      const channelId = _.get(activatedChannel, "_id", null);
      const currentUser = this.props.store.getCurrentUser();
      const currentUserName = _.get(currentUser, "name");
      const avatar = _.get(currentUser, "avatar");
      const message = {
        _id: messageId,
        channelId: channelId,
        body: this.state.newMessage,
        userId: _.get(currentUser, "_id"),
        me: true
      };
      this.setState({
        newMessage: ""
      });
      this.props.store.addMessage(messageId, message);
    }
  }

  componentDidUpdate() {
    this.scrollMessagesToBottom();
  }

  componentDidMount() {
    window.addEventListener("resize", this._onResize);
    //this.addTextMessage();
    if (
      this.props.store.channels.size === 0 &&
      this.props.store.messages.size === 0 &&
      !this.props.store.getCurrentUser()
    ) {
      console.log("hit here");
      this.props.store.load();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);
  }

  render() {
    const { height } = this.state;
    const activatedChannel = this.props.store.getActivatedChannel();
    const messages = this.props.store.getMessageFromChannel(activatedChannel);
    const channels = this.props.store.getChannels();
    const members = this.props.store.getMembersFromChannel(activatedChannel);

    const style = {
      height: height
    };
    return (
      <div style={style} className="app-messenger">
        <div className="header">
          <div className="left">
            {/* <button className="left-action">
              <i className="icon-edit-modify-streamline" />
            </button> */}
            <button onClick={this._onCreateChannel} className="right-action">
              <i className="icon-edit-modify-streamline" />
            </button>
            <h2>Messenger</h2>
          </div>
          <div className="content">
            {_.get(activatedChannel, "isNew") ? (
              <div className="toolbar">
                <label>To: </label>
                {members.map((member, key) => {
                  return (
                    <span
                      key={key}
                      onClick={() =>
                        this.props.store.removeMemberFromChannel(
                          member,
                          activatedChannel
                        )
                      }
                    >
                      {" "}
                      {_.get(member, "firstName") +
                        " " +
                        _.get(member, "lastName")}
                    </span>
                  );
                })}
                <input
                  placeholder=" Search people...."
                  onChange={event => {
                    const searchUserText = _.get(event, "target.value");
                    if (searchUserText === "") {
                      this.setState({
                        showSearchUser: false,
                        searchUser: searchUserText
                      });
                    } else {
                      this.setState(
                        {
                          searchUser: searchUserText,
                          showSearchUser: true
                        },
                        () => {
                          this.props.store.searchUsers(searchUserText);
                        }
                      );
                    }
                  }}
                  type="text"
                  value={this.state.searchUser}
                />
                {this.state.showSearchUser ? (
                  <SearchUser
                    onSelect={user => {
                      this.setState(
                        {
                          showSearchUser: false,
                          searchUser: ""
                        },
                        () => {
                          const channelId = _.get(activatedChannel, "_id");
                          const userId = _.get(user, "_id");
                          this.props.store.addUserToChannel(channelId, userId);
                        }
                      );
                    }}
                    search={this.state.searchUser}
                    store={this.props.store}
                  />
                ) : null}
              </div>
            ) : (
              <h2>{this.renderChannelTitle(activatedChannel)}</h2>
            )}
          </div>
          <div className="right">
            <UserBar store={this.props.store} />
          </div>
        </div>
        <div className="main">
          <div className="sidebar-left">
            <div className="channels">
              {channels !== undefined &&
                channels.map((channel, index) => {
                  return (
                    <div
                      onClick={index => {
                        this.props.store.setActivatedChannel(channel._id);
                      }}
                      key={channel._id}
                      className={classNames("channel", {
                        active:
                          _.get(activatedChannel, "_id") ===
                          _.get(channel, "_id", null)
                      })}
                    >
                      <div className="user-image">
                        <img src={avatar} alt="" />
                      </div>
                      <div className="channel-info">
                        {this.renderChannelTitle(channel)}
                        <p>{channel.lastMessage}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="content">
            <div ref={ref => (this.messagesRef = ref)} className="messages">
              {messages !== undefined &&
                messages.map((message, index) => {
                  const usrId = _.get(message, "userId");
                  const usr = this.props.store.users.get(usrId);
                  return (
                    <div
                      key={index}
                      className={classNames("message", { me: message.me })}
                    >
                      <div className="message-user-image">
                        <img src={_.get(usr, "avatar")} alt="" />
                      </div>
                      <div className="message-body">
                        <div className="message-author">
                          {message.me ? "You" : _.get(usr, "firstName")} say
                        </div>
                        <div className="message-text">
                          {this.renderMessage(message)}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {activatedChannel && members.size > 0 ? (
              <div className="messenger-input">
                <div className="text-input">
                  <textarea
                    value={this.state.newMessage}
                    placeholder="Write your message here...."
                    onKeyUp={event => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        this.handleSend();
                      }
                    }}
                    onChange={event => {
                      this.setState({
                        newMessage: _.get(event, "target.value")
                      });
                    }}
                  />
                </div>
                <div className="actions">
                  <button onClick={this.handleSend} className="send">
                    Send
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="sidebar-right">
            {members.size > 0 ? (
              <div>
                <h2 className="title">Members</h2>
                <div className="members">
                  {members !== undefined &&
                    members.map((member, index) => {
                      return (
                        <div key={index} className="member">
                          <div className="user-image">
                            <img src={_.get(member, "avatar")} alt="" />
                          </div>
                          <div className="member-info">
                            <h2>
                              {" "}
                              {_.get(member, "firstName") +
                                " " +
                                _.get(member, "lastName")}
                            </h2>
                            <p>
                              {" "}
                              Joined:{" "}
                              {member ? moment(member.created).fromNow() : null}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Messenger;
