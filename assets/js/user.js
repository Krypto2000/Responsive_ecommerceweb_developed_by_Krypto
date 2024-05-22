// nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');
const buyNowButton = document.querySelector('.btn-buy');


userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(localStorage.getItem('user') || null);
   
    if(user != null){
        // User is logged in
        popuptext.innerHTML = `Welcome, ${user.name}`;
        actionBtn.innerHTML = 'Log Out';
        actionBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
        });

        // Redirect to payment page on Buy Now click
        buyNowButton.addEventListener('click', () => {
            window.location.href = 'payment.html';
        });
    } else {
        // User is logged out
        popuptext.innerHTML = 'Log in to place order';
        actionBtn.innerHTML = 'Log In';
        actionBtn.addEventListener('click', () => {
            location.href = 'login.html';
        });

        // Redirect to signup page on Buy Now click
        buyNowButton.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }
};
