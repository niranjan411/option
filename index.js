import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import { readFileSync, writeFileSync } from "fs";
import ejs from "ejs";



const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

// Route to display the option chain
app.get("/", async (req, res) => {
    try {
        // Fetch Nifty and Bank Nifty option chains
        const niftyData = await fetchOptionChain("NIFTY");
        const bankNiftyData = await fetchOptionChain("BANKNIFTY");

        // Extract expiry dates
        const niftyExpiryDates = niftyData.records.expiryDates;
        const bankNiftyExpiryDates = bankNiftyData.records.expiryDates;

        // Get the closest expiry date
        const niftyClosestExpiry = niftyExpiryDates[0];
        const bankNiftyClosestExpiry = bankNiftyExpiryDates[0];

        // Fetch option chain data for the closest expiry date
        const niftyOptionChain = await fetchOptionChain("NIFTY", niftyClosestExpiry);
        const bankNiftyOptionChain = await fetchOptionChain("BANKNIFTY", bankNiftyClosestExpiry);

        const indexTemplate = readFileSync("./views/index.ejs", "utf8");
const renderedHtml = ejs.render(indexTemplate);

// Save the output as index.html
writeFileSync("index.html", renderedHtml);
console.log("index.html has been generated.");

        // Render the EJS template with the data
        res.render("index", {
            niftyExpiryDates,
            bankNiftyExpiryDates,
            niftyOptionChain,
            bankNiftyOptionChain,
            niftyClosestExpiry,
            bankNiftyClosestExpiry,
        });
    } catch (error) {
        console.error("Error fetching option chains:", error);
        res.status(500).send("Error fetching option chains");
    }
});

// Route to fetch option chain for a specific expiry date
app.post("/option-chain", async (req, res) => {
    try {
        const { symbol, expiryDate } = req.body;

        // Fetch option chain for the selected expiry date
        const optionChainData = await fetchOptionChain(symbol, expiryDate);

        // Render the EJS template with the data
        res.render("option-chain", { optionChainData, symbol, expiryDate });
    } catch (error) {
        console.error("Error fetching option chain:", error);
        res.status(500).send("Error fetching option chain");
    }
});

// Function to fetch option chain data from NSE API
async function fetchOptionChain(symbol, expiryDate = "") {
    const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "application/json",
    };

    const response = await axios.get(url, { headers });
    return response.data;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


