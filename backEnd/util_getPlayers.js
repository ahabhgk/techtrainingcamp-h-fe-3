/* eslint-disable no-undef */
module.exports = async function getPlayers(room) {
  const roomID = room * 1;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const PlayerTable = larkcloud.db.table('players');

  // get player info
  const playersQuery = await PlayerTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday);

  return {
    playersQuery,
    PlayerTable,
  };
};
