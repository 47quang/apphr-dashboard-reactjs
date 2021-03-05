import axios from 'axios';
import querystring from 'query-string';

// const getDefaultHeaders=() => {
//   return {
//     Authorization: 'Bearer ' + localStorage.getItem('token'),
//   };
// }

const client = axios.create({
  baseURL: 'http://54.254.78.127:9093',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => querystring.stringify(params),
  timeout: 20000,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  // Object.assign(config.headers, getDefaultHeaders());
  return config;
});

client.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (e) => {
    throw e;
  }
);

export default client;
