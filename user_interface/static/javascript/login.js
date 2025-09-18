import { setSecureCookie } from './cookie_utils.js';

// -------------------------------------------------------------------

// Function to get data attribute value
function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="login.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

function handleSuccessfulLogin(baseApiUrl, data) {
    // Manage UI messages
    showSuccess("Login successful!")

    // Store tokens as cookies with an expiration time
    setSecureCookie('access_token', data.access_token, 1);
    setSecureCookie('refresh_token', data.refresh_token, 7);

    window.location.href = `${baseApiUrl}user-interface/accounts/`;
}

function showValidationComponents() {
    showSuccess("Credentials were valid. Check your email for your access code.")
    document.getElementById('access-code-container').style.display = 'block';
    document.getElementById('validate-button').style.display = 'inline';
}

function hideValidationComponents() {
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('access-code-container').style.display = 'none';
    document.getElementById('validate-button').style.display = 'none';
}

function showSuccess(msg) {
    hideError()
    document.getElementById('success-message').textContent = msg;
    document.getElementById('success-message').style.display = 'block';
}

function hideSuccess(msg) {
    document.getElementById('success-message').style.display = 'none';
}

function showError(msg) {
    hideSuccess()
    document.getElementById('error-message').textContent = msg;
    document.getElementById('error-message').style.display = 'block';
}

function hideError() {
    document.getElementById('error-message').style.display = 'none';
}

// -------------------------------------------------------------------

export function submitCredentials() {
    const baseApiUrl = getBaseApiUrl();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Make a POST request to API endpoint to validate username and password
    fetch(`${baseApiUrl}authentication/login-initial/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid username or password');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        if (!data.mfa_enabled) { // Bypass multifactor auth
            handleSuccessfulLogin(baseApiUrl, data)
        } else {
            showValidationComponents()
            return
        }
    })
    .catch(error => {
        hideValidationComponents()
        showError(error.message)
    });
}

// Add event listener to the login button
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', function() {
        submitCredentials();
    });
});

// -------------------------------------------------------------------

function signup() {
    const baseApiUrl = getBaseApiUrl();
    window.location.href = `${baseApiUrl}user-interface/signup/`;
}

// Add event listener to the signup button
document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('signup-button');
    signupButton.addEventListener('click', function() {
        signup();
    });
});

// -------------------------------------------------------------------

export function submitLogin() {
    const baseApiUrl = getBaseApiUrl();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const accessCode = document.getElementById('access-code').value;

    // Make a POST request to API endpoint to complete the login process
    fetch(`${baseApiUrl}authentication/login-final/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            access_code: accessCode,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid access code');
        }

        // Parse JSON response
        return response.json();
    })
    .then(data => {
        handleSuccessfulLogin(baseApiUrl, data)
    })
    .catch(error => {
        showError(error.message)
    });
}

// Add event listener to the validate button
document.addEventListener('DOMContentLoaded', function() {
    const validateButton = document.getElementById('validate-button');
    validateButton.addEventListener('click', function() {
        submitLogin();
    });
});

// -------------------------------------------------------------------