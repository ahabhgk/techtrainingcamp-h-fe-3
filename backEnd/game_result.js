/* eslint-disable no-undef, import/no-unresolved */

const getRoom = require('./util_getRoom');
const getPlayers = require('./util_getPlayers');

module.exports = async function gameResult({ room }) {
  const { roomQuery } = await getRoom(room);
  const { playersQuery } = await getPlayers(room);

  const roomItem = await roomQuery.findOne();

  if (!roomItem) {
    return {
      status: 401,
      data: {
        msg: 'wrong token or room number',
      },
    };
  }
  if (roomItem.time !== 'gameOver') {
    return {
      status: 400,
      data: {
        msg: 'game is still ongoing',
      },
    };
  }

  // get player info
  const players = await playersQuery.find();

  return {
    status: 200,
    data: {
      players,
      winner: roomItem.winner,
    },
  };
};
