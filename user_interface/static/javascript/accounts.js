import * as constants from './constants.js';
import { getCurrentAccountKey } from './accountsTableOps.js';
import { getCookie } from './cookie_utils.js';
import { createInputPopup } from './popups.js';
import { createDeleteButton,
        createSaveButton,
        createAddButton,
        deleteAction,
        saveAction,
        addAction
    } from './buttons.js';

// -------------------------------------------------------------------

function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="accounts.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
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
            if (constants.viewableAccountFields.includes(key)) {
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
            for (var key in account) {
                if (constants.viewableAccountFields.includes(key)) {
                    var cell = row.insertCell();
                    cell.textContent = account[key];
                    cell.setAttribute('header', key);
                    if (constants.editableAccountFields.includes(key)) {
                        cell.addEventListener('click', function (clickedCell) {
                            return function () {
                                createInputPopup(
                                    baseApiUrl,
                                    accessToken,
                                    clickedCell,
                                    getCurrentAccountKey(clickedCell, account)
                                );
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
        var addButton = createAddButton(document)
        addButton.addEventListener('click', function () {
            addAction(
                baseApiUrl,
                accessToken,
            );
        });
        blankActionsCell.appendChild(addButton);

        // Add empty cells at end of table for adding new account
        for (var key in accounts[0]) {
            if (constants.viewableAccountFields.includes(key)) {
                var cell = blankRow.insertCell();
                cell.setAttribute('header', key);
                if (constants.editableAccountFields.includes(key)) {
                    cell.addEventListener('click', function (clickedCell) {
                        return function () {
                            createInputPopup(
                                baseApiUrl,
                                accessToken,
                                clickedCell,
                                getCurrentAccountKey(clickedCell, accounts[0])
                            );
                        };
                    }(cell));
                }
            }
        }
    }
});
