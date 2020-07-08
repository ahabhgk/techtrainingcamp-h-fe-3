/* eslint-disable no-undef, import/no-unresolved, eqeqeq */

const getRoom = require('./util_getRoom');

module.exports = async function playerStart({ room, name }) {
  if (!room || !name) {
    return {
      status: '400',
      msg: 'wrong number of players',
    };
  }

  const { roomQuery, RoomTable } = await getRoom(room);

  // get room info
  const roomItem = await roomQuery.findOne();

  // varify room id
  if (!roomItem.roomID) {
    return {
      status: 401,
      data: {
        msg: 'wrong room id',
      },
    };
  }
  // varify player num
  if (roomItem.roles.length === 0) {
    return {
      status: 401,
      data: {
        msg: 'the room is full',
      },
    };
  }

  // create or get player
  const PlayerTable = larkcloud.db.table('players');
  let playerItem = await PlayerTable.where({ name }).findOne();
  if (playerItem.roomID == room) {
    return {
      status: 403,
      data: {
        msg: 'conflict name',
      },
    };
  }
  if (!playerItem) {
    playerItem = PlayerTable.create({ name, points: 0 });
  }

  // init player
  const token = (Math.random() * 1e17).toString(36);
  const roleInd = Math.floor(Math.random() * roomItem.roles.length);
  const role = roomItem.roles.splice(roleInd, 1)[0];

  const playerInfo = {
    token,
    role,
    roomID: room * 1,
    status: 'alive',
    killedBy: '__nobody',
    killedAt: -1,
    isSheriff: false,
  };
  Object.assign(playerItem, playerInfo);

  await PlayerTable.save(playerItem);
  await RoomTable.save(roomItem);

  return {
    status: 200,
    data: {
      token,
      role,
    },
  };
};
