// Firebase App (required)
import firebase from 'firebase/app';
// additional services
// import 'firebase/auth';
import 'firebase/storage';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/messaging';
// import 'firebase/functions';
import 'dotenv/config';

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "audio-spectrum-visualizer.firebaseapp.com",
  databaseURL: process.env.FIREBASE_URL,
  projectId: "audio-spectrum-visualizer",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

const storageRef = firebase.storage().ref();

// return promise
function getPath(filename) {
  return storageRef.child(filename).getDownloadURL();
}


module.exports = {
  firebase,
  getPath
};