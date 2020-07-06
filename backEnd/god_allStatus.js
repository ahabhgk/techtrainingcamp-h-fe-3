/* eslint-disable no-undef */
module.exports = async function godAllStatus({ room, token }) {
  const roomID = room * 1;
  // get baseline time
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // get tables
  const RoomTable = larkcloud.db.table('rooms');
  const PlayerTable = larkcloud.db.table('players');

  const roomItem = await RoomTable
    .where({ roomID, godToken: token })
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
  let players = await PlayerTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday)
    .find();

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
