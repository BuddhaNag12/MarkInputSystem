import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
export const app=firebase.initializeApp({
  apiKey: "AIzaSyAvQ7kdCpggDtMxG0rvrUQv0RD68YiaOHM",
  authDomain: "cachar-college.firebaseapp.com",
  databaseURL: "https://cachar-college.firebaseio.com",
  projectId: "cachar-college",
  storageBucket: "cachar-college.appspot.com",
  messagingSenderId: "567263391269",
  appId: "1:567263391269:web:d6d1662305a24c9bad19cc",
  measurementId: "G-PXPD4HRT0B"
  })
// const db = firebase.firestore();


// export default db;