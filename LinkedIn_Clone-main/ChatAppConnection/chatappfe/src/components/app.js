import React, { Component } from "react";
import Messenger from "./messenger";
import Store from "../store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: new Store(this)
    };
  }
  render() {
    const { store } = this.state;
    return <Messenger store={store} />;
  }
}

export default App;
