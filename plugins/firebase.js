import firebase from "@firebase/app"
import "@firebase/firestore";
import '@firebase/auth'
import '@firebase/storage';

// .envファイルにkeyを配置することでkeyを隠す
export const config = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}

// Firebase接続の初期化
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const db = firebase.firestore()      // Cloud Firestore への参照を変数化
export const storage = firebase.storage()   // FireStorage への参照を変数化
export const auth = firebase.auth()         // Firebase Authentication の参照を変数化
export default { db, auth, storage,}