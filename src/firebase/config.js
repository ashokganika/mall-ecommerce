import firebase from "firebase/app";
import "firebase/firebase-storage";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjUuvVOHg8Nndelx8cbf5B7hiFSQI5oYc",
  authDomain: "worldy-ef2c1.firebaseapp.com",
  projectId: "worldy-ef2c1",
  storageBucket: "worldy-ef2c1.appspot.com",
  messagingSenderId: "242869346744",
  appId: "1:242869346744:web:03a1a1f710067cb891ef4d",
};

firebase.initializeApp(firebaseConfig);

export const firebaseStore = firebase.storage();
export const firebaseDatabase = firebase.firestore();
