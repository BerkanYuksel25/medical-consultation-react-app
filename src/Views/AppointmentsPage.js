import React, { Component } from "react";
import { auth } from "../Services/firebase";
import HealthAssistant from "../Components/Chatbot/HealthAssistant";

export default class AppointmentsPage extends Component {
  constructor(props) {
    super(props);
  
    }
  


  render() {
    return (
      <div align="center">
        Dashboard
        <div>
      
        </div>
        <button style={this.submitButton} onClick={this.handleSignout}>
          Log out
        </button>
        <HealthAssistant />
      </div>
    );
  }
}
