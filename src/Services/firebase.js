import firebase from "firebase";

// Add your own Firebase project's config data here.
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database;
export const auth = firebase.auth;
export const storage = firebase.storage();
export const messaging = firebase.messaging();
