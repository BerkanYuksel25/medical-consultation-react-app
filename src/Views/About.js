import React, { Component } from "react";
import { auth } from "../Services/firebase";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter,
  } from "react-router-dom";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: auth().currentUser, 
    }
  }

  render() {
    return (
      <div>About</div>
    );
  }
}

export default withRouter((About));

