/* eslint-disable no-undef, no-restricted-syntax */
module.exports = async function godStart({ room, token, winner }) {
  const roomID = room * 1;
  // get baseline time
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

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
  roomItem.time = 'gameOver';
  await RoomTable.save(roomItem);

  // update players
  const PlayerTable = larkcloud.db.table('players');
  const players = await PlayerTable
    .where({ roomID })
    .where('updatedAt')
    .gt(yesterday)
    .find();

  for (const player of players) {
    if (player.role === 'werewolf' && winner === 'werewolf') {
      player.points += 1;
    } else if (player.role !== 'werewolf' && winner === 'villager') {
      player.points += 1;
    }
  }
  await PlayerTable.save(players);

  return {
    status: 200,
    data: {
      msg: 'successfully finished the game!',
    },
  };
};
