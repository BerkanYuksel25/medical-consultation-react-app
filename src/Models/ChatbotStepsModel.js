import ThreedModelPage from "../Views/Threedmodel";
import Post from "../Components/Chatbot/Post";

const ChatbotStepsModel = [
  {
    id: "intro",
    message: "Hi there! I am your digital health assistant.",
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
    message: "Have you been in contact with someone infected with COVID?",
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
    component: <ThreedModelPage />,
    asMessage: true,
    trigger: "post",
  },
  {
    id: "post",
    component: <Post />,
    asMessage: true,
    end: true,
  },
  {
    id: "end-chat-response",
    message:
      "No worries, plenty of other cool things you can check out on this app! :)",
    end: true,
  },
];

export default ChatbotStepsModel;
