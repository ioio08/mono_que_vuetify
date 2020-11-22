import firebase from "firebase/app"

if (!firebase.apps.length) {
firebase.initializeApp({
  apiKey: "AIzaSyAJdTWb3bd8NqohC19s5Xp6eFwBHPQJCIM",
  authDomain: "mono-que-data.firebaseapp.com",
  databaseURL: "https://mono-que-data.firebaseio.com",
  projectId: "mono-que-data",
  storageBucket: "mono-que-data.appspot.com",
  messagingSenderId: "359914177786",
  appId: "1:359914177786:web:13ba738f87f4a883c27543",
  measurementId: "G-5E3TJJE4BY"
})
}

export const db = firebase.firestore()
export const storage = firebase.storage()
export default { db, storage }