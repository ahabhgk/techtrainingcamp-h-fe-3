/* eslint-disable no-undef */
module.exports = async function playerStart({ room, name }) {
  if (!room || !name) {
    return {
      status: '400',
      msg: 'wrong number of players',
    };
  }

  // get baseline time
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // get tables
  const roomTable = larkcloud.db.table('rooms');
  const playerTable = larkcloud.db.table('players');

  // get room info
  // const { roomID, roles, sheriffNumber } = await roomTable
  const roomItem = await roomTable
    .where({ roomID: room * 1 })
    .where('updatedAt')
    .gt(yesterday)
    .findOne();

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
  let playerItem = await playerTable.where({ name }).findOne();
  if (!playerItem) {
    playerItem = playerTable.create({ name, points: 0 });
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
  await playerTable.save(playerItem);
  await roomTable.save(roomItem);

  return {
    status: 200,
    data: {
      token,
      role,
    },
  };
};
