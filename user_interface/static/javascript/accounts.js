import * as constants from './constants.js';
import { getCookie } from './cookie_utils.js';
import {
    createDeleteButton,
    createSaveButton,
    createAddButton,
    deleteAction,
    saveAction,
    addAction,
    logoutAction
} from './buttons.js';

// -------------------------------------------------------------------

function getBaseApiUrl() {
    const scriptTag = document.querySelector('script[src*="accounts.js"]');
    return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

// -------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Verify Luxon is loaded
    if (typeof luxon === 'undefined') {
        console.error('Luxon.js is not loaded. Datetime sorting will fail.');
    } else {
        console.log('Luxon.js loaded:', luxon.DateTime);
    }

    const baseApiUrl = getBaseApiUrl();
    const accessToken = getCookie('access_token');

    if (!accessToken) {
        console.error('Access token not found.');
        return;
    }

    // Add functionality to logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            logoutAction(baseApiUrl);
        });
    } else {
        console.error('Logout button not found.');
    }

    // Fetch account types
    let typeMap = [];
    fetch(`${baseApiUrl}accounts-api/types`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Types API error: ${response.status}`);
        }
        return response.json();
    })
    .then(types => {
        console.log('Fetched types:', types);  // Debug: Log types
        typeMap = types;  // Store types for dropdown and mapping
        // Fetch account data
        return fetch(`${baseApiUrl}accounts-api/accounts`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Accounts API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Map type IDs to type_name for display
        data.forEach(account => {
            const typeObj = typeMap.find(t => t.id === account.type);
            account.type_name = typeObj ? typeObj.name : account.type || 'Unknown';
        });
        console.log('Processed accounts:', data);  // Debug: Log processed data
        displayAccountList(data, baseApiUrl, accessToken, typeMap);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('accounts-table').innerHTML = '<p>Error loading accounts or types. Please try again later.</p>';
    });

    // ---------------------------------------------------------------

    function displayAccountList(accounts, baseApiUrl, accessToken, typeMap) {
        // Debug: Log type names for dropdown
        const typeNames = typeMap.map(t => t.name);
        console.log('Type names for dropdown:', typeNames);

        // Define columns based on constants.viewableAccountFields
        const columns = [
            {
                title: "Actions",
                field: "actions",
                hozAlign: "center",
                formatter: function(cell) {
                    const deleteBtn = createDeleteButton();
                    const saveBtn = createSaveButton();
                    const div = document.createElement('div');
                    div.appendChild(deleteBtn);
                    div.appendChild(saveBtn);
                    return div;
                },
                cellClick: function(e, cell) {
                    const row = cell.getRow();
                    const data = row.getData();
                    const table = cell.getTable();
                    if (e.target.classList.contains('delete-btn')) {
                        deleteAction(data.id, baseApiUrl, accessToken, table, row);
                    } else if (e.target.classList.contains('save-btn')) {
                        saveAction(data, baseApiUrl, accessToken, table, row, typeMap);
                    }
                }
            },
            { title: "ID", field: "id", editor: false, sorter: "number" }  // Not editable
        ];

        // Add columns based on viewableAccountFields, editable only if in editableAccountFields
        constants.viewableAccountFields.forEach(field => {
            if (field === 'id') return;  // Skip id (already added)
            let editorType = false;  // Default to non-editable
            if (constants.editableAccountFields.includes(field)) {
                if (field === 'type_name') {
                    editorType = 'list';  // Use list editor for dropdown
                } else if (field === 'description') {
                    editorType = 'textarea';
                } else {
                    editorType = 'input';
                }
            }
            columns.push({
                title: field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' '),
                field: field,
                editor: editorType,
                sorter: field.includes('date') ? 'datetime' : 'string',
                sorterParams: field.includes('date') ? {
                    format: 'yyyy-MM-dd HH:mm:ss',  // Luxon format for your dates
                    alignEmptyValues: 'top'  // Place empty dates at top
                } : undefined,
                headerFilter: !field.includes('date') && field !== 'description' && field !== 'password',
                editorParams: field === 'type_name' ? {
                    values: typeNames,  // Simple array of strings
                    defaultValue: '',
                    autocomplete: true,  // Enable type-ahead
                    listOnEmpty: true,  // Show dropdown for empty cells
                    clearable: true  // Allow clearing selection
                } : undefined,
                cellClick: field === 'type_name' ? function(e, cell) {
                    console.log('Clicked type_name cell:', cell.getValue(), 'with editorParams:', typeNames);
                } : undefined
            });
        });

        console.log('Tabulator columns:', columns);  // Debug: Log column configuration

        // Initialize Tabulator
        const table = new Tabulator("#accounts-table", {
            data: accounts,  // Load fetched data
            layout: "fitColumns",  // Responsive layout
            pagination: "local",  // Client-side pagination
            paginationSize: 10,  // 10 rows per page
            movableColumns: true,  // Drag/drop columns
            columns: columns,
            footerElement: "<div>Total Accounts: <span id='total-accounts'></span></div>",
            dataLoaded: function(data) {
                document.getElementById('total-accounts').innerText = data.length;
            }
        });

        // Add "Add New" button outside the table
        const addButton = createAddButton();
        addButton.addEventListener('click', function () {
            addAction(table, constants.viewableAccountFields);
        });
        document.body.appendChild(addButton);  // Or insert in a specific location
    }
});