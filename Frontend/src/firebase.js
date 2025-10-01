// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjnhgFBd9-M4_VPo1I-DHbfQn78WsTKso",
  authDomain: "assignment-1-95772.firebaseapp.com",
  projectId: "assignment-1-95772",
  storageBucket: "assignment-1-95772.firebasestorage.app",
  messagingSenderId: "726849227269",
  appId: "1:726849227269:web:8d2dcb7f2fcdcd0266aa6c",
  measurementId: "G-9C3C97F624"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
