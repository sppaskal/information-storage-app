export function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieString = `${name}=${value};` +
        `expires=${expires.toUTCString()};` +
        `path=/;`;

    document.cookie = cookieString;
}

export function setSecureCookie(name, value, days) {
    // Clear existing cookie
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;

    // Set the new cookie
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieString = `${name}=${value};` +
        `expires=${expires.toUTCString()};` +
        `path=/;` +
        `secure;`;

    document.cookie = cookieString;
}

export function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}
