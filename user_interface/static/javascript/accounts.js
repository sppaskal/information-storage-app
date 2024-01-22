import * as constants from './constants.js';
import { getCookie } from './cookie_utils.js';

// Function to get data attribute value
function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="accounts.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

document.addEventListener('DOMContentLoaded', function () {
    var baseApiUrl = getBaseApiUrl();
    var accessToken = getCookie('access_token');

    if (!accessToken) {
        console.error('Access token not found.');
        return;
    }

    // ---------------------------------------------------------------

    // Get account data
    fetch(`${baseApiUrl}accounts-api/accounts`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
        displayAccountList(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    // ---------------------------------------------------------------

    function displayAccountList(accounts) {
        var headerRow = document.getElementById('header-row');
        var accountList = document.getElementById('account-list');

        // Create header row
        var headerInfo = '';
        for (var key in accounts[0]) {
            if (constants.accountFields.includes(key)) {
                headerInfo += '<th>' + key + '</th>';
            }
        }
        headerRow.innerHTML = headerInfo;

        // Populate table body
        accounts.forEach(function (account, index) {
            var row = accountList.insertRow(index);
            for (var key in account) {
                if (constants.accountFields.includes(key)) {
                    var cell = row.insertCell();
                    cell.textContent = account[key];
                }
            }
        });
    }
});
