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
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
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
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let cartCount = 0; 
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  cartCount++;
  // Increment cart count based on the number of items in the cart
  cartCount = itemsAdded.length;
  
  
  // Update cart icon with new count
  document.getElementById('cart-count').textContent = cartCount;

   // Save itemsAdded array to local storage
  //  localStorage.setItem('itemsAdded', JSON.stringify(itemsAdded));

  update();
}

//Retrieve items from local storage
// function start() {
//   // Retrieve items from local storage
//   const storedItems = localStorage.getItem('itemsAdded');

//   // If items are found in local storage, parse them into the itemsAdded array
//   if (storedItems) {
//     itemsAdded = JSON.parse(storedItems);
    
//     // Update cart count based on the number of items in the array
//     cartCount = itemsAdded.length;
//     document.getElementById('cart-count').textContent = cartCount;
//   }

//   addEvents();
// }



function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully :)");
  itemsAdded = [];

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

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  // or you can use also
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "$" + total;

}
// if(cartBox.length==0){
//   var cartt= document.getElementById('cart-icon').textContent- "00.00"
// }

//search functionality
document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.querySelector(".search-btn");
  const searchBox = document.querySelector(".search-box");
  const productBoxes = document.querySelectorAll(".product-box");
 

  searchBtn.addEventListener("click", function() {
      const searchTerm = searchBox.value.trim().toLowerCase();

      // Loop through all product boxes and hide those that don't match the search query
      productBoxes.forEach(function(box) {
          const title = box.querySelector(".product-title").textContent.toLowerCase();
          if (title.includes(searchTerm)) {
              box.style.display = "block";
          } else {
              box.style.display = "none";
          }
      });
  });
});
//search functionality close

//Product Details
document.addEventListener("DOMContentLoaded", function() {
  const productBoxes = document.querySelectorAll(".product-box");
  const productDetailsDiv = document.getElementById("product-details");
  const productDetailsOverlay = document.getElementById("product-details-overlay");
  const closeBtn = document.getElementById("close-btn");
  const productDescriptions = {
    "Nike Shoes": "Description for Nike Shoes. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "BACKPACK": "Description for BACKPACK. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "METAL BOTTLE": "Description for METAL BOTTLE. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "METAL SUNGLASSES": "Description for METAL SUNGLASSES. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "PS5 Controller": "Description for PS5 Controller. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Galaxy Z Fold": "Description for Galaxy Z Fold. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Nokon Camera": "Description for Nokon Camera. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Apple Watch": "Description for Apple Watch. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
};

  productBoxes.forEach(function(box) {
      box.addEventListener("click", function(event) {
        // Stop propagation of the click event to prevent affecting the cart icon function
        event.stopPropagation();
          const title = box.querySelector(".product-title").textContent;
          const price = box.querySelector(".product-price").textContent;
          const imgSrc = box.querySelector(".product-img").src;
          const description = productDescriptions[title]; // Retrieve description based on product title

          // Create HTML content for product details
          const detailsHTML = `
              <img src="${imgSrc}" alt="${title}" class="details-img">
              <div class="details-content">
                  <h2 class="details-title">${title}</h2>
                  <p class="details-price">${price}</p>
                  <p class="details-description">${description}</p>
              </div>
          `;

          // Display product details
          productDetailsDiv.querySelector(".details-content").innerHTML = detailsHTML;
          productDetailsOverlay.style.display = "block"; // Display the overlay
          productDetailsDiv.style.display = "block"; // Ensure the product details div is set to "block"
        
       
        });
  });

  // Close product details when clicking the back button
  closeBtn.addEventListener("click", function() {
      productDetailsDiv.style.display = "none";
      productDetailsOverlay.style.display = "none"; // Hide the overlay
        
  });
});


//Promo Code Valdation
document.addEventListener("DOMContentLoaded", function() {
  const applyPromoBtn = document.querySelector(".apply-promo-btn");

  // Flag to track if promo code has been applied
  let promoApplied = false;

  applyPromoBtn.addEventListener("click", function() {
      // Check if promo code has already been applied
      if (promoApplied) {
          alert("Promo code has already been applied.");
          return; // Exit the function to prevent multiple applications
      }

      // Fetch the entered promo code
      const promoCode = document.querySelector(".promo-input").value.trim();

      // Predefined promo code
      const validPromoCode = "SAVE10"; // For example

      // Check if the entered promo code is valid
      if (promoCode === validPromoCode) {
          // Apply discount
          applyDiscount(10); // 10% discount
          // Set promoApplied flag to true
          promoApplied = true;
      } else {
          // Invalid promo code
          alert("Invalid promo code. Please try again.");
      }
  });

  // Function to apply discount
  function applyDiscount(discountPercentage) {
      // Get the total price element
      const totalPriceElement = document.querySelector(".total-price");
      // Get the current total price
      let totalPrice = parseFloat(totalPriceElement.textContent.replace("$", ""));
      // Calculate discount amount
      const discount = (totalPrice * discountPercentage) / 100;
      // Apply discount
      totalPrice -= discount;
      // Update total price display
      totalPriceElement.textContent = "$" + totalPrice.toFixed(2);
      // Display confirmation message
      alert(`Promo code applied successfully! You saved $${discount.toFixed(2)}. New total: $${totalPrice.toFixed(2)}`);
  }
});


// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1"   class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}
