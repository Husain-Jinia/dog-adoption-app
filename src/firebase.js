import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCLx0SerXLsfkVWwW8x6xjJJEH6j3u0l6g",
  authDomain: "dog-breeding-e2200.firebaseapp.com",
  projectId: "dog-breeding-e2200",
  storageBucket: "dog-breeding-e2200.appspot.com",
  messagingSenderId: "1013274346107",
  appId: "1:1013274346107:web:1055a28d74938f899c58de",
  measurementId: "G-SSVND1P36Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
const analytics = getAnalytics(app);