import { setSecureCookie } from './cookie_utils.js';

// -------------------------------------------------------------------

// Function to get data attribute value
function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="login.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

function handleSuccessfulLogin(baseApiUrl, data) {
    // Manage UI messages
    document.getElementById('valid-credentials-message').style.display = 'none';
    document.getElementById('login-success-message').style.display = 'block';

    // Store tokens as cookies with an expiration time
    setSecureCookie('access_token', data.access_token, 1);
    setSecureCookie('refresh_token', data.refresh_token, 7);

    window.location.href = `${baseApiUrl}user-interface/accounts/`;
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

        // Show the access code input box and validate button
        document.getElementById('error-message').style.display = 'none'
        document.getElementById('login-button').style.display = 'none'
        document.getElementById('valid-credentials-message').style.display = 'block';
        document.getElementById('access-code-container').style.display = 'block';
        document.getElementById('validate-button').style.display = 'block';

        // Parse JSON response
        return response.json();
    })
    .then(data => {
        if (data.demo_mode) { // Bypass multifactor auth
            handleSuccessfulLogin(baseApiUrl, data)
        }
    })
    .catch(error => {
        document.getElementById('valid-credentials-message').style.display = 'none';
        document.getElementById('error-message').textContent = error.message;
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
        // Display error message
        document.getElementById('error-message').textContent = error.message;
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