// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO8L77QX3bq7tf5GqOFOvXkkqq0a3h63c",
  authDomain: "legal-ai-8ebe8.firebaseapp.com",
  projectId: "legal-ai-8ebe8",
  storageBucket: "legal-ai-8ebe8.appspot.com",
  messagingSenderId: "190575471301",
  appId: "1:190575471301:web:26c3b521bed6c4fd889eac",
  measurementId: "G-E8VNF009MP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
