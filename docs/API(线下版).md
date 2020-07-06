
# API (线下版)

> version: 1.0

项目中(可能)用到的后端api

## player

---

`GET https://afbx35.fn.thelarkcloud.com/player_start?room=<room id>&name=<user name>`

玩家设置名字, 加入特定房间号

返回值:

```json
{
  "status": 200,
  "data": {
    "token": "<player's token>",
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

// 如果名字重复
{
  "status": 403,
  "data": {
    "msg": "conflict name"
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
    "self": { //自己的角色
      "role": "wereWolf|villager|..."
    },
    "time": "day|night|gameOver",
    "day": <第几天>(数字类型)
  }
}
```

## god

`GET https://afbx35.fn.thelarkcloud.com/god_start?playerNum=<>`

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

`GET /god/endGame?room=<room id>&token=<token>&winner=<werewolf|villager|nobody>`

提前结束游戏, 并设置胜者

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

`GET /god/setStatus?name=<player name>&status=<status>&room=<room id>&token=<token>`

上帝设置玩家玩家状态(死了?成为警长?被守卫保了?...)

> status 可选值有: [sheriff|poisoned|cured|protected|killed|shot|voted]

返回值:

```json
{
  "status": 200,
  "data": {
    "msg": "<return message>"
  }
}
```

---

`GET /god/allStatus?room=<room id>&token=<token>`

上帝获得角色信息

返回值:

```json
{
  "status": 200,
  "data": {
    "players": [
      {
        "name": "<玩家名字>",
        "status" : "dead|alive",
        "role": "seer|werewolf|...",
        "killedBy": "werewolf|vote|hunter|witch",
        "killedAt": "<第几天>(数字类型, -1代表没死)",
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
        "points": <玩家总计胜场(数字)>
      },
      {
        // ...
      }
    ],
  }
}
```

`GET /game/topPlayers`

获取积分榜

返回值:

```json
{
  "status": 200,
  "data": {
    "players": [
      {
        "name": "<玩家名字>",
        "points": <玩家总计胜场(数字)>
      },
      {
        // ...
      }
    ]
  }
}
```
