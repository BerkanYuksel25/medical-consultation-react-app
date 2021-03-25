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
              trigger: "intro-response",
            },
            {
              id: "intro-response",
              message: "Hi {previousValue}! Nice to meet you :)",
              trigger: "symptom-qualifier-question",
            },
            {
              id: "symptom-qualifier-question",
              message: "Would you like to assess your COVID likelihood?",
              trigger: "symptom-qualifier-answer",
            },
            {
              id: "symptom-qualifier-answer",
              options: [
                { value: 1, label: "Yes", trigger: "symptoms-question-1" },
                { value: 2, label: "No", trigger: "end-chat-response" },
              ],
            },
            {
              id: "symptoms-question-1",
              message: "Do you currently have headaches?",
              trigger: "symptoms-answer-1",
            },
            {
              id: "symptoms-answer-1",
              options: [
                { value: 1, label: "Yes", trigger: "symptoms-question-2" },
                { value: 2, label: "No", trigger: "symptoms-question-2" },
              ],
            },
            {
              id: "symptoms-question-2",
              message: "Do you have also have a fever?",
              trigger: "symptoms-answer-2",
            },
            {
              id: "symptoms-answer-2",
              options: [
                { value: 1, label: "Yes", trigger: "symptoms-question-3" },
                { value: 2, label: "No", trigger: "symptoms-question-3" },
              ],
            },
            {
              id: "symptoms-question-3",
              message:
                "Have you been in contact with someone infected with COVID?",
              trigger: "symptoms-answer-3",
            },
            {
              id: "symptoms-answer-3",
              options: [
                { value: 1, label: "Yes", trigger: "symptoms-question-4" },
                { value: 2, label: "No", trigger: "end-chat-response" },
              ],
            },
            {
              id: "symptoms-question-4",
              message: "Congratulations! You are 100% likely to have COVID! :)",
              end: true,
            },
            {
              id: "end-chat-response",
              message:
                "No worries, plenty of other cool things you can check out on this app! :)",
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
