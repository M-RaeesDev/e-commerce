// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// import {
//   getFirestore,
//   collection, addDoc,
// } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL
// } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAkv9gtaxYMDqVeoexuJwzenrtbeWrSD6o",
//   authDomain: "goldenoutfit-d1701.firebaseapp.com",
//   projectId: "goldenoutfit-d1701",
//   storageBucket: "goldenoutfit-d1701.appspot.com",
//   messagingSenderId: "329714258527",
//   appId: "1:329714258527:web:7ed1d3afdf7f586a8c01ea"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const db = getFirestore();
// const storage = getStorage();


// let productName = document.getElementById('productName');
// let productDescription = document.getElementById('productDescription');
// let productPrice = document.getElementById('productPrice');
// let productCategory = document.getElementById('productCategory');
// let productImage = document.getElementById('productImage');

// window.uplaodBtn = async ()=>{
//   let Obj = {
//     productName : productName.value,
//     productDescription : productDescription.value,
//     productPrice : productPrice.value,
//     productCategory : productCategory.value,
//     productImage : productImage.value,
//   }


// let reference = collection(db,"products");

// let res = await addDoc(reference,Obj);
// };


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  collection, addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
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
const storage = getStorage();

let productName = document.getElementById('productName');
let productDescription = document.getElementById('productDescription');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productImage = document.getElementById('productImage');

window.uploadBtn = async () => {
    const file = productImage.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // Create a storage reference
    const storageRef = ref(storage, 'products/' + file.name);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('File upload error:', error);
        },
        async () => {
            // Handle successful uploads on complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);

            // Create the product object with the image URL
            const Obj = {
                productName: productName.value,
                productDescription: productDescription.value,
                productPrice: productPrice.value,
                productCategory: productCategory.value,
                productImage: downloadURL
            };

            // Save product details in Firestore
            try {
                const reference = collection(db, "products");
                await addDoc(reference, Obj);
                alert('Product uploaded successfully!');
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        }
    );
};



