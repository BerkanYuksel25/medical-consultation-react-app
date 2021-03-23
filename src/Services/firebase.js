import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAxvuzGumgZ5l2fC-LrC7VkIk1xx377c0E",
    authDomain: "ses3b-d291d.firebaseapp.com",
    databaseURL: "https://ses3b-d291d-default-rtdb.firebaseio.com",
    projectId: "ses3b-d291d",
    storageBucket: "ses3b-d291d.appspot.com",
    messagingSenderId: "358726218019",
    appId: "1:358726218019:web:978a063b360cbfef7cdc96",
    measurementId: "G-G1DRBQF44N"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth;
export const storage = firebase.storage();
export const messaging = firebase.messaging();