
# API 1.1

项目中(可能)用到的后端api

## player

---

`GET /player/start?room=<room id>&name=<user name>`

玩家设置名字, 加入特定房间号

返回值:

```json
{
  "status": 200,
  "data": {
    "token": "player's token",
    "role":  "wereWolf|villager|...",
  }
}

// 如果房间已满(或者以后加入密码验证, 密码错误):
{
  "status": 401,
  "data": {
    "msg": "error mesage"
  }
}
```

---

`GET /player/allStatus?room=<room id>&token=<token>`

玩家获得当前游戏状态

返回值:

```json
{
  "status": 200,
  "data": {
    "players": [
      {
        "name": "<玩家名字>",
        "status" : "dead|alive",
        "isSheriff": true|false
      },
      {
        // ...
      }
    ],
    "self": { //自己的状态
      "role": "wereWolf|villager|...",
      "isSheriff": true|false,
      "status" : "dead|alive",
      "power": "none(无技能或还未到使用技能时机)|available(狼人, 预言家等可以使用技能)|available[123](女巫可以使用 1:灵药, 2:毒药, 3:两者",
    },
    "time": "day|night|gameOver",
    "day": <第几天>(数字类型),
    "voteResult": "<玩家名字|空串(如果还没投票)|__fool(投到了白痴)>",
    "nightResult": ["<玩家名字>", "..."],  // 晚上死的玩家们, 空数组表示平安夜
    "hunterTarget": "<玩家名字>|空串(如果猎人还没死)|__nobody(如果放弃使用技能)",
    "sheriffTarget": "<玩家名字>|空串(如果警长还没死)|__nobody(如果撕警徽)",
  }
}
```

---

`GET /player/vote?for=<sheriff|werewolf>&room=<room id>&token=<token>`

玩家投票选警长/狼人

返回值:

```json
{
  "status": 200,
  "data": {
    "msg": "return message"
  }
}
```

---

`GET /player/usePower?target=<user name>&room=<room id>&token=<token>&powerType=<>`

> powerType: [seer|werewolf|hunter|savior|poison|cure|passSheriff] 中的一种, 如果 target 是 none 代表放弃使用技能

玩家使用技能, 通过对方名字指定目标, 通过 token+房间号 验证

返回值:

```json
{
  "status": 200,
  "data": {
    "msg": "return message"
  }
}
```

## god

---

`GET /god/start?playerNum=<>`

上帝创建房间, 并设置房间人数

返回值:

```json
{
  "status": 200,
  "data": {
    "token": "<god's token>",
    "role":  "god",
    "room": "room id"
  }
}
```

---

`GET /god/allStatus?token=<token>&room=<room id>`

上帝获得每个人的游戏状态

返回值:

```json
{
  "status": 200,
  "data": {
    "players": [
      {
        "name": "<玩家名字>",
        "role": "wereWolf|villager|...",
        "status" : "dead|alive",
        "killedAt": "<第几天>(数字类型, -1代表没死)",
        "killedBy": "<玩家名字>|__nobody(代表没死)| __vote(代表被票死)",
        "isSheriff": true|false
      },
      {
        // ...
      }
    ],
    "time": "day|night|gameOver",
    "day": <第几天>(数字类型)
  }
}
```

## other

`GET /game/result?room=<room id>`

根据房间号获取游戏结果

返回值:

```json
{
  "status": 200,
  "data": {
    "winner": "werewolf|villager",
    "players": [
      {
        "name": "<玩家名字>",
        "role": "wereWolf|villager|...",
        "status" : "dead|alive",
        "killedAt": "<第几天>(数字类型, -1代表没死)",
        "killedBy": "<玩家名字>|__nobody(代表没死)| __vote(代表被票死)",
        "pointGained": <本局获得的积分(数字)>,
        "totalPoints": <玩家总计积分(数字)>
      },
      {
        // ...
      }
    ],
  }
}
```

`GET /game/bestPlayers`

获取积分榜

返回值:

```json
{
  "status": 200,
  "data": {
    "players": [
      {
        "name": "<玩家名字>",
        "totalPoints": <玩家总计积分(数字)>
      },
      {
        // ...
      }
    ]
  }
}
```