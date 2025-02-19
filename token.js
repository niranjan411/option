const axios = require('axios');

const url = 'https://api.upstox.com/v2/option/chain';
const params = {
    instrument_key: 'NSE_INDEX|Nifty 50',
    expiry_date: '2024-03-28'
};
const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer c4cccdca-bb9a-427b-8777-6da962e29db4'
};

axios.get(url, { params, headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
