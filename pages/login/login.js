// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkv9gtaxYMDqVeoexuJwzenrtbeWrSD6o",
  authDomain: "goldenoutfit-d1701.firebaseapp.com",
  projectId: "goldenoutfit-d1701",
  storageBucket: "goldenoutfit-d1701.appspot.com",
  messagingSenderId: "329714258527",
  appId: "1:329714258527:web:7ed1d3afdf7f586a8c01ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let email = document.getElementById("email");
let password = document.getElementById("password");

window.loginUser = () => {
  let obj = {
    email: email.value,
    password: password.value,
  };
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async (res) => {
      const id = res.user.uid;
      const refernce = doc(db, "users", id);
      const snap = await getDoc(refernce);
      if (snap.exists()) {
        localStorage.setItem("user", JSON.stringify(snap.data()));
        window.location.replace("../../index.html");
      } else {
        alert("Data Not Found");
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};
