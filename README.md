# 搭建注册登录，权限验证的界面

- 使用到的技术栈
  - 前端：vue、elementui、axios、vueRouter
  - 后端：node、express、mongoose

## 项目运行步骤（同时开两个 cmd 窗口）

- 后端 cmd 窗口开启服务器
  - 项目根目录 `cd server` 进入 server 目录
  - server 目录 `npm install`安装所需的包
  - server 目录 `npm run serve` 开启服务器
- 前端 cmd 窗口运行项目
  - 项目根目录 `cd admin` 进入 admin 目录
  - admin 目录 `npm install` 安装所需的包
  - admin 目录 `npm run serve` 运行项目

## 后端搭建具体步骤

### step1：划分后端接口 app 文件结构目录

app
├── config
│ ├── db.js （存放 mongodb 的文件）
│ └── key.js （存放 jwt 加密文件）
├── index.js （入口文件，引入 mongo，routes 文件，添加监听）
├── model
│ └── user.js （定义 user 模型数据库文件）
└── router
├── index.js （导出接口给 app 使用）
└── user.js （存放 user 模型相关的接口逻辑（注册，登陆等））

### step2：nodemon 热加载入口文件

- 没有安装 nodemon 先全局安装一下`npm i nodemon -g`
- 在 package.json 文件里配置脚本

### step3：编写入口 index.js 文件

```js
const express = require("express")
//引入req.body解析模块（即可解析req.body里的内容）
const bodyParser = require("body-parser")
//引入mongo
const mongo = require("./config/db")
//引入routes(所有路由)
const routes = require("./router/index")

const app = new express()

//mongoose连接数据库文件
mongo(app)

//对应bodyParser解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//app.use(router)
routes(app)

app.listen(3000, () => {
  console.log("serve listen at http://localhost:3000")
})
```

### step4：编写 User 数据库模型

- 引用 bcrypt 对密码进行加密，使用 set 方法返回加密后的密码
  - 使用 bcrypt 的哈希同步进行密码加密，设置等级 `bcrypt.hashSync(val, 10)`
- 先创建好 Schema（模型属性设置），再设置 model

### step5：User 注册逻辑

1. 通过 User 模型的 findOne 来查询 User 模型里是否含有 req.body.username 值的 username 用户，如果该用户已存在，就返回状态码 409，并返回提示信息
2. 不存在的话就传入 req.body 来创建新用户至 User 数据库中

### step5：User 登录逻辑

1. 查询该用户是否存在，如果该用户不存在，就返回状态码 422，并返回提示信息
2. 如果存在，判断该密码是否正确，需要解密一下 `bcrypt.compareSync(req.body.password, user.password)`
3. 如果密码错误，返回 422 状态码及返回信息
4. 如果正确，返回 token 值进行后续的权限验证
5. token 加密：使用 jwt（jsonwebtoken）加密 `jwt.sign({ _id, username }, SECRET, { expiresIn: "24h" })`
   - 其中使用 user 的\_id 和 username 再加上自己定义的 SECRET 加密文件来进行加密，可设置时间
6. jwt 应用：请求头里加入 Authorization，并加上 Bearer 标注

### step6：User 验证用户权限逻辑

1. 先使用字符串的 spilt 方法获取 token 即 Bearer 标注及空格后的内容
2. 再使用 jwt.verify 方法核实出用户的\_id 及 username
3. 根据\_id 是否能查询出 User 数据库对应的已注册的 user，若查询不到，send 422 状态码及错误信息
4. 能查询到再对比一下 username 是否正确，若不正确，send 422 状态码及错误信息
5. username 正确再查看之前注册时的 isAdmin（权限）的值 0 -> 普通用户 1 -> 管理员用户（可查看所有用户列表）

### step7：获取所有 User 数据库列表（管理员身份）

1. 设置验证身份中间件函数，根据 token 来确定找到用户，进而查询该用户权限
2. 若用户权限为管理员，则调用 next
3. next 之后通过 find 来查询所有用户

## 前端搭建步骤

### step1：vue create 项目

- 需要 vue-router 进行路由跳转及 axios 发送网络请求

### step2：vue add element 引入 elementui 框架

### step3：编写注册页面

- 将 axios 封装在根目录 http.js 文件里（导出 axios 实例对象），在 main.js 里引入，将其挂载在 Vue 实例的原型上
- 发送 post 请求，将表单内容作为请求体传给服务器，注册之后跳转至登录页面

### step4：编写登录页面

- 发送 post 请求，将表单内容作为请求体传给服务器，当登录成功时，将 token 保存至 localStorage 里，注意格式为 Bearer +token
- 登录成功后跳转至用户页面

### step5：设置 axios 请求拦截和响应拦截

- 请求拦截：判断 localStorage 里是否为 token 值，有的话将其保存在请求头里（req.headers.Authorization），没有则直接返回请求
- 响应拦截：判断是否有错误 err，有则将其警示弹出（err.response.data）

### step6：设置路由守卫

- 判断 localStorage 里是否有 token，有的话正常跳转 next 路由，没有的话除了跳转至登录和注册界面，都需要重定向至登录界面
