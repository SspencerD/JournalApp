import firebase from 'firebase/app';
import 'firebase/firestore/';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCG2g_VYaEGOgqUzG0BRGsd96JvoAvB1f4",
    authDomain: "react-appjournal.firebaseapp.com",
    projectId: "react-appjournal",
    storageBucket: "react-appjournal.appspot.com",
    messagingSenderId: "1085586343123",
    appId: "1:1085586343123:web:11c8b00e015ecb19cc8026"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();


export{

    db,
    googleAuthProvider,
    facebookAuthProvider,
    firebase
}