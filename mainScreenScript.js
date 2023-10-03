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
            createStockCircles();
            stockInput.value = ""; //Clear input field
        }
    });

    stockInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addStockButton.click(); //Trigger add stock on clicking enter
        }
    });
});

// script.js
const stockContainer = document.getElementById('stock-container');
const stocks = ['AAPL', 'GOOGL', 'AMZN', 'TSLA', 'MSFT']; // Your list of stocks

function createStockCircles() {
    stockContainer.innerHTML = ''; // Clear existing circles

    stocks.forEach(stock => {
        const circle = document.createElement('div');
        circle.classList.add('stock-circle');
        circle.textContent = stock;
        stockContainer.appendChild(circle);
    });
}

function createStockCircles() {
    stockContainer.innerHTML = ''; // Clear existing circles

    const circleSize = 500 * (0.95**stocks.length); // Calculate circle size based on the number of stocks

    stocks.forEach(stock => {
        const circle = document.createElement('div');
        circle.classList.add('stock-circle');
        circle.textContent = stock;
        circle.style.width = `${circleSize}px`; // Apply dynamic size
        circle.style.height = `${circleSize}px`;
        stockContainer.appendChild(circle);
    });
}

createStockCircles(); // Initial creation of circles

// You can add more stocks to the array and call createStockCircles() again to update the display.
