
# API

项目中用到的后端api

---

`GET /start/player?rome=<rome ID>&name=<user name>`

玩家设置名字, 加入特定房间号

返回值:

```json
{
  "status": 200,
  "data": {
    "token": "player's token",
    "role":  "wereWolf|civilian|...",
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

`GET /start/god`

上帝创建房间

返回值:

```json
{
  "status": 200,
  "data": {
    "token": "god's token",
    "role":  "god",
    "rome": "romeID"
  }
}
```

---

`GET /getStatus?token=<token>&rome=<rome id>`

查看对应token的游戏状态

返回值:

```json
{
  "status": 200,
  "data": {
    "role": "wereWolf|civilian|god|...",
    "status" : "dead|alive|gameOver",
    "time": "day|night",
    "power": "none(无技能或还未到使用技能时机)|available(狼人, 预言家等可以使用技能)|available[123](女巫可以使用 1:灵药, 2:毒药, 3:两者",
  }
}
```

---

`GET /usePower?target=<user name>&rome=<rome ID>&token=<token>`

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