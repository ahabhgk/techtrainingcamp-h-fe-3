/* eslint-disable no-undef, import/no-unresolved, no-fallthrough */

const getRoom = require('./util_getRoom');
const getPlayers = require('./util_getPlayers');

module.exports = async function godSetStatus({
  name, status, room, token,
}) {
  if (!status || !name) {
    return {
      status: 401,
      data: {
        msg: 'you should give a specific target and status',
      },
    };
  }

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

  const { playersQuery, PlayerTable } = await getPlayers(room);
  const target = await playersQuery
    .where({ name })
    .findOne();

  if (!target) {
    return {
      status: 400,
      data: {
        msg: 'wrong name',
      },
    };
  }

  switch (status) {
    case 'sheriff':
      target.isSheriff = !target.isSheriff;
      break;
    case 'cured':
      target.status = 'alive';
      break;
    case 'protected': break;
    case 'poisoned':
      target.killedBy = target.killedBy === '__nobody' ? 'witch' : target.killedBy;
    case 'killed':
      target.killedBy = target.killedBy === '__nobody' ? 'werewolf' : target.killedBy;
    case 'shot':
      target.killedBy = target.killedBy === '__nobody' ? 'hunter' : target.killedBy;
    case 'voted':
      target.killedBy = target.killedBy === '__nobody' ? 'vote' : target.killedBy;
      target.status = 'dead';
      target.killedAt = roomItem.day;
      break;
    default: return {};
  }
  await PlayerTable.save(target);

  if (['killed', 'cured', 'poisoned'].indexOf(status) !== -1) {
    roomItem.day += 1;
    roomItem.time = 'day';
  } else if (status === 'voted') {
    roomItem.time = 'night';
  }
  await RoomTable.save(roomItem);

  return {
    status: 200,
    data: {
      msg: 'successfully set status!',
    },
  };
};
