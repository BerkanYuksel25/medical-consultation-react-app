import Review from "../Components/Chatbot/Review";
import Post from "../Components/Chatbot/Post";
import MapRedirect from "../Components/Chatbot/MapRedirect";
import Recheck from "../Components/Chatbot/Recheck";

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
      { value: 2, label: "No", trigger: "pre-re-check" },
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
    component: <Review />,
    asMessage: true,
    trigger: "post",
  },
  {
    id: "post",
    component: <Post />,
    asMessage: true,
    waitAction: true,
  },
  {
    id: "high-risk",
    message:
      "You are at high risk of COVID based on our assessment. I think you should see a doctor just to be safe. :)",
    trigger: "find-clinic-question",
  },
  {
    id: "low-risk",
    message:
      "You are at low risk of COVID based on our assessment. Rest easy! I don't think it's worth the effort for you to go see a doctor. :)",
    trigger: "pre-re-check",
  },
  {
    id: "find-clinic-question",
    message: "Would you like to be to find a nearby testing clinic?",
    trigger: "clinic-redirect-options",
  },
  {
    id: "clinic-redirect-options",
    options: [
      {
        value: "Yes",
        label: "Yes",
        trigger: "clinic-redirection",
      },
      {
        value: "No",
        label: "No",
        trigger: "pre-re-check",
      },
    ],
  },
  {
    id: "clinic-redirection",
    component: <MapRedirect />,
    asMessage: true,
  },
  {
    id: "pre-re-check",
    message: "Feel free to check back again later if you like!",
    trigger: "re-check",
  },
  {
    id: "re-check",
    component: <Recheck />,
    waitAction: true,
  },
  {
    id: "end-chat-response",
    message:
      "No worries, plenty of other cool things you can check out on this app! :)",
    end: true,
  },
];

export default ChatbotStepsModel;