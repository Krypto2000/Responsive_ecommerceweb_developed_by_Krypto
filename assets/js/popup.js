document.addEventListener("DOMContentLoaded", function() {
    // Show the popup after 3 seconds
    setTimeout(function() {
        document.getElementById("discount-popup").style.display = "block";
    }, 1000);

    // Close the popup when the close icon is clicked
    document.getElementById("close-popup").addEventListener("click", function() {
        document.getElementById("discount-popup").style.display = "none";
    });
});


