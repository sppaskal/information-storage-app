import * as constants from './constants.js';
import { getCookie } from './cookie_utils.js';
import { createEditablePopup } from './popups.js';

function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="accounts.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

function deleteAction(rowIndex, accountId, baseApiUrl, accessToken) {
    // Add confirmation popup
    var confirm_msg = 'Are you sure you want to delete account ID: ' + accountId.toString() + '?'
    var userConfirmed = window.confirm(confirm_msg);

    // If user confirmed, proceed with the deletion
    if (userConfirmed) {
        fetch(`${baseApiUrl}accounts-api/accounts/` + accountId.toString() + '/', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        })
        .then(response => {
            if (response.status === 204) {
                alert('Account ID: ' + accountId.toString() + ' successfully deleted!');
                // Delete the row from the table
                const accountList = document.getElementById('account-list');
                accountList.deleteRow(rowIndex);
            } else {
                alert('Error deleting account ID: ' + accountId.toString());
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error deleting account ID: ' + accountId.toString());
        });
    }
    // If user canceled, do nothing
}

function saveAction(rowIndex, accountId, baseApiUrl, accessToken) {
    // Find the row in the table
    const accountList = document.getElementById('account-list');
    const row = accountList.rows[rowIndex];

    // Create an object to hold the updated account data
    const updatedAccount = {};

    // Iterate through the cells and update the data
    // Start from 1 to skip the "Actions" column
    for (let i = 1; i < row.cells.length; i++) {
        const key = constants.accountFields[i - 1];
        const cell = row.cells[i];

        // If the cell is editable, update the value
        // in the updatedAccount object
        if (constants.editableAccountFields.includes(key)) {
            updatedAccount[key] = cell.textContent.trim();
        }
    }

    // Convert the updated account object to a JSON string
    const updatedAccountJson = JSON.stringify(updatedAccount);

    // Fetch API call with the updated data
    fetch(`${baseApiUrl}accounts-api/accounts/` + accountId.toString() + '/', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: updatedAccountJson,
    })
    .then(response => {
        if (response.status === 200) {
            alert('Account ID: ' + accountId.toString() + ' successfully updated!')
        } else {
            alert('Error updating account ID: ' + accountId.toString());
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('Error updating account ID: ' + accountId.toString())
    });
}

// -------------------------------------------------------------------

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
            actionsCell.className = 'button-cell'

            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            var deleteIcon = document.createElement('img');
            deleteIcon.src = '/static/images/trash.svg';
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener('click', function () {
                deleteAction(index, account.id, baseApiUrl, accessToken)
            });
            actionsCell.appendChild(deleteButton);

            var saveButton = document.createElement('button');
            saveButton.className = 'save-button';
            var saveIcon = document.createElement('img');
            saveIcon.src = '/static/images/save-floppy-disk.svg';
            saveButton.appendChild(saveIcon);
            saveButton.addEventListener('click', function () {
                saveAction(index, account.id, baseApiUrl, accessToken)
            });
            actionsCell.appendChild(saveButton);
                
            // Populate other cells based on account data
            for (var key in account) {
                if (constants.accountFields.includes(key)) {
                    var cell = row.insertCell();
                    cell.textContent = account[key];
                    if (constants.editableAccountFields.includes(key)) {
                        cell.addEventListener('click', function (clickedCell) {
                            return function () {
                                createEditablePopup(clickedCell);
                            };
                        }(cell));
                    }
                }
            }
        });

        // Initialize a blank row at the end
        var blankRow = accountList.insertRow(accounts.length);

        // Add buttons to the "Actions" column
        var blankActionsCell = blankRow.insertCell();
        blankActionsCell.className = 'button-cell'

        var addButton = document.createElement('button');
        addButton.className = 'add-button';
        var addIcon = document.createElement('img');
        addIcon.src = '/static/images/add.svg';
        addButton.appendChild(addIcon);
        addButton.addEventListener('click', function () {
            // addAction(baseApiUrl, accessToken, blankRow);
            alert('Add button pressed')
        });
        blankActionsCell.appendChild(addButton);

        // Add empty cells based on the structure of your accounts
        for (var key in accounts[0]) {
            if (constants.accountFields.includes(key)) {
                var cell = blankRow.insertCell();
                if (constants.editableAccountFields.includes(key)) {
                    cell.contentEditable = true;
                }
            }
        }
    }
});
