// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbzjGCpG97e8orhWVeQIHnW_S4MzTUle0",
  authDomain: "blog-app-mern-abcd4.firebaseapp.com",
  projectId: "blog-app-mern-abcd4",
  storageBucket: "blog-app-mern-abcd4.appspot.com",
  messagingSenderId: "1026775706100",
  appId: "1:1026775706100:web:dd2864d63a5ad6e7ad31a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);