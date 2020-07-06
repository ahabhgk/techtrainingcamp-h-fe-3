/* eslint-disable no-undef */
module.exports = async function godStart({ room, token, winner }) {
  const roomID = room * 1;

  const RoomTable = larkcloud.db.table('rooms');
  const roomItem = await RoomTable
    .where({ roomID, godToken: token })
    .findOne();

  if (!roomItem) {
    return {
      status: 401,
      data: {
        msg: 'unauthorized or wrong room id',
      },
    };
  }

  roomItem.winner = winner || 'nobody';
  await RoomTable.save(roomItem);

  return {
    status: 200,
    data: {
      msg: 'successfully finished the game!',
    },
  };
};
