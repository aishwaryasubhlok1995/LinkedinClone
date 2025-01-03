import { OrderedMap } from "immutable";
import _ from "lodash";
import Service from "./service";
var auth = require("./components/common/auth");

export default class Store {
  constructor(appComponent) {
    this.app = appComponent;
    this.messages = new OrderedMap();
    this.channels = new OrderedMap();
    this.activatedChannelId = null;
    this.service = new Service();

    this.user = null;
    this.users = new OrderedMap();
    //this.users = this.users.set(this.user._id, this.user);
    this.search = {
      users: new OrderedMap()
    };
  }

  async loadCurrentUser(userId) {
    return await this.service.get("api/auth/user/findBy/" + userId);
  }

  async loadUser(userId) {
    return await this.service.get("api/auth/user/" + userId);
  }
  async loadChannels() {
    return await this.service.get(
      "api/auth/channel/" + _.get(this.user, "_id")
    );
  }

  async loadMessages(channelId) {
    return await this.service.get("api/auth/message/" + channelId);
  }

  async load() {
    //getting all channels
    try {
      //load current user
      if (!this.user) {
        const email = auth.getJWTUsername(localStorage.getItem("username"));
        const userResponse = await this.loadCurrentUser(email);
        this.user = _.get(userResponse, "data.user");
        this.user.isMe = true;
        this.users = this.users.set(_.get(this.user, "_id"), this.user);
        this.update();
      }

      const response = await this.loadChannels();
      const channelList = _.get(response.data, "channels");
      channelList.forEach(async channel => {
        if (!this.activatedChannelId) this.activatedChannelId = channel._id;
        //loat all message from each channel
        const channelId = _.get(channel, "_id");
        var newChannel = {
          _id: channelId,

          //title: "",
          lastMessage: "still testing",
          members: new OrderedMap(),
          messages: new OrderedMap(),
          isNew: false,
          userId: _.get(this.user, "_id"),
          created: _.get(channel, "created")
        };
        //iterate through all members
        _.get(channel, "members", []).forEach(async memberId => {
          newChannel.members = newChannel.members.set(memberId, true);
          //load each member into memory
          const userResponse = await this.loadUser(memberId);
          this.users = this.users.set(
            memberId,
            _.get(userResponse, "data.user")
          );
          this.users = this.users.set(_.get(this.user, "_id"), this.user);
          const eachMemberResponse = await this.loadUser(memberId);
          const eachMember = _.get(eachMemberResponse, "data.user");
          this.update();
          this.users = this.users.set(memberId, eachMember);
        });

        const responsLoadMessage = await this.loadMessages(channelId);
        const messageList = _.get(responsLoadMessage, "data.messages");
        //set up message first
        messageList.forEach(message => {
          var newMessage = {
            _id: _.get(message, "_id"),
            channelId: _.get(message, "channelId"),
            body: _.get(message, "body"),
            userId: _.get(message, "userId"),
            me:
              _.get(message, "userId") === _.get(this.user, "_id")
                ? true
                : false
          };
          this.messages = this.messages.set(_.get(message, "_id"), newMessage);
          this.update();
          newChannel.messages = newChannel.messages.set(
            _.get(message, "_id"),
            true
          );
        });
        console.log("afdnajs", messageList[messageList.length - 1]);
        newChannel.lastMessage =
          messageList.length > 0
            ? messageList[messageList.length - 1].body
            : "";
        this.channels = this.channels.set(channelId, newChannel);
        this.update();
      });
    } catch (err) {
      console.log(err);
    }
  }

  getSearchUsers() {
    return this.search.users.valueSeq();
  }

  searchUsers(keyword = "") {
    // query to backend servr and get list of users.
    const data = { search: keyword };

    this.search.users = this.search.users.clear();

    this.service
      .post("api/auth/user/search", data)
      .then(response => {
        // list of users matched.
        const users = _.get(response.data, "userList", []);
        _.each(users, user => {
          // cache to this.users
          // add user to this.search.users
          const userId = `${user._id}`;

          this.users = this.users.set(userId, user);
          if (_.get(user, "_id") !== _.get(this.user, "_id"))
            this.search.users = this.search.users.set(userId, user);
        });

        // update component
        this.update();
      })
      .catch(err => {
        console.log("searching errror", err);
      });
  }

