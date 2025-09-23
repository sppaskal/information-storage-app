import { deleteCookies } from './cookie_utils.js';
import { showSuccessPopup, showFailurePopup, showEditSuccessPopup, showReminderPopup } from './popups.js';
import { generateTypeDistributionChart, updateChart } from './charts.js';

// GENERIC BUTTON ACTIONS AND CREATORS

// Handles logout action
export function logoutAction(baseApiUrl) {
    deleteCookies(['access_token', 'refresh_token']);
    window.location.href = `${baseApiUrl}user-interface/login/`;
}

// ACCOUNT BUTTON ACTIONS AND CREATORS

// Creates a Delete button for a table row
export function createDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    const deleteIcon = document.createElement('img');
    deleteIcon.src = '/static/images/trash.svg';
    deleteIcon.alt = 'Delete';
    deleteBtn.appendChild(deleteIcon);
    return deleteBtn;
}

// Creates a Save button for a table row
export function createSaveButton() {
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    const saveIcon = document.createElement('img');
    saveIcon.src = '/static/images/save-floppy-disk.svg';
    saveIcon.alt = 'Save';
    saveBtn.appendChild(saveIcon);
    return saveBtn;
}

// Creates an Add New Account button
export function createAddButton() {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add New Account';
    addButton.className = 'add-btn';

    // Add hover event listeners to show/hide reminder popup
    addButton.addEventListener('mouseenter', () => {
        showReminderPopup(addButton);
    });
    addButton.addEventListener('mouseleave', () => {
        const popup = document.querySelector('.reminder-popup');
        if (popup) {
            popup.classList.remove('show');
            popup.remove()
        }
    });

    return addButton;
}

// Creates a Reload KPI button
export function createReloadButton() {
    const reloadBtn = document.createElement('button');
    reloadBtn.className = 'kpi-reload-btn';
    const reloadIcon = document.createElement('img');
    reloadIcon.src = '/static/images/reload.svg';
    reloadIcon.alt = 'Reload KPIs';
    reloadBtn.appendChild(reloadIcon);
    return reloadBtn;
}

// Handles the Delete action for a row
export function deleteAction(id, baseApiUrl, accessToken, table, row, updateTotalAccounts) {
    if (id) {
        fetch(`${baseApiUrl}accounts-api/accounts/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                const currentTotal = parseInt(document.getElementById('total-accounts').textContent) || 0;
                row.delete(); // Remove row from Tabulator
                document.getElementById('total-accounts').textContent = currentTotal - 1;
            } else {
                console.error('Delete failed');
            }
        })
        .catch(error => console.error('Error deleting account:', error));
    } else {
        row.delete(); // For new rows without id, remove locally
    }
}

// Handles the Save action for a row (POST for new, PUT for existing)
export function saveAction(data, baseApiUrl, accessToken, table, row, typeMap, updateTotalAccounts) {
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id ? `${baseApiUrl}accounts-api/accounts/${data.id}/` : `${baseApiUrl}accounts-api/accounts/`;
    // Map type_name to type ID for API payload
    const payload = { ...data };
    if (typeMap && data.type_name) {
        const typeObj = typeMap.find(t => t.name === data.type_name);
        payload.type = typeObj ? typeObj.id : null;
        delete payload.type_name;
    }
    fetch(url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Save failed');
        }
        return response.json();
    })
    .then(updatedData => {
        // Map type ID back to type_name for display
        if (typeMap && updatedData.type) {
            const typeObj = typeMap.find(t => t.id === updatedData.type);
            updatedData.type_name = typeObj ? typeObj.name : updatedData.type;
        }
        row.update(updatedData); // Update row with new data including id
        // Show popup based on the HTTP method
        if (method === 'POST') {
            const currentTotal = parseInt(document.getElementById('total-accounts').textContent) || 0;
            const addButton = document.querySelector('.add-btn');
            if (addButton) {
                showSuccessPopup(addButton);
                document.getElementById('total-accounts').textContent = currentTotal + 1;
            }
        } else if (method === 'PUT') {
            const saveButton = row.getCell('actions').getElement().querySelector('.save-btn');
            if (saveButton) {
                showEditSuccessPopup(saveButton);
            }
        }
    })
    .catch(error => {
        console.error('Error saving account:', error);
        if (method === 'POST') {
            const addButton = document.querySelector('.add-btn');
            if (addButton) {
                showFailurePopup(addButton);
            }
        } else if (method === 'PUT') {
            const saveButton = row.getCell('actions').getElement().querySelector('.save-btn');
            if (saveButton) {
                showFailurePopup(saveButton);
            }
        }
    });
}

// Handles the Add action (adds a blank row to the table)
export function addAction(table, viewableAccountFields) {
    const newRowData = { id: null };
    viewableAccountFields.forEach(field => {
        newRowData[field] = (field === 'type' ? null : '');
    });
    table.addRow(newRowData);
}

// Handles the Reload KPI action
export function reloadKpiAction(table) {
    generateTypeDistributionChart(table.getData());
    updateChart();
}
