/* eslint-disable no-undef */
module.exports = async function topPlayers() {
  const PlayerTable = larkcloud.db.table('players');

  // get player info
  const players = await PlayerTable
    .where()
    .sort({ points: -1 })
    .limit(7)
    .find();

  return {
    status: 200,
    data: {
      players: players.map((it) => ({ name: it.name, points: it.points })),
    },
  };
};
