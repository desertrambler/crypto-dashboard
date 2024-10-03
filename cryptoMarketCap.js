// cryptoMarketCap.js

async function fetchCryptoData() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const coins = ['bitcoin', 'ethereum', 'litecoin'];
    const url = `${apiUrl}?vs_currency=usd&ids=${coins.join(',')}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.map(coin => ({
            name: coin.name,
            market_cap: coin.market_cap
        }));
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return [];
    }
}

async function createBarChart() {
    const data = await fetchCryptoData();

    const svg = d3.select("svg");
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.market_cap)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, height])
        .padding(0.1);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis-label");

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5, "~s"))
        .attr("class", "axis-label");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.market_cap))
        .attr("height", y.bandwidth());

    g.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.market_cap) + 5)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", ".35em")
        .text(d => d3.format("$.2s")(d.market_cap));
}

// Run the function to create the bar chart
createBarChart();
