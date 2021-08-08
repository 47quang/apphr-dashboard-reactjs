import axios from 'axios';
import querystring from 'query-string';

const getDefaultHeaders = () => {
  let host = window.location.host;
  let parts = host.split('.');
  let subdomain = parts.length >= 3 ? parts[0] : 'test';
  return {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    subdomain: subdomain,
  };
};

const client = axios.create({
  baseURL: 'https://apphr.me',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => {
    if (params?.filters) {
      let { filters, ...other } = params;
      return 'filters=' + JSON.stringify(filters) + '&' + querystring.stringify(other);
    } else return querystring.stringify(params);
  },
  timeout: 20000,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getDefaultHeaders());
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
  },
);

export default client;
