

import firebase from 'firebase/app';
import 'firebase/firestore';
  
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
export default firebaseApp.firestore();