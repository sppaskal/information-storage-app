import { combineErrorMessages } from './errors.js';

// Function to get data attribute value
function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="signup.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

// Simple for purpose of demo
function validateEmail(emailField){
    if (emailField.length < 1) {
        return false;
    }
    return true;
}

// Simple for purpose of demo
function validatePassword(password){
    if (password.length < 5) {
        return false;
    }

    return true;
}

function showError(msg) {
    document.getElementById('error-message').innerHTML = msg;
    document.getElementById('error-message').style.display = 'block';
}

function hideError() {
    document.getElementById('error-message').innerHTML = '';
    document.getElementById('error-message').style.display = 'none';
}

// -------------------------------------------------------------------

function signup() {
    const baseApiUrl = getBaseApiUrl();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm-password').value;

    try {
        // Check if email is valid
        if (!validateEmail(email)) {
            throw new Error('"Enter a valid email address"');
        }

        // Check if password is valid
        if (!validatePassword(password)) {
            throw new Error('"The password needs to be atleast 5 characters"');
        }

        // Check if passwords match
        if (password != confirm_password) {
            throw new Error('"The passwords do not match"');
        }
    }

    catch(error) {
        showError(error.message);
        return null;
    }
        
    // All checks passed
    hideError();

    // Make a POST request to API endpoint to create user
    fetch(`${baseApiUrl}authentication/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            // Parse JSON error response body
            return response.json().then(errorData => {
                let errorMsg = combineErrorMessages(errorData);
                throw new Error(JSON.stringify(errorMsg));
            });
        }
    })
    .then(data => {
        window.location.href = `${baseApiUrl}user-interface/login/`;
    })
    .catch(error => {
        showError(error.message);
    });
}

// Add event listener to the signup button
document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('signup-button');
    signupButton.addEventListener('click', function() {
        signup();
    });
});