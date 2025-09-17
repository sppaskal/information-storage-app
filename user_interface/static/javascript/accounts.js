import { viewableAccountFields } from './constants.js'; 
import { getCookie } from './cookie_utils.js';
import { createAddButton, addAction, logoutAction, reloadKpiAction } from './buttons.js';
import { fetchData, getTableColumns, setupTable } from './accounts_utils.js';
import { initializeChart, generateTypeDistributionChart, updateChart } from './charts.js';

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

  // Initialize Tabulator with a callback for chart setup
  const table = setupTable('accounts-table', getTableColumns(baseApiUrl, accessToken, typeMap), accounts, () => {
    // Generate initial chart data and initialize the chart
    generateTypeDistributionChart(accounts); // Generate data first
    const ctx = document.getElementById('type-distribution-chart').getContext('2d');
    initializeChart(ctx); // Initialize chart after data is available
  });

  if (table) {
    const addButton = createAddButton();
    addButton.addEventListener('click', () => {
      addAction(table, viewableAccountFields);
    });
    const buttonContainer = document.getElementById('button-container');
    if (buttonContainer) {
      buttonContainer.appendChild(addButton);
    } else {
      console.error('Button container not found.');
    }

    // Add event listener for KPI reload button
    const reloadButton = document.getElementById('kpi-reload-button');
    if (reloadButton) {
      reloadButton.addEventListener('click', () => reloadKpiAction(table));
    } else {
      console.error('KPI reload button not found.');
    }
  }
});