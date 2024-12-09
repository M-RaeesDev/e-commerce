// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// import {
//   getAuth,
//   signOut,
// } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// import {
//   getFirestore,
//   collection, getDocs,
// } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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
// const db = getFirestore();
// const auth = getAuth();

// let loginLink = document.getElementById("loginLink");
// let uploadLink = document.getElementById("uploadLink");
// let signupLink = document.getElementById("signupLink");
// let logoutBtn = document.getElementById("logoutBtn");

// function init() {
//   let userObj = localStorage.getItem("user");
//   userObj = JSON.parse(userObj);

//   if (userObj) {
//     loginLink.style.display = "none";
//     signupLink.style.display = "none";
//     if (userObj.userType === "user") {
//       uploadLink.style.display = "none";
//     }
//     logoutBtn.className =
//       "text-white mx-4 inline-block bg-sky-700 p-2 rounded";
//   }
// }
// init();

// window.logout = () => {
//   signOut(auth)
//     .then(() => {
//       localStorage.removeItem("user");
//       init();
//     })
//     .catch((err) => {
//       alert(err.message);
//     });
// };

// let renderProducts =()=>{
//   productParent.innerHTML = "";
//   products.forEach((x)=>{

//   productsParent.innerHTML +=  `<div class="bg-white rounded-lg overflow-hidden shadow-md">
//                 <img src="${x.productImage}" alt="Product Image" class="w-full h-56 object-cover">
//                 <div class="p-6">
//                     <h3 class="text-xl font-semibold mb-2">${x.productName}</h3>
//                     <p class="text-gray-600 mb-4">${x.productPrice}</p>
//                     <a href="#" class="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Buy Now</a>
//                 </div>
//             </div>`;
//   });
// };

// let getProducts = async ()=>{
//   const reference = collection(db, "products");
//   const dt = await getDocs(reference);
//   console.log(dt);
//   dt.forEach((dc)=>{

//     let obj = {
//       id : dc.id,
//       ...dc.data(),
//     };
//     getProducts.push(obj);
//     console.log(products);
//     renderProducts();
//   });
// }


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
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
const db = getFirestore();
const auth = getAuth();

let loginLink = document.getElementById("loginLink");
let uploadLink = document.getElementById("uploadLink");
let signupLink = document.getElementById("signupLink");
let logoutBtn = document.getElementById("logoutBtn");
let cartLink = document.getElementById("cartLink");

function init() {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);

  if (userObj) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    if (userObj.userType === "user") {
      uploadLink.style.display = "none";
      cartLink.style.display ="block"
    }
    if (userObj.userType === "admin"){
        cartLink.style.display = "none";
      }
    
    logoutBtn.className =
         "text-white mx-4 inline-block bg-sky-700 p-2 rounded";
  }
}
init();

window.logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      init();
      window.location.replace("pages/login/login.html")
    })
    .catch((err) => {
      alert(err.message);
    });
};

let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartCount = () => {
  document.getElementById('cart-count').innerText = cart.length;
};

const addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
};

let renderProducts = () => {
  let productParent = document.getElementById("productParent");
  productParent.innerHTML = "";
  products.forEach((product) => {
    productParent.innerHTML += `
      <div class="bg-white rounded-lg overflow-hidden shadow-md">
        <img src="${product.productImage}" alt="Product Image" class="w-full h-56 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">${product.productName}</h3>
          <p class="text-gray-600 mb-4">$${product.productPrice}</p>
          <button class="bg-blue-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" data-product-id="${product.id}" onclick='handleAddToCart(event)'>Add to Cart</button>
        </div>
      </div>`;

      
  });
};

let getProducts = async () => {
  const reference = collection(db, "products");
  const dt = await getDocs(reference);
  products = [];
  dt.forEach((dc) => {
    let obj = {
      id: dc.id,
      ...dc.data(),
    };
    products.push(obj);
  });
  renderProducts();
};

// Fetch and render products on page load
window.onload = () => {
  getProducts();
  updateCartCount();
};

window.handleAddToCart = (event) => {
  const productId = event.target.getAttribute('data-product-id');
  addToCart(productId);
};





