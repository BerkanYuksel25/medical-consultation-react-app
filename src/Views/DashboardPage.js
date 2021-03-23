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
    }
  }

  render() {
    return (
      <div>Dashboard Page</div>
    );
  }
}

export default withRouter((DashboardPage));

