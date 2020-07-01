import { request } from "./request";

export function getStatus(someParam) {
  // 获得当前游戏信息: 是否死亡, 白天/黑夜, 是否能发动技能, 自己的身份
  return request({
    url: `somePath/${someParam}`
    // 默认请求方法是 get
  });
}

export function usePower(param, someData) {
  // 发动技能, 传递token, 发动技能的指向给后端(如狼人选择杀谁, 女巫用什么药毒谁)
  return request({
    url: `anotherPath/foo?${param}`,
    data: someData,
    method: 'post',
    headers: {
      "Content-Type": "application/json;"
    }
  });
}