  addUserToChannel(channelId, userId) {
    const channel = this.channels.get(channelId);
    if (channel) {
      channel.members = channel.members.set(userId, this.users.get(userId));

      this.channels = this.channels.set(channelId, channel);
      this.update();
    }
  }

  getCurrentUser() {
    return this.user;
  }

  getMembersFromChannel(channel) {
    let members = new OrderedMap();
    if (channel) {
      channel.members.forEach((value, key) => {
        const user = this.users.get(`${key}`);
        if (_.get(this.user, "_id") !== _.get(user, "_id"))
          members = members.set(key, user);
      });
    }
    return members.valueSeq();
  }

  removeMemberFromChannel(member, channel) {
    if (channel && member) {
      channel.members = channel.members.remove(_.get(member, "_id"));
      this.channels = this.channels.set(_.get(channel, "_id"), channel);
    }
    this.update();
  }

  getActivatedChannel() {
    const channel = this.activatedChannelId
      ? this.channels.get(this.activatedChannelId)
      : this.channels.first();
    return channel;
  }

  setActivatedChannel(channelId) {
    this.activatedChannelId = channelId;
    this.update();
  }

  async addMessage(index, message = {}) {
    const channelId = _.get(message, "channelId");
    let isNewChannel = false;
    if (channelId) {
      //checking if channel isNew.
      let channel = this.channels.get(channelId);
      isNewChannel = channel.isNew;

      if (isNewChannel) {
        this.channels.forEach(chl => {
          if (chl._id !== channelId) {
            if (
              channel.members
                .keySeq()
                .toJS()
                .sort()
                .toString() ===
              chl.members
                .keySeq()
                .toJS()
                .sort()
                .toString()
            ) {
              this.activatedChannelId = chl._id;
              isNewChannel = false;
              this.channels = this.channels.remove(channelId);
            }
          }
        });
      }
      channel = this.channels.get(this.activatedChannelId);
      const user = this.getCurrentUser();
      message.user = user;
      message.channelId = channel._id;
      this.messages = this.messages.set(index, message);
      channel.messages = channel.messages.set(index, true);

      channel.isNew = false;
      channel.lastMessage = _.get(message, "body");
      channel.created = new Date();
      this.channels = this.channels.set(this.activatedChannelId, channel);
      this.update();

      //save channel
      try {
        if (isNewChannel) {
          //Save channel to DB
          //let responseChannel =
          await this.saveChanelToDb(channel);
        }

        //let responseMessage =
        await this.saveMessageToDB(message);
      } catch (err) {
        this.channels = this.channels.remove(channelId);
        this.messages = this.messages.remove(_.get(message, "_id"));
      }
    }
  }
  async saveChanelToDb(channel) {
    let memberIds = [];
    channel.members.forEach((value, key) => memberIds.push(`${key}`));
    return await this.service.post("api/auth/channel", {
      members: memberIds,
      _id: channel._id
    });
  }

  async saveMessageToDB(message) {
    return await this.service.post("api/auth/message", {
      _id: message._id,
      channelId: message.channelId,
      body: message.body,
      userId: message.userId
    });
  }

  getMessages() {
    return this.messages.valueSeq();
  }

  getMessageFromChannel(channel) {
    let messages = new OrderedMap();
    if (channel) {
      channel.messages.forEach((value, key) => {
        const message = this.messages.get(key);
        messages = messages.set(key, message);
      });
    }
    return messages.valueSeq();
  }

  addChannel(index, channel = {}) {
    this.channels = this.channels.set(`${index}`, channel);
    console.log("dfsfasf", channel.created);
    this.update();
  }

  getChannels() {
    this.channels = this.channels.sort((a, b) => {
      var dateA = new Date(a.created);
      var dateB = new Date(b.created);
      if (dateA > dateB) return -1;
      else if (dateA < dateB) return 1;
      else return 0;
    });
    //this.update();
    return this.channels.valueSeq();
  }

  onCreateNewChannel(channel = {}) {
    this.addChannel(_.get(channel, "_id"), channel);

    this.setActivatedChannel(_.get(channel, "_id"));
    this.update();
  }

  update() {
    this.app.forceUpdate();
  }
}
