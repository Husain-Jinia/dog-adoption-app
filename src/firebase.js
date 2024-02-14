import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config";


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
const analytics = getAnalytics(app);