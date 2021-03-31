import React, { Component } from "react";
import { auth } from "../Services/firebase";
import HealthAssistant from "../Components/Chatbot/HealthAssistant";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: auth().currentUser,
    };
  }

  render() {
    return (
      <div align="center">
        Dashboard
        <div>
        <p>id: {this.state.user ? this.state.user.uid : null}</p>
        <p>Email: {this.state.user ? this.state.user.email : null}</p>
        <p>Name: {this.state.user ? this.state.user.displayName : null}</p>
        </div>
        <button style={this.submitButton} onClick={this.handleSignout}>
          Log out
        </button>
        <HealthAssistant />
      </div>
    );
  }
}

export default withRouter(DashboardPage);
