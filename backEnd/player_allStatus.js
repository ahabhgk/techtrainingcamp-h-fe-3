/* eslint-disable no-undef */
module.exports = async function playerAllStatus({ room, token }) {
  const roomID = room * 1;
  // get baseline time
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // get tables
  const roomTable = larkcloud.db.table('rooms');
  const playerTable = larkcloud.db.table('players');

  const curPlayerItem = await playerTable
    .where({ roomID, token })
    .findOne();

  if (!curPlayerItem) {
    return {
      status: 401,
      data: {
        msg: 'wrong token',
      },
    };
  }

  // get player info
  let players = await playerTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday)
    .find();
  players = players.map((it) => ({
    name: it.name,
    status: it.status,
    isSheriff: it.isSheriff,
  }));
  // get room info
  const roomItem = await roomTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday)
    .findOne();

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
