/* eslint-disable no-undef, import/no-unresolved */

const getRoom = require('./util_getRoom');
const getPlayers = require('./util_getPlayers');

module.exports = async function playerAllStatus({ room, token }) {
  const { roomQuery } = await getRoom(room);
  const { playersQuery, PlayerTable } = await getPlayers(room);

  const curPlayerItem = await PlayerTable
    .where({ token })
    .findOne();

  if (!curPlayerItem || !token) {
    return {
      status: 401,
      data: {
        msg: 'wrong token',
      },
    };
  }

  // get player info
  let players = await playersQuery.find();
  players = players.map((it) => ({
    name: it.name,
    status: it.status,
    isSheriff: it.isSheriff,
  }));

  // get room info
  const roomItem = await roomQuery.findOne();

  return {
    status: 200,
    data: {
      players,
      self: {
        name: curPlayerItem.name,
        status: curPlayerItem.status,
        isSheriff: curPlayerItem.isSheriff,
        role: curPlayerItem.role,
      },
      time: roomItem.time,
      day: roomItem.day,
    },
  };
};
