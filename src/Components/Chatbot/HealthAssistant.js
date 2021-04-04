import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import ChatbotStepsModel from "Models/ChatbotStepsModel";

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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot steps={ChatbotStepsModel} {...config} />
      </ThemeProvider>
    );
  }
}

export default HealthAssistant;
