/* eslint-disable no-undef */
module.exports = async function gameAllStatus({ room }) {
  const roomID = room * 1;
  // get baseline time
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // get tables
  const RoomTable = larkcloud.db.table('rooms');
  const PlayerTable = larkcloud.db.table('players');

  const roomItem = await RoomTable
    .where({ roomID })
    .findOne();

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
  const players = await PlayerTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday)
    .find();

  return {
    status: 200,
    data: {
      players,
      winner: roomItem.winner,
    },
  };
};
