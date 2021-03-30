import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Review from "./Review";

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
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    console.log(steps);
    console.log(values);
    alert(`COVID prediction will take place here!`);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: "intro",
              message: "Hi there! I am your digital health assistant.",
              trigger: "name-question",
            },
            {
              id: "name-question",
              message: "What's your name?",
              trigger: "name",
            },
            {
              id: "name",
              user: true,
              trigger: "intro-response",
            },
            {
              id: "intro-response",
              message: "Hi {previousValue}! Nice to meet you :)",
              trigger: "age-question",
            },
            {
              id: "age-question",
              message: "What's your age?",
              trigger: "age",
            },
            {
              id: "age",
              user: true,
              trigger: "sex-question",
              validator: (value) => {
                if (isNaN(value)) {
                  return "value must be a number";
                } else if (value < 1) {
                  return "value must be positive";
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }

                return true;
              },
            },
            {
              id: "sex-question",
              message: "What's your sex?",
              trigger: "sex",
            },
            {
              id: "sex",
              options: [
                {
                  value: "Male",
                  label: "Male",
                  trigger: "symptom-qualifier-question",
                },
                {
                  value: "Female",
                  label: "Female",
                  trigger: "symptom-qualifier-question",
                },
              ],
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
              trigger: "headaches",
            },
            {
              id: "headaches",
              options: [
                { value: "Yes", label: "Yes", trigger: "symptoms-question-2" },
                { value: "No", label: "No", trigger: "symptoms-question-2" },
              ],
            },
            {
              id: "symptoms-question-2",
              message: "Do you have also have a fever?",
              trigger: "fever",
            },
            {
              id: "fever",
              options: [
                { value: "Yes", label: "Yes", trigger: "symptoms-question-3" },
                { value: "No", label: "No", trigger: "symptoms-question-3" },
              ],
            },
            {
              id: "symptoms-question-3",
              message: "How about a sore throat?",
              trigger: "soreThroat",
            },
            {
              id: "soreThroat",
              options: [
                { value: "Yes", label: "Yes", trigger: "symptoms-question-4" },
                { value: "No", label: "No", trigger: "symptoms-question-4" },
              ],
            },
            {
              id: "symptoms-question-4",
              message: "How about cough?",
              trigger: "cough",
            },
            {
              id: "cough",
              options: [
                { value: "Yes", label: "Yes", trigger: "symptoms-question-5" },
                { value: "No", label: "No", trigger: "symptoms-question-5" },
              ],
            },
            {
              id: "symptoms-question-5",
              message: "Are you also experiencing shortness of breath?",
              trigger: "shortnessOfBreath",
            },
            {
              id: "shortnessOfBreath",
              options: [
                { value: "Yes", label: "Yes", trigger: "symptoms-question-6" },
                { value: "No", label: "No", trigger: "symptoms-question-6" },
              ],
            },
            {
              id: "symptoms-question-6",
              message:
                "Have you been in contact with someone infected with COVID?",
              trigger: "covidContact",
            },
            {
              id: "covidContact",
              options: [
                {
                  value: "Yes",
                  label: "Yes",
                  trigger: "symptoms-summary-prompt",
                },
                {
                  value: "No",
                  label: "No",
                  trigger: "symptoms-summary-prompt",
                },
              ],
            },
            {
              id: "symptoms-summary-prompt",
              message: "Great! Check out your summary",
              trigger: "review",
            },
            {
              id: "review",
              component: <Review />,
              asMessage: true,
              trigger: "congrats",
            },
            {
              id: "congrats",
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
