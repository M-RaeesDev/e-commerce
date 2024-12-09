// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
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

let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");

window.signupUser = () => {
  let obj = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
      obj.id = res.user.uid;
      obj.userType = "user";
      delete obj.password;

      const refernce = doc(db, "users", obj.id);
      setDoc(refernce, obj)
        .then(() => {
          const userObj = JSON.stringify(obj);
          localStorage.setItem("user", userObj);
          window.location.replace("../../index.html");
        })
        .catch((err) => {
          alert(err.message);
        });
    })
    .catch((err) => {
      alert(err.message);
    });
};
