import firebase from "firebase";
import "firebase/firestore";

/**
 * Firebase configuration
 */
export const firebaseConfig = {
    apiKey: "AIzaSyB3f4M3wHVua4rS0_Bdm4oXnSS8mzzgi58",
    authDomain: "firestore-study-80674.firebaseapp.com",
    databaseURL: "https://firestore-study-80674.firebaseio.com",
    projectId: "firestore-study-80674",
    storageBucket: "firestore-study-80674.appspot.com",
    messagingSenderId: "79996497059",
    appId: "1:79996497059:web:d8ef7baf3e054dbb3ae316",
    measurementId: "G-P18KB0R3SJ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();
const analytics = firebase.analytics();

export { firestore, analytics };
