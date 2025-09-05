import * as constants from './constants.js';
import { createDeleteButton, createSaveButton, deleteAction, saveAction } from './buttons.js';

// Fetches account types and accounts, maps type IDs to type_name
export async function fetchData(baseApiUrl, accessToken) {
  try {
    const typesResponse = await fetch(`${baseApiUrl}accounts-api/types`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });
    if (!typesResponse.ok) {
      throw new Error(`Types API error: ${typesResponse.status}`);
    }
    const typeMap = await typesResponse.json();
    console.log('Fetched types:', typeMap); // Debug: Log types

    const accountsResponse = await fetch(`${baseApiUrl}accounts-api/accounts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });
    if (!accountsResponse.ok) {
      throw new Error(`Accounts API error: ${accountsResponse.status}`);
    }
    const accounts = await accountsResponse.json();
    // Map type IDs to type_name for display
    accounts.forEach(account => {
      const typeObj = typeMap.find(t => t.id === account.type);
      account.type_name = typeObj ? typeObj.name : account.type || 'Unknown';
    });
    console.log('Processed accounts:', accounts); // Debug: Log processed data
    return { accounts, typeMap };
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementId('accounts-table').innerHTML = 
      '<p>Error loading accounts or types. Please try again later.</p>';
    return null;
  }
}

// Generates Tabulator column definitions
export function getTableColumns(baseApiUrl, accessToken, typeMap) {
  const typeNames = typeMap.map(t => t.name);
  const columns = [
    {
      title: 'Actions',
      field: 'actions',
      hozAlign: 'center',
      minWidth: 160,
      formatter: cell => {
        const deleteBtn = createDeleteButton();
        const saveBtn = createSaveButton();
        deleteBtn.style.marginRight = '8px';
        const span = document.createElement('span');
        span.appendChild(deleteBtn);
        span.appendChild(saveBtn);
        if (cell.getElement()) {
          setTimeout(() => {
            const style = window.getComputedStyle(cell.getElement());
            console.log('Actions cell rendered, computed width:', style.width);
          }, 0);
        }
        return span;
      },
      cellClick: (e, cell) => {
        const row = cell.getRow();
        const data = row.getData();
        const table = cell.getTable();
        if (e.target.classList.contains('delete-btn')) {
          deleteAction(data.id, baseApiUrl, accessToken, table, row);
        } else if (e.target.classList.contains('save-btn')) {
          saveAction(data, baseApiUrl, accessToken, table, row, typeMap);
        }
      },
    },
    { title: 'ID', field: 'id', editor: false, sorter: 'number', minWidth: 80 },
  ];

  constants.viewableAccountFields.forEach(field => {
    if (field === 'id') return;
    let editorType = false;
    if (constants.editableAccountFields.includes(field)) {
      if (field === 'type_name') {
        editorType = 'list';
      } else if (field === 'description') {
        editorType = 'textarea';
      } else {
        editorType = 'input';
      }
    }
    columns.push({
      title: field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' '),
      field,
      editor: editorType,
      sorter: field.includes('date') ? 'datetime' : 'string',
      sorterParams: field.includes('date') ? {
        format: 'yyyy-MM-dd HH:mm:ss',
        alignEmptyValues: 'top',
      } : undefined,
      headerFilter: !field.includes('date') && field !== 'description' && field !== 'password',
      editorParams: field === 'type_name' ? {
        values: typeNames,
        defaultValue: '',
        autocomplete: true,
        listOnEmpty: true,
        clearable: true,
      } : undefined,
      cellClick: field === 'type_name' ? (e, cell) => {
        console.log('Clicked type_name cell:', cell.getValue(), 'with editorParams:', typeNames);
      } : undefined,
      minWidth: 100,
    });
  });

  console.log('Tabulator columns:', columns);
  return columns;
}