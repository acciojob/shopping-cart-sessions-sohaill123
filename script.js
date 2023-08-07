// JavaScript Code (script.js)
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear the previous cart items

  const cartData = getCartDataFromSessionStorage();
  cartData.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} x ${cartItem.quantity} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  let cartData = getCartDataFromSessionStorage();
  const existingItem = cartData.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartData.push({ id: productId, quantity: 1 });
  }

  setCartDataToSessionStorage(cartData);
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  let cartData = getCartDataFromSessionStorage();
  const itemIndex = cartData.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cartData.splice(itemIndex, 1);
    setCartDataToSessionStorage(cartData);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  setCartDataToSessionStorage([]);
  renderCart();
}

// Utility function to get cart data from session storage
function getCartDataFromSessionStorage() {
  const cartDataString = sessionStorage.getItem("cartData");
  return cartDataString ? JSON.parse(cartDataString) : [];
}

// Utility function to set cart data to session storage
function setCartDataToSessionStorage(cartData) {
  sessionStorage.setItem("cartData", JSON.stringify(cartData));
}

// Event listener for adding item to cart
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

// Event listener for removing item from cart
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    removeFromCart(productId);
  }
});

// Initial render
renderProducts();
renderCart();
