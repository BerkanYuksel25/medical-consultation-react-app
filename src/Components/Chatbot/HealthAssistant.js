import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { database } from "../../Services/firebase";
import { getAge, convertToONEZERO } from "../../Common/Utils";
import ChatbotStepsModel from "Models/ChatbotStepsModel";
import { getPredictions } from "Services/api";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial",
  headerBgColor: "#73303D",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#73303D",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const config = {
  width: "400px",
  height: "500px",
  floating: true,
};

class HealthAssistant extends Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  async handleEnd({ steps, values }) {
    if (values[3] === 1) {
      var userdata = {};
      var userid = JSON.parse(localStorage.getItem("user"))["uid"];

      await database()
        .ref("users/" + userid)
        .once("value", (snap) => {
          userdata = snap.val();
        });

      const data = {
        sex: convertToONEZERO(userdata["gender"]),
        age: getAge(userdata["birthday"]),
        headaches: convertToONEZERO(values[4]),
        fever: convertToONEZERO(values[5]),
        soreThroat: convertToONEZERO(values[6]),
        cough: convertToONEZERO(values[7]),
        shortnessOfBreath: convertToONEZERO(values[8]),
        covidContact: convertToONEZERO(values[9]),
      };

      await getPredictions(data);
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          handleEnd={this.handleEnd}
          steps={ChatbotStepsModel}
          {...config}
        />
      </ThemeProvider>
    );
  }
}

export default HealthAssistant;
