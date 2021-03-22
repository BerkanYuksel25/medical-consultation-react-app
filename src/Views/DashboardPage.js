import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../Services/firebase";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    console.log("Sign out");
    auth()
      .signOut()
      .then((data) => {
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div align="center">
        Dashboard
        <button style={this.submitButton} onClick={this.handleSignout}>
          Log out
        </button>
      </div>
    );
  }
}

export default DashboardPage;
