import { request } from "./request";

export function endGame(someParam) {
  return request({
    url: `somePath/${someParam}`
    // 默认请求方法是 get
  });
}

export function getStatus(param, someData) {
  // 查询当前游戏的结果(谁死了, 怎么死的, 是否睁眼)
  return request({
    url: `anotherPath/foo?${param}`,
    data: someData,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    }
  });
}