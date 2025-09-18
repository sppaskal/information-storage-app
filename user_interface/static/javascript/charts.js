// Initialize the pie chart
export function initializeChart(ctx) {
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
            font: { size: 18, weight: 'normal' },
            color: '#24292e'
          }
        }
      }
    });
  } else {
    console.warn('Type distribution data not available for chart.');
  }
}

// Generate chart data for type distribution
export function generateTypeDistributionChart(data) {
  // Filter out rows without an id (unsaved rows)
  const savedData = data.filter(row => row.id != null && row.id !== undefined);
  const typeCounts = savedData.reduce((acc, row) => {
    acc[row.type_name] = (acc[row.type_name] || 0) + 1;
    return acc;
  }, {});
  const labels = Object.keys(typeCounts);
  const values = Object.values(typeCounts);

  if (labels.length === 0 || values.every(v => v === 0)) {
    console.warn('No valid type distribution data available');
    return;
  }

  window.typeDistributionData = { labels, values }; // Expose for global access
}

// Update the chart with new data
export function updateChart() {
  const chart = Chart.getChart('type-distribution-chart');
  if (chart && window.typeDistributionData) {
    chart.data.labels = window.typeDistributionData.labels;
    chart.data.datasets[0].data = window.typeDistributionData.values;
    chart.update(); // Enable animations by default
  } else {
    console.warn('Chart not found or data unavailable for reload');
  }
}