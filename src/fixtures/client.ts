import axios from 'axios';

export const API_URL = 'http://localhost:4001';

const Client = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    useQueryString: true,
  },
});

export default Client;
