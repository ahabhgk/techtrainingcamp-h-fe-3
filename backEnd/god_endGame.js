/* eslint-disable no-undef, import/no-unresolved, no-restricted-syntax */

const getRoom = require('./util_getRoom');
const getPlayers = require('./util_getPlayers');

module.exports = async function godStart({ room, token, winner }) {
  const { roomQuery, RoomTable } = await getRoom(room);
  const roomItem = await roomQuery
    .where({ godToken: token })
    .findOne();

  if (!roomItem || !token) {
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
  const { playersQuery, PlayerTable } = await getPlayers(room);
  const players = await playersQuery.find();

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
