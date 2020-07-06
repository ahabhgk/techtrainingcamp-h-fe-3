import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://foo.bar.baz/',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => config,
  (err) => { throw err; },
);

instance.interceptors.response.use(
  (response) => response.data,
  (err) => { throw err; },
);

export default function request(config) {
  // return a Promise
  return instance(config);
}
