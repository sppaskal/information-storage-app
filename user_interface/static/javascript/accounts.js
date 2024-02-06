import * as constants from './constants.js';
import { getCookie } from './cookie_utils.js';

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
        var headerInfo = '<th>Actions</th>';  // Add the Actions header
        for (var key in accounts[0]) {
            if (constants.accountFields.includes(key)) {
                headerInfo += '<th>' + key + '</th>';
            }
        }
        headerRow.innerHTML = headerInfo;
    
        // Populate table body
        accounts.forEach(function (account, index) {
            var row = accountList.insertRow(index);
    
            // Add buttons to the "Actions" column
            var actionsCell = row.insertCell();
            var saveButton = document.createElement('button');
            saveButton.className = 'save-button';
            var saveIcon = document.createElement('img');
            saveIcon.src = '/static/images/save-floppy-disk.svg';
            saveButton.appendChild(saveIcon);
            saveButton.addEventListener('click', function () {
                // Handle edit functionality here
                console.log('Save button clicked for account:', account);
            });
            actionsCell.appendChild(saveButton);

            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            var deleteIcon = document.createElement('img');
            deleteIcon.src = '/static/images/trash.svg';
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener('click', function () {
                // Handle delete functionality here
                console.log('Delete button clicked for account:', account);
            });
            actionsCell.appendChild(deleteButton);
                
            // Populate other cells based on account data
            for (var key in account) {
                if (constants.accountFields.includes(key)) {
                    var cell = row.insertCell();
                    cell.textContent = account[key];
                    if (constants.editableAccountFields.includes(key)) {
                        cell.contentEditable = true;
                    }
                }
            }
        });
    }
});
