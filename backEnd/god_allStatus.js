/* eslint-disable no-undef, import/no-unresolved */

const getRoom = require('./util_getRoom');
const getPlayers = require('./util_getPlayers');

module.exports = async function godAllStatus({ room, token }) {
  const { roomQuery } = await getRoom(room);
  const { playersQuery } = await getPlayers(room);

  const roomItem = await roomQuery
    .where({ godToken: token })
    .findOne();

  if (!roomItem) {
    return {
      status: 401,
      data: {
        msg: 'wrong token or room number',
      },
    };
  }

  // get player info
  let players = await playersQuery.find();

  players = players.map((it) => ({
    name: it.name,
    status: it.status,
    isSheriff: it.isSheriff,
    role: it.role,
    killedBy: it.killedBy,
    killedAt: it.killedAt,
  }));

  return {
    status: 200,
    data: {
      players,
      time: roomItem.time,
      day: roomItem.day,
    },
  };
};
