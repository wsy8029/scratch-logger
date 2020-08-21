import firebase from "firebase";
import "firebase/firestore";

/**
 * Firebase configuration
 */
export const firebaseConfig = {
    /**
     * Tom's firebase
     */
    // apiKey: "AIzaSyB3f4M3wHVua4rS0_Bdm4oXnSS8mzzgi58",
    // authDomain: "firestore-study-80674.firebaseapp.com",
    // databaseURL: "https://firestore-study-80674.firebaseio.com",
    // projectId: "firestore-study-80674",
    // storageBucket: "firestore-study-80674.appspot.com",
    // messagingSenderId: "79996497059",
    // appId: "1:79996497059:web:d8ef7baf3e054dbb3ae316",
    // measurementId: "G-P18KB0R3SJ",

    /**
     * LUXROBO's firebase
     */
    apiKey: "AIzaSyBKequjq-Q-It88zZt17OAwSfhlYoBqdiU",
    authDomain: "ai-scratch-log.firebaseapp.com",
    databaseURL: "https://ai-scratch-log.firebaseio.com",
    projectId: "ai-scratch-log",
    storageBucket: "ai-scratch-log.appspot.com",
    messagingSenderId: "25150291563",
    appId: "1:25150291563:web:2a3b80bde4a792a20ffb2e",
    measurementId: "G-FY1XW17RGN",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();
const analytics = firebase.analytics();

export { firestore, analytics };
