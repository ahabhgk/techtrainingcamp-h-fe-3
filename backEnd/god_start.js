/* eslint-disable no-undef */
module.exports = async function godStart({ playerNum }) {
  if (!playerNum || playerNum > 12 || playerNum < 6) {
    return {
      status: '400',
      msg: 'wrong number of players',
    };
  }

  const roomID = Math.floor(Math.random() * 9e5 + 1e5);
  const godToken = (Math.random() * 1e17).toString(36);
  const roles = [
    ['villager', 'villager', 'villager', 'werewolf', 'werewolf', 'witch'],
    ['villager', 'villager', 'villager', 'villager', 'werewolf', 'werewolf', 'witch'],
    ['villager', 'villager', 'seer', 'hunter', 'werewolf', 'werewolf', 'werewolf', 'witch'],
  ];

  const roomInfo = {
    roomID,
    godToken,
    winner: '',
    time: 'night',
    day: 0,
    roles: roles[playerNum - 6],
  };

  const RoomTable = larkcloud.db.table('rooms');
  const roomItem = RoomTable.create(roomInfo);
  await RoomTable.save(roomItem);

  return {
    status: 200,
    data: {
      token: godToken,
      role: 'god',
      room: roomID,
    },
  };
};
