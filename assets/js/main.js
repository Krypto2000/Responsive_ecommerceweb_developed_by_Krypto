// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  loadCartFromLocalStorage(); // Fetch and render cart items from local storage
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemoveBtns = document.querySelectorAll(".cart-remove");
  cartRemoveBtns.forEach((btn) => {
    btn.addEventListener("click", handleRemoveCartItem);
  });

  // Change item quantity
  let cartQuantityInputs = document.querySelectorAll(".cart-quantity");
  cartQuantityInputs.forEach((input) => {
    input.addEventListener("change", handleChangeItemQuantity);
  });

  // Add item to cart
  let addCartBtns = document.querySelectorAll(".add-cart");
  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", handleAddCartItem);
  });

  // Buy Order
  const buyBtn = document.querySelector(".btn-buy");
  buyBtn.addEventListener("click", handleBuyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handleAddCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;

  let existingItem = itemsAdded.find((el) => el.title === title);
  if (existingItem) {
    // If item already exists, increment its quantity
    existingItem.quantity++;
  } else {
    // If item doesn't exist, add it to the cart with quantity 1
    let newToAdd = { title, price, imgSrc, quantity: 1 };
    itemsAdded.push(newToAdd);
  }

  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));

  // Render cart items
  renderCartItems();

  // Update cart count based on the number of items in the cart
  document.getElementById('cart-count').textContent = calculateTotalQuantity();
  update();
}

function renderCartItems() {
  const cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = ""; // Clear existing content
  
  itemsAdded.forEach(item => {
    let cartBoxElement = createCartBoxComponent(item.title, item.price, item.imgSrc, item.quantity);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    cartContent.appendChild(newNode);
  });
}

function createCartBoxComponent(title, price, imgSrc, quantity) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="${quantity}" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

function calculateTotalQuantity() {
  let totalQuantity = 0;
  itemsAdded.forEach(item => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

function loadCartFromLocalStorage() {
  const storedItems = localStorage.getItem('itemsAdded');
  if (storedItems) {
    itemsAdded = JSON.parse(storedItems);
    renderCartItems();
    document.getElementById('cart-count').textContent = calculateTotalQuantity();
    update();
  }
}

function handleRemoveCartItem() {
  let productTitle = this.parentElement.querySelector(".cart-product-title").innerHTML;
  itemsAdded = itemsAdded.filter((el) => el.title !== productTitle);
  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));
  renderCartItems();
  document.getElementById('cart-count').textContent = calculateTotalQuantity();
  update();
}

function handleChangeItemQuantity() {
  let productTitle = this.parentElement.parentElement.querySelector(".cart-product-title").innerHTML;
  let item = itemsAdded.find((el) => el.title === productTitle);
  if (item) {
    item.quantity = parseInt(this.value);
    localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));
    renderCartItems();
    document.getElementById('cart-count').textContent = calculateTotalQuantity();
    update();
  }
}

function handleBuyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There are no items in the cart. Please add items before placing an order.");
    return;
  }
  // Check if the user is logged in
  const userLoggedIn = localStorage.getItem('user'); // Assume userToken indicates login status

  if (!userLoggedIn) {
    // Redirect to signup page if not logged in
    window.location.href = 'signup.html';
    return;
  }

  // Redirect to payment page if the user is logged in
  window.location.href = 'payment.html';

  const cartContent = document.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your order has been placed successfully.");
  itemsAdded = [];
  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));
  renderCartItems();
  document.getElementById('cart-count').textContent = calculateTotalQuantity();
  update();
}
