import axios from 'axios';

const request = axios.create({
  baseURL: 'https://afbx35.fn.thelarkcloud.com',
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => config,
  (err) => { throw err; },
);

request.interceptors.response.use(
  (response) => response.data,
  (err) => { throw err; },
);

export default request;
