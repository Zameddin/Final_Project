import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAzEszXn0420Wqsx7TJm-t2xBAaVyoR0Cc",
  authDomain: "movie-be2cc.firebaseapp.com",
  projectId: "movie-be2cc",
  storageBucket: "movie-be2cc.appspot.com",
  messagingSenderId: "531819316536",
  appId: "1:531819316536:web:6fa969c88c200bad41adcd",
  
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();