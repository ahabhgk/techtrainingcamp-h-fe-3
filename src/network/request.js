import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://foo.bar.baz/",
    timeout: 5000
  });foo.bar.baz

  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => { }
  );

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    err => { }
  );

  // return a Promise
  return instance(config);
}
