// Get references to search input and button
const searchInput = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');

// Attach event listener to search button
searchBtn.addEventListener('click', searchProducts);

// Function to perform product search
function searchProducts() {
    // Get search query
    const query = searchInput.value.toLowerCase();

    // Get all product boxes
    const productBoxes = document.querySelectorAll('.product-box');

    // Loop through product boxes and hide/show based on search query
    productBoxes.forEach(productBox => {
        const title = productBox.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(query)) {
            productBox.style.display = 'block';
        } else {
            productBox.style.display = 'none';
        }
    });
}