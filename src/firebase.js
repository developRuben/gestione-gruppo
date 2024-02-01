import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { child, get, getDatabase, push, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA-oC5UfI8VWBqLBAj5y9u_eVNZwUBuU5E",
  authDomain: "gestione-gruppo-servizio.firebaseapp.com",
  databaseURL:
    "https://gestione-gruppo-servizio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gestione-gruppo-servizio",
  storageBucket: "gestione-gruppo-servizio.appspot.com",
  messagingSenderId: "568226232254",
  appId: "1:568226232254:web:a04028ec60cd8108b22bef",
  measurementId: "G-19722K0XVD",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const getDatabaseTable = (tableName) => {
  const db = getDatabase(firebaseApp, firebaseConfig.databaseURL);
  const dbRef = ref(db);
  return child(dbRef, `/${tableName}`);
};
