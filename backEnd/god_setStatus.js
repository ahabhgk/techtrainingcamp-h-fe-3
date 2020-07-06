/* eslint-disable no-undef, no-fallthrough */
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

  const PlayerTable = larkcloud.db.table('players');
  const target = await PlayerTable
    .where({ name })
    .where('updatedAt')
    .gt(yesterday)
    .findOne();

  switch (status) {
    case 'sheriff':
      target.isSheriff = !target.isSheriff;
      break;
    case 'cured':
      target.status = 'alive';
      break;
    case 'protected': break;
    case 'poisoned':
      target.killedBy = target.killedBy || 'witch';
    case 'killed':
      target.killedBy = target.killedBy || 'werewolf';
    case 'shot':
      target.killedBy = target.killedBy || 'hunter';
    case 'voted':
      target.killedBy = target.killedBy || 'vote';
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
