import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial",
  headerBgColor: "#A5302E",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#A5302E",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const config = {
  width: "400px",
  height: "500px",
  floating: true,
};

// For component documentation, please refer: https://lucasbassetti.com.br/react-simple-chatbot/
class HealthAssistant extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: "intro",
              message: "Hi there! I am your digital health assistant.",
              trigger: "follow-up",
            },
            {
              id: "follow-up",
              message: "What's your name?",
              trigger: "intro-user",
            },
            {
              id: "intro-user",
              user: true,
              trigger: "no-response",
            },
            {
              id: "no-response",
              message: "Hi {previousValue}! Nice to meet you :)",
              end: true,
            },
          ]}
          {...config}
        />
      </ThemeProvider>
    );
  }
}

export default HealthAssistant;
