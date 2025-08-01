// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkiuANDzWPcIn2hEYLqgoL3QIfoogyNDw",
  authDomain: "useradmin-58f1e.firebaseapp.com",
  databaseURL: "https://useradmin-58f1e-default-rtdb.firebaseio.com",
  projectId: "useradmin-58f1e",
  storageBucket: "useradmin-58f1e.appspot.com",
  messagingSenderId: "797568351485",
  appId: "1:797568351485:web:b025d667a4506b17dbd294"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
