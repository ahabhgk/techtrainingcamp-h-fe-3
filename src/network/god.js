import request from './request';

export const getStatus = (room, token) => request.get(`/god_allStatus?room=${room}&token=${token}`);
export const setStatus = (name, action, room, token) => request.get(`/god_setStatus?name=${name}&status=${action}&room=${room}&token=${token}`);
export const endGame = (room, token, winner) => request.get(`god_endGame?room=${room}&token=${token}&winner=${winner}`);
