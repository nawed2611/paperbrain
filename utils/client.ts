import axios from 'axios';
import Cookies from 'js-cookie';

export const client = axios.create({
  // baseURL: 'https://paperbrain.onrender.com/',
  baseURL: 'https://web-production-f9ae.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('apiKey')}`,
  },
});
