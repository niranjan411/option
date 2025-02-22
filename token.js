import axios from 'axios';
import { stringify } from 'qs';
let data = stringify({
  'code': 'uiA0gI',
  'client_id': '600862cc-b5a0-40dd-8d78-a4daf651410e',
  'client_secret': 'bu77awuxgf',
  'redirect_uri': 'https://niranjan411.github.io/option/',
  'grant_type': 'authorization_code' 
});
let config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://api.upstox.com/v2/login/authorization/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Accept': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});