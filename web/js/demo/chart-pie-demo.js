// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("testStatusHistoryPieChart");
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", 'config.json', false ); // false for synchronous request
xmlHttp.send( null );
let config_data = JSON.parse(xmlHttp.responseText);
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Successful", "Partly Successful", "Failed"],
    datasets: [{
      data: config_data.history_pie.data,
      backgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b'],
      hoverBackgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
