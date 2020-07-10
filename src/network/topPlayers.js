import request from './request';

export default function PointsRanking() {
  return request({
    url: 'https://afbx35.fn.thelarkcloud.com/game_topPlayers',
    // 默认请求方法是 get
  });
}
