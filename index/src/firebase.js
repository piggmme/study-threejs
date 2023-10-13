// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBESgVWJE-H7uNB7Apt65BleV2gkLWLg0",
  authDomain: "test2-47e4b.firebaseapp.com",
  projectId: "test2-47e4b",
  storageBucket: "test2-47e4b.appspot.com",
  messagingSenderId: "19740261",
  appId: "1:19740261:web:d30edd5d9f0296cb2ff88c",
  measurementId: "G-0HTF35ZTN6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
