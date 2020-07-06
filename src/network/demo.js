import request from './request';

export function someMethod(someParam) {
  return request({
    url: `somePath/${someParam}`,
    // 默认请求方法是 get
  });
}

export function anotherMethod(param, someData) {
  return request({
    url: `anotherPath/foo?${param}`,
    data: someData,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;',
    },
  });
}
