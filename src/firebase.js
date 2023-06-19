import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import 'firebase/compat/database'
    
const firebaseConfig = {
  apiKey: "AIzaSyB1eAE-AA5sI9-ItRLhUvfwPLjPmtfKLHY",
  authDomain: "school-management-system-9bb1b.firebaseapp.com",
  projectId: "school-management-system-9bb1b",
  storageBucket: "school-management-system-9bb1b.appspot.com",
  messagingSenderId: "1010614180677",
  appId: "1:1010614180677:web:39ee3b9b77c05377cdbc2c",
  measurementId: "G-KE5TK7BETW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDB = firebaseApp.database();
const fire = firebaseApp.database().ref();
export default firebaseDB; 
export const auth = getAuth();
export const storage = getStorage();
export {fire};