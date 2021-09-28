

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
  
// Initialize Firebase
var config = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
const db = firebaseApp.firestore();
export {firebaseApp, db};