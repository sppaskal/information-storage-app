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

  // Initialize Tabulator with a callback for chart setup
  const table = setupTable('accounts-table', getTableColumns(baseApiUrl, accessToken, typeMap), accounts, () => {
    // Initialize the pie chart after table is built
    const ctx = document.getElementById('type-distribution-chart').getContext('2d');
    if (window.typeDistributionData && window.typeDistributionData.labels) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: window.typeDistributionData.labels,
          datasets: [{
            data: window.typeDistributionData.values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: { size: 14 },
                color: '#333'
              }
            },
            title: {
              display: true,
              text: 'Account Type Distribution',
              font: { size: 18 },
              color: '#24292e'
            }
          }
        }
      });
    } else {
      console.warn('Type distribution data not available for chart.');
    }
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
  }
});