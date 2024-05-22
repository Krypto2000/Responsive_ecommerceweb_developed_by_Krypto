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

  let newToAdd = { title, price, imgSrc };

  // Check if item already exists
  if (itemsAdded.find((el) => el.title === newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));

  // Add product to cart
  let cartBoxElement = createCartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  // Update cart count based on the number of items in the cart
  document.getElementById('cart-count').textContent = itemsAdded.length;

  update();
}

// Retrieve items from local storage and render them
function loadCartFromLocalStorage() {
  const storedItems = localStorage.getItem('itemsAdded');
  if (storedItems) {
    itemsAdded = JSON.parse(storedItems);

    const cartContent = document.querySelector(".cart-content");
    itemsAdded.forEach(item => {
      let cartBoxElement = createCartBoxComponent(item.title, item.price, item.imgSrc);
      let newNode = document.createElement("div");
      newNode.innerHTML = cartBoxElement;
      cartContent.appendChild(newNode);
    });

    // Update cart count
    document.getElementById('cart-count').textContent = itemsAdded.length;

    // Ensure event listeners are added to the dynamically created elements
    update();
  }
}

function handleRemoveCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) => el.title !== this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));
  update();
}

function handleChangeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handleBuyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  // Check if the user is logged in
  const userLoggedIn = localStorage.getItem('user'); // Assume userToken indicates login status

  if (!userLoggedIn) {
    // Redirect to signup page if not logged in
    window.location.href = 'signup.html';
    alert("Please log in first to place your order.")
  
    return;
  }
// Redirect to payment page if the user is logged in
window.location.href = 'payment.html';

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully :)");
  itemsAdded = [];
  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));
  update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  total = total.toFixed(2);
  totalElement.innerHTML = "$" + total;
}

// ============= HTML COMPONENTS =============
function createCartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}
