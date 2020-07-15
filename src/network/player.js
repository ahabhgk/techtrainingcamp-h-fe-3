import request from './request';

export function getStatus(someParam) {
  // 获得当前游戏信息: 是否死亡, 白天/黑夜 , 自己的身份
  // return request({
  //   url: `https://afbx35.fn.thelarkcloud.com/player_allStatus/${someParam}`,
  //   // 默认请求方法是 get
  // });
  let str = '';
  Object.keys(someParam).forEach((key) => {
    str += `${key}=${someParam[key]}&`;
  });
  str = str.slice(0, str.length - 1);
  console.log(`https://afbx35.fn.thelarkcloud.com/player_allStatus?${str}`);
  return request({
    url: `https://afbx35.fn.thelarkcloud.com/player_allStatus?${str}`,
  });
}

export function usePower(param, someData) {
  // 发动技能, 传递token, 发动技能的指向给后端(如狼人选择杀谁, 女巫用什么药毒谁)
  return request({
    url: `anotherPath/foo?${param}`,
    data: someData,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;',
    },
  });
}

export const login = (room, name) => request.get(`/player_start?room=${room}&name=${name}`);
export const getResult = (room) => request.get(`/game_allAtatus??room=${room}`);
