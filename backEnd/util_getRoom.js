/* eslint-disable no-undef */
module.exports = async function getRoom(room) {
  const roomID = room * 1;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const RoomTable = larkcloud.db.table('rooms');

  // get room info
  const roomQuery = await RoomTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday);

  return {
    roomQuery,
    RoomTable,
  };
};
