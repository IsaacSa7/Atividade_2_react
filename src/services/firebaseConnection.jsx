

import { initializeApp } from "firebase/app";
import {getFirestore, } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyByxK9UnFQkvm7P9Hk86B_E6a7GsEW_Zhw",
  authDomain: "teste-626ca.firebaseapp.com",
  projectId: "teste-626ca",
  storageBucket: "teste-626ca.appspot.com",
  messagingSenderId: "666840961428",
  appId: "1:666840961428:web:a37bece7c8cf7ad3653f81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}