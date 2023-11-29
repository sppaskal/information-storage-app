function submitCredentials(baseApiUrl) {
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
    })
    .catch(error => {
        document.getElementById('valid-credentials-message').style.display = 'none';
        document.getElementById('error-message').textContent = error.message;
    });
}

function submitLogin(baseApiUrl) {
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
        // Handle successful login
        document.getElementById('valid-credentials-message').style.display = 'none';
        document.getElementById('login-success-message').style.display = 'block';

        // Store tokens as cookies with an expiration time
        setSecureCookie('access_token', data.access_token, 1);
        setSecureCookie('refresh_token', data.refresh_token, 7);

        test()
        alert(getCookie("access_token"))
        
        console.log('Access Token:', data.access_token);
        console.log('Refresh Token:', data.refresh_token);
    })
    .catch(error => {
        // Display error message
        document.getElementById('error-message').textContent = error.message;
    });
}