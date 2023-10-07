document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    const menuBars = document.querySelectorAll(".menu-bar"); // Use querySelectorAll to select all elements

    menuButton.addEventListener("click", function() {
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0";
            menuBars.forEach(function(menuBar) {
                menuBar.style.backgroundColor = "#333";
            });
        } else {
            sidebar.style.width = "250px";
            menuBars.forEach(function(menuBar) {
                menuBar.style.backgroundColor = "#F0FFFF";
            });
        }
    });

    const stockInput = document.getElementById("searchStock");
    const addStockButton = document.getElementById("submit-button");
    const stockList = document.getElementById("stockList");

    addStockButton.addEventListener("click", function() {
        const newStockText = stockInput.value.trim();
        if (newStockText !== "" && !stocks.includes(newStockText)) {
            const newStock = document.createElement("li");
            newStock.textContent = newStockText;
            stockList.appendChild(newStock);
            stocks.push(newStockText);
            getStockPercentages(stocks);
            stockInput.value = ""; //Clear input field
            console.log(stocks);
            console.log(stockPercentages);
        }
    });

    stockInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addStockButton.click(); //Trigger add stock on clicking enter
        }
    });

    
    console.log(stocks);
    getStockPercentages(stocks); // Initial creation of circles
    
});

// script.js
const stockContainer = document.getElementById('stock-container');
const stocks = ['AAPL', 'GOOGL', 'AMZN', 'TSLA', 'MSFT']; // Your list of stocks
var stockPercentages = []

function createStockCircles() {
    stockContainer.innerHTML = ''; // Clear existing circles

    const circleSize = 500 * (0.95**stocks.length); // Calculate circle size based on the number of stocks

    for (let i = 0; i < stocks.length; i++) {
        const stock = stocks[i];
        const percentage = stockPercentages[i]; // Get the corresponding percentage
    
        const circle = document.createElement('div');
        circle.classList.add('stock-circle');
        circle.textContent = `${stock} (${percentage}%)`; // Include the percentage in the text content
        circle.style.width = `${circleSize}px`; // Apply dynamic size
        circle.style.height = `${circleSize}px`;
        stockContainer.appendChild(circle);
      }
}

// Replace 'YOUR_API_KEY' with your actual Twelve Data API key
const apiKey = 'ckflhl1r01qovk256600ckflhl1r01qovk25660g';

function fetchStockData(symbol) {
    const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const stockPriceChange = (((data.c - data.pc) / data.pc) * 100).toFixed(2);
        return stockPriceChange;
      })
      .catch(error => {
        console.error(`Fetch error for ${symbol}:`, error);
        return null;
      });
  }
  
function getStockPercentages(lstStocks) {
  stockPercentages = []
  const promises = lstStocks.map(stock => fetchStockData(stock));

  Promise.all(promises)
    .then(results => {
      stockPercentages.push(...results); // Push the results into stockPercentages
      createStockCircles();
    })
    .catch(error => {
      console.error('Error fetching stock data:', error);
    });
}