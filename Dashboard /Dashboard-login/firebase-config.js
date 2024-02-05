// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBoUgcD-49Fl7A0gL2HV__NgwbassO0KL8",
    authDomain: "login-rent-7b0cb.firebaseapp.com",
    projectId: "login-rent-7b0cb",
    storageBucket: "login-rent-7b0cb.appspot.com",
    messagingSenderId: "90256869106",
    appId: "1:90256869106:web:754e5e7b8784358ccf726b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
