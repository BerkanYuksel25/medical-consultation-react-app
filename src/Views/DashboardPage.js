import React, { Component } from "react";
import { auth } from "../Services/firebase";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    auth()
      .signOut()
      .then((data) => {
        window.location.replace("/");
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
