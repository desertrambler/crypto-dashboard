// Fetch crypto data and plot it on the chart
const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
const currency = "usd"; // currency to display prices in
const cryptoIds = ["bitcoin", "ethereum", "litecoin"]; // Add more cryptocurrencies if needed
const params = new URLSearchParams({
    vs_currency: currency,
    ids: cryptoIds.join(",")
});

// Fetch the cryptocurrency prices
async function fetchCryptoData() {
    try {
        const response = await fetch(`${apiUrl}?${params.toString()}`);
        const data = await response.json();
        return data.map(crypto => ({
            name: crypto.name,
            price: crypto.current_price
        }));
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
}

// Plot data using Chart.js
async function plotCryptoChart() {
    const cryptoData = await fetchCryptoData();
    const labels = cryptoData.map(crypto => crypto.name);
    const prices = cryptoData.map(crypto => crypto.price);

    const ctx = document.getElementById('cryptoChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line', // Line chart
        data: {
            labels: labels, // Crypto names
            datasets: [{
                label: `Price in ${currency.toUpperCase()}`,
                data: prices, // Crypto prices
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false // Prices won't start at zero
                }
            }
        }
    });
}

// Initialize the chart
plotCryptoChart();
