import * as constants from './constants.js';
import { populateRowCells } from './accounts_utils.js';
import { getCookie } from './cookie_utils.js';
import { createDeleteButton,
        createSaveButton,
        createAddButton,
        logoutAction,
        deleteAction,
        saveAction,
        addAction
    } from './accounts_buttons.js';

// -------------------------------------------------------------------

function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="accounts.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

function addHeaderRow(account) {
    var headerRow = document.getElementById('header-row');
    var headerInfo = '<th>Actions</th>';  // Add the Actions header
    for (var key in account) {
        if (constants.viewableAccountFields.includes(key)) {
            headerInfo += '<th>' + key + '</th>';
        }
    }
    headerRow.innerHTML = headerInfo;
}

function addDataRows(accountList, accounts, baseApiUrl, accessToken) {
    // Populate table body
    accounts.forEach(function (account, index) {
        var row = accountList.insertRow(index);

        // Add buttons to the "Actions" column
        var actionsCell = row.insertCell();
        actionsCell.className = 'button-cell'
        var deleteButton = createDeleteButton(document)
        var saveButton = createSaveButton(document)
        deleteButton.addEventListener('click', function () {
            deleteAction(
                account.id,
                baseApiUrl,
                accessToken
            )
        });
        saveButton.addEventListener('click', function () {
            saveAction(
                account.id,
                baseApiUrl,
                accessToken
            )
        });
        actionsCell.appendChild(deleteButton);
        actionsCell.appendChild(saveButton);
            
        // Populate other cells based on account data
        populateRowCells(
            row,
            account,
            baseApiUrl,
            accessToken
        )
    });
}

function addInputRow(accountList, accounts, baseApiUrl, accessToken) {
    // Initialize a blank row at the end
    var blankRow = accountList.insertRow(accounts.length);

    // Add buttons to the "Actions" column
    var blankActionsCell = blankRow.insertCell();
    blankActionsCell.className = 'button-cell'
    var addButton = createAddButton(document)
    addButton.addEventListener('click', function () {
        addAction(
            baseApiUrl,
            accessToken,
        );
    });
    blankActionsCell.appendChild(addButton);

    // Add empty cells at end of table for adding new account
    populateRowCells(
        blankRow,
        accounts[0],
        baseApiUrl,
        accessToken,
        true
    )
}

// -------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var baseApiUrl = getBaseApiUrl();
    var accessToken = getCookie('access_token');

    if (!accessToken) {
        console.error('Access token not found.');
        return;
    }

    // Add functionality to logout button
    console.log("test");
    var logoutButton = document.getElementById('logout-button');
    console.log(logoutButton); // Check if logoutButton is found
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            logoutAction(baseApiUrl);
        });
    } else {
        console.error('Logout button not found.');
    }

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
        var accountList = document.getElementById('account-list');
    
        // Create header row
        addHeaderRow(accounts[0])
    
        // Add table body rows with db data
        addDataRows(
            accountList,
            accounts,
            baseApiUrl,
            accessToken
        )

        // Add input row at end of table
        addInputRow(
            accountList,
            accounts,
            baseApiUrl,
            accessToken
        )
    }
});
