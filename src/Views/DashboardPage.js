import React, { Component } from "react";
import { auth } from "../Services/firebase";
import HealthAssistant from "../Components/Chatbot/HealthAssistant";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
    this.state = {
      user: JSON.parse(localStorage.getItem("user"))
    }
    // console.log(this.state.user);
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
        <div>
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
