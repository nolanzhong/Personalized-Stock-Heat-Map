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
        if (newStockText !== "") {
            const newStock = document.createElement("li");
            newStock.textContent = newStockText;
            stockList.appendChild(newStock);
            stockInput.value = ""; //Clear input field
        }
    });

    stockInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addStockButton.click(); //Trigger add stock on clicking enter
        }
    });
});