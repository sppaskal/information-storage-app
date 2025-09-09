import { viewableAccountFields } from './constants.js'; 
import { getCookie } from './cookie_utils.js';
import { createAddButton, addAction, logoutAction } from './buttons.js';
import { fetchData, getTableColumns, setupTable } from './accounts_utils.js';

// Gets base API URL from script tag
function getBaseApiUrl() {
  const scriptTag = document.querySelector('script[src*="accounts.js"]');
  return scriptTag ? scriptTag.getAttribute('base-api-url') : null;
}

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
  // Verify Luxon is loaded
  if (typeof luxon === 'undefined') {
    console.error('Luxon.js is not loaded. Datetime sorting will fail.');
    return;
  }
  console.log('Luxon.js loaded:', luxon.DateTime);

  const baseApiUrl = getBaseApiUrl();
  const accessToken = getCookie('access_token');

  if (!accessToken) {
    console.error('Access token not found.');
    return;
  }

  // Add logout button functionality
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => logoutAction(baseApiUrl));
  } else {
    console.error('Logout button not found.');
  }

  // Fetch data
  const data = await fetchData(baseApiUrl, accessToken);
  if (!data) return;

  const { accounts, typeMap } = data;
  console.log('Fetched accounts:', accounts); // Debug log

  // Initialize Tabulator using setupTable
  const table = setupTable('accounts-table', getTableColumns(baseApiUrl, accessToken, typeMap), accounts);

  // Add "Add New" button
  const addButton = createAddButton();
  addButton.addEventListener('click', () => {
    addAction(table, viewableAccountFields);
  });
  document.body.appendChild(addButton);
});