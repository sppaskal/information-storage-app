import * as constants from './constants.js';
import { deleteCookies } from './cookie_utils.js';
import { findRowIndexById } from './accounts_utils.js';
import { populateRowCells } from './accounts_utils.js';


export function createDeleteButton(document) {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    var deleteIcon = document.createElement('img');
    deleteIcon.src = '/static/images/trash.svg';
    deleteButton.appendChild(deleteIcon);
    return deleteButton;
}

export function createSaveButton(document) {
    var saveButton = document.createElement('button');
    saveButton.className = 'save-button';
    var saveIcon = document.createElement('img');
    saveIcon.src = '/static/images/save-floppy-disk.svg';
    saveButton.appendChild(saveIcon);
    return saveButton;
}

export function createAddButton(document) {
    var addButton = document.createElement('button');
    addButton.className = 'add-button';
    var addIcon = document.createElement('img');
    addIcon.src = '/static/images/add.svg';
    addButton.appendChild(addIcon);
    return addButton
}

// -------------------------------------------------------------------

export function logoutAction(baseApiUrl) {
    deleteCookies(['access_token', 'refresh_token']);
    window.location.href = `${baseApiUrl}user-interface/login/`;
}

export function deleteAction(accountId, baseApiUrl, accessToken) {
    // Add confirmation popup
    var confirm_msg = 'Are you sure you want to delete account ID: ' + accountId + '?'
    var userConfirmed = window.confirm(confirm_msg);

    // If user confirmed, proceed with the deletion
    if (userConfirmed) {
        fetch(`${baseApiUrl}accounts-api/accounts/` + accountId + '/', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        })
        .then(response => {
            if (response.status === 204) {
                alert('Account ID: ' + accountId + ' successfully deleted!');
                // Delete the row from the table
                const accountList = document.getElementById('account-list');
                accountList.deleteRow(findRowIndexById(accountList, accountId));
            } else {
                alert('Error deleting account ID: ' + accountId);
            }
        })
        .catch(error => {
            console.error('Error deleting account:', error);
            alert('Error deleting account ID: ' + accountId);
        });
    }
    // If user canceled, do nothing
}

export function saveAction(accountId, baseApiUrl, accessToken) {
    // Find the row in the table
    const accountList = document.getElementById('account-list');
    const row = accountList.rows[findRowIndexById(accountList, accountId)];

    // Create an object to hold the updated account data
    const updatedAccountJson = createAccountJson(row)

    // Fetch API call with the updated data
    fetch(`${baseApiUrl}accounts-api/accounts/` + accountId + '/', {
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
            alert('Account ID: ' + accountId + ' successfully updated!')
        } else {
            alert('Error updating account ID: ' + accountId);
        }
    })
    .catch(error => {
        console.error('Error updating account:', error);
        alert('Error updating account ID: ' + accountId)
    });
}

export function addAction(baseApiUrl, accessToken) {
    // Find the row in the table
    const accountList = document.getElementById('account-list');
    const row = accountList.rows[accountList.rows.length - 1];
    const newAccountJson = createAccountJson(row)

    // Fetch API call with the new data
    fetch(`${baseApiUrl}accounts-api/accounts/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: newAccountJson,
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Error adding account');
        }
    })
    .then(data => {
        const accountId = data.account.id;
        alert('Account ID: ' + accountId + ' successfully added!');
        displayNewAccount(
            data,
            baseApiUrl,
            accessToken
        )
        clearLastRow()
    })
    .catch(error => {
        console.error('Error adding account:', error);
        alert('Error adding account')
    });
}

// -------------------------------------------------------------------

function createAccountJson(row) {

    const accountData = {};

    // Iterate through the cells and update the data
    // Start from 1 to skip the "Actions" column
    for (let i = 1; i < row.cells.length; i++) {
        const cell = row.cells[i];
        const key = cell.getAttribute('header')

        // If the cell is editable, add the value
        // in the accountData object
        if (constants.editableAccountFields.includes(key)) {
            if (key == 'type_name') { // Special case for type_name
                if (cell.getAttribute('data-id')) {
                    accountData['type'] = cell.getAttribute('data-id');
                }
            }
            else { // Non special case
                accountData[key] = cell.textContent.trim();
            }
        }
    }

    // Convert the updated account object to a JSON string
    return JSON.stringify(accountData);
}

function displayNewAccount(data, baseApiUrl, accessToken) {
    const accountList = document.getElementById('account-list');
    const account = data.account;

    // Create a new row for the added account
    const newRow = accountList.insertRow(accountList.rows.length - 1);

    // Add buttons to the "Actions" column
    const actionsCell = newRow.insertCell();
    actionsCell.className = 'button-cell';
    const deleteButton = createDeleteButton(document);
    const saveButton = createSaveButton(document);
    deleteButton.addEventListener('click', function () {
        deleteAction(
            account.id,
            baseApiUrl,
            accessToken
        );
    });
    saveButton.addEventListener('click', function () {
        saveAction(
            account.id,
            baseApiUrl,
            accessToken
        );
    });
    actionsCell.appendChild(deleteButton);
    actionsCell.appendChild(saveButton);

    // Populate other cells based on account data
    populateRowCells(
        newRow,
        account,
        baseApiUrl,
        accessToken
    )
}

function clearLastRow() {
    const accountList = document.getElementById('account-list');
    const lastRowIndex = accountList.rows.length - 1;

    if (lastRowIndex >= 0) {
        const lastRow = accountList.rows[lastRowIndex];

        // Start from 1 to skip actions column
        for (let i = 1; i < lastRow.cells.length; i++) {
            const cell = lastRow.cells[i];
            cell.textContent = '';
        }
    }
}