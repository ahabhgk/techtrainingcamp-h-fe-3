module.exports = async function ({ playerNum }, context) {
  if (!playerNum || playerNum > 12 || playerNum < 6) {
    return {
      status: '400',
      msg: 'wrong number of players',
    };
  }

  const roomID = (Math.random() * 9e5 + 1e5) >>> 0;
  const godToken = (Math.random() * 1e17).toString(36);
  const sheriffNumber = (Math.random() * playerNum + 1) >>> 0;

  const roomInfo = {
    roomID,
    godToken,
    winner: '',
    playerNum,
    time: 'night',
    day: 0,
    sheriffNumber,
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
