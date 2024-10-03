document.addEventListener('DOMContentLoaded', () => {
    const cryptoContainer = document.getElementById('crypto-container');

    const getCryptoPrices = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd');
            const data = await response.json();

            displayPrices(data);
        } catch (error) {
            console.error("Error fetching crypto prices:", error);
        }
    };

    const displayPrices = (data) => {
        const cryptos = [
            { name: "Bitcoin", id: "bitcoin", price: data.bitcoin.usd },
            { name: "Ethereum", id: "ethereum", price: data.ethereum.usd },
            { name: "Dogecoin", id: "dogecoin", price: data.dogecoin.usd }
        ];

        cryptoContainer.innerHTML = '';

        cryptos.forEach(crypto => {
            const cryptoElement = document.createElement('div');
            cryptoElement.classList.add('crypto');
            cryptoElement.innerHTML = `
                <h2>${crypto.name}</h2>
                <p>$${crypto.price}</p>
            `;
            cryptoContainer.appendChild(cryptoElement);
        });
    };

    // Fetch prices every 10 seconds
    setInterval(getCryptoPrices, 10000);

    // Fetch prices on load
    getCryptoPrices();
});
