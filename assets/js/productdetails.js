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
  
  
  