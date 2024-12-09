let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartCount = () => {
  document.getElementById('cart-count').innerText = cart.length;
};

const renderCartItems = () => {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';
  cart.forEach((item, index) => {
    cartItemsDiv.innerHTML += `
      <div class="bg-white rounded-lg overflow-hidden shadow-md">
        <img src="${item.productImage}" alt="Product Image" class="w-full h-56 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">${item.productName}</h3>
          <p class="text-gray-600 mb-4">$${item.productPrice}</p>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>`;
  });
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
};

window.onload = () => {
  renderCartItems();
  updateCartCount();
};

document.getElementById('checkout-btn').onclick = () => {
  alert('Checkout process not implemented yet.');
};


let uploadLink = document.getElementById("uploadLink");

function init() {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);

  if (userObj === "user") {
    uploadLink.style.display = "none";
  }}
  init();