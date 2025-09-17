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
    console.log('Fetched types:', typeMap);

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
    const accountsData = await accountsResponse.json();
    console.log('API response:', accountsData);
    const accounts = Array.isArray(accountsData.accounts) ? accountsData.accounts : accountsData;
    console.log('Processed accounts before mapping:', accounts);
    accounts.forEach(account => {
      const typeObj = typeMap.find(t => t.id === account.type);
      account.type_name = typeObj ? typeObj.name : account.type || 'Unknown';
    });
    console.log('Processed accounts:', accounts);
    return { accounts, typeMap };
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('accounts-table').innerHTML = 
      '<p>Error loading accounts or types. Please try again later.</p>';
    return null;
  }
}

// Generate chart data for type distribution (exported for reload button)
export function generateTypeDistributionChart(data) {
  const typeCounts = data.reduce((acc, row) => {
    acc[row.type_name] = (acc[row.type_name] || 0) + 1;
    return acc;
  }, {});
  const labels = Object.keys(typeCounts);
  const values = Object.values(typeCounts);

  if (labels.length === 0 || values.every(v => v === 0)) {
    console.warn('No valid type distribution data available');
    return;
  }

  window.typeDistributionData = { labels, values }; // Expose for accounts.js
}

// Generates Tabulator column definitions
export function getTableColumns(baseApiUrl, accessToken, typeMap) {
  const typeNames = typeMap.map(t => t.name);
  if (typeNames.length === 0) {
    console.warn('No type names available for type_name column');
  }
  const columns = [
    {
      title: 'Actions',
      field: 'actions',
      hozAlign: 'center',
      minWidth: 90,
      maxWidth: 120,
      formatter: cell => {
        const deleteBtn = createDeleteButton();
        const saveBtn = createSaveButton();
        deleteBtn.style.marginRight = '8px';
        const span = document.createElement('span');
        span.style.display = 'inline-flex';
        span.style.alignItems = 'center';
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
        if (e.target.closest('.delete-btn')) {
          deleteAction(data.id, baseApiUrl, accessToken, table, row, table.updateTotalAccounts);
        } else if (e.target.closest('.save-btn')) {
          saveAction(data, baseApiUrl, accessToken, table, row, typeMap, table.updateTotalAccounts);
        }
      },
    },
  ];

  constants.viewableAccountFields.forEach(field => {
    let editorType = false;
    if (constants.editableAccountFields.includes(field)) {
      if (field === 'type_name') {
        editorType = 'list';
      } else if (field === 'description') {
        editorType = createDescriptionEditor;
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
        alignEmptyValues: 'top'
      } : undefined,
      headerFilter: !field.includes('date') && field !== 'description' && field !== 'password',
      editorParams: field === 'type_name' ? {
        values: typeNames.length > 0 ? typeNames : ['Unknown'],
        defaultValue: typeNames.length > 0 ? typeNames[0] : 'Unknown',
        autocomplete: true,
        listOnEmpty: true,
        clearable: true,
      } : undefined,
      cellClick: field === 'description' ? (e, cell) => {
        if (cell.getColumn().getDefinition().editor) {
          cell.edit(true); // Force edit mode on click
        }
      } : (field === 'type_name' ? (e, cell) => {
        console.log('Clicked type_name cell:', cell.getValue(), 'with editorParams:', typeNames);
      } : undefined),
      minWidth: 100,
      maxWidth: field === 'description' ? 300 : 200,
    });
  });

  console.log('Tabulator columns:', columns);
  return columns;
}

// Configures and initializes the Tabulator table
export function setupTable(tableElementId, columns, data, onTableBuilt) {
  console.log('Setting up table with element ID:', tableElementId, 'and data:', data);

  const table = new Tabulator(`#${tableElementId}`, {
    data: data,
    columns: columns,
    layout: 'fitColumns',
    resizableColumns: false,
    height: 'auto',
    pagination: 'local',
    paginationSize: 10,
    footerElement: '<div class="tabulator-footer">Total Accounts: <span id="total-accounts"></span></div>',
  });

  if (!table) {
    console.error('Tabulator table initialization failed');
    return null;
  }

  // Store the updateTotalAccounts function on the table object
  table.updateTotalAccounts = function() {
    console.log('updateTotalAccounts called');
    const savedRows = this.getData().filter(row => row.id && row.id !== null);
    const total = savedRows.length;
    const totalElement = document.getElementById('total-accounts');
    if (totalElement) {
      totalElement.textContent = total || '0';
      console.log('Updated total accounts:', total);
    } else {
      console.error('Total element not found:', totalElement);
    }
  };

  // Set initial total and trigger onTableBuilt callback
  table.on('tableBuilt', () => {
    console.log('Table built event fired');
    table.updateTotalAccounts();
    generateTypeDistributionChart(table.getData()); // Use table explicitly
    if (typeof onTableBuilt === 'function') {
      onTableBuilt();
    }
  });

  // Generate chart data for type distribution
  function generateTypeDistributionChart(data) {
    const typeCounts = data.reduce((acc, row) => {
      acc[row.type_name] = (acc[row.type_name] || 0) + 1;
      return acc;
    }, {});
    const labels = Object.keys(typeCounts);
    const values = Object.values(typeCounts);

    if (labels.length === 0 || values.every(v => v === 0)) {
      console.warn('No valid type distribution data available');
      return;
    }

    window.typeDistributionData = { labels, values }; // Expose for accounts.js
  }

  return table;
}

// Custom editor function for the description column to maintain scroll position
function createDescriptionEditor(cell, onRendered, success, cancel, editorParams) {
  // Create a textarea element with predefined styles for editing
  const textarea = document.createElement('textarea');
  textarea.style.width = '100%';
  textarea.style.height = '100px';
  textarea.style.maxHeight = '200px';
  textarea.style.resize = 'vertical';
  textarea.style.boxSizing = 'border-box';
  textarea.style.padding = '5px';

  // Set the initial value from the cell
  const value = cell.getValue() || '';
  textarea.value = value;

  // Calculate the initial scroll position for long text
  let scrollTop = 0;
  if (value.length > 0) {
    const tempDiv = document.createElement('div');
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.whiteSpace = 'pre-wrap';
    tempDiv.style.wordWrap = 'break-word';
    tempDiv.style.width = '100%';
    tempDiv.style.padding = '5px';
    tempDiv.textContent = value;
    document.body.appendChild(tempDiv);
    const height = tempDiv.scrollHeight;
    document.body.removeChild(tempDiv);
    scrollTop = Math.max(0, height - 100); // Adjust based on textarea height
  }

  // Render the textarea and set the scroll position
  onRendered(() => {
    textarea.focus();
    textarea.scrollTop = scrollTop; // Restore scroll position to match content
  });

  // Handle saving the edited value
  function successFunc() {
    success(textarea.value);
  }

  textarea.addEventListener('blur', successFunc);
  textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      successFunc();
      cell.getRow().getTable().deselectRow();
    }
  });

  return textarea;
}