window.onload = () => {
    const userData = localStorage.getItem('user');
    if(userData) {
        location.replace('products.html');
    }
}

const loader = document.querySelector('.loader');

// select inputs 
const submitBtn = document.querySelector('.submit-btn');
const nameInput = document.querySelector('#name') || null; // Changed variable name to nameInput
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notification') || null;

submitBtn.addEventListener('click', () => {
    if(nameInput !== null){ // Check if nameInput is not null
        if(nameInput.value.length < 3){
            showAlert('name must be 3 letters long');
        } else if(!email.value.length){
            showAlert('enter your email');
        } else if(password.value.length < 8){
            showAlert('password should be 8 letters long');
        } else if(!number.value.length){
            showAlert('enter your phone number');
        } else if(!Number(number.value) || number.value.length < 10){
            showAlert('invalid number, please enter valid one');
        } else if(!tac.checked){
            showAlert('you must agree to our terms and conditions');
        } else{
            // Store user data in local storage
            const user = {
                name: nameInput.value, // Changed to use nameInput.value
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked,
                notification: notification.checked,
                seller: false
            };
            localStorage.setItem('user', JSON.stringify(user));
            // alert('Your details have been successfully saved.');
             // Display registration successful message
             showRegistrationSuccess();

            // Redirect to login page
            location.replace('login.html');
        }
    } else{
        // login page
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser && storedUser.email === email.value && storedUser.password === password.value){
            // Redirect to products page
            location.replace('products.html');
        } else{
            showAlert('Invalid email or password');
        }
    }
})

function showAlert(message) {
    alert(message);
}

