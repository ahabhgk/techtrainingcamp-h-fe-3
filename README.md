# techtrainingcamp-h-fe-3

## 项目结构

```
|   .browserslistrc   # 默认的配置
|   .gitignore        # 默认的配置
|   babel.config.js   # 默认的配置
|   package.json      # 下载了axios, vuex, vue-router
|   README.md
|   vue.config.js     # 添加了"@"的路径
|
+---public            # 存放默认的静态资源
|       favicon.ico
|       index.html
|
\---src
    |   App.vue       # 项目入口
    |   main.js       # 项目入口
    |
    +---assets        # 存放项目内用到的静态资源
    |   \---img       # 存放图片
    |
    +---components    # 存放可复用的页面组件, 主要目录之一
    |
    +---network       # 存放网络请求相关代码
    |
    +---routers       # vue-router
    |       index.js
    |
    +---store         # vuex
    |
    \---views         # 存放主要页面
```
