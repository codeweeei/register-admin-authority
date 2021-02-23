//人员管理的接口处理
const express = require("express")
//对密码进行加密
const bcrypt = require("bcryptjs")
//对token进行加密
const jwt = require("jsonwebtoken")
//token加密规则
const { SECRET } = require("../config/key")
//引入User模型
const User = require("../model/user")
const route = express.Router()

//验证身份中间件
const isAdmin = async (req, res, next) => {
  //jwt
  //获取token Bearer 后面的
  const token = req.headers.authorization.split(" ").pop()
  // console.log(jwt.verify(token, SECRET))
  //查询用户是否存在
  const { _id, username } = jwt.verify(token, SECRET)
  //2.查询用户是否存在
  const user = await User.findById(_id)
  if (!user) {
    return res.status(422).send({
      message: "用户错误",
    })
  }
  //3.查看username
  if (username !== user.username) {
    res.status(422).send({
      message: "用户错误",
    })
  } else {
    //用户存在，查看权限
    if (user.isAdmin === "0") {
      res.status(409).send({
        message: "没有权限",
      })
    } else if (user.isAdmin === "1") {
      //执行下一函数
      next()
    }
  }
}

//获取用户列表接口（输入token且isAdmin为1才能显示出来）
route.get("/", isAdmin, async (req, res) => {
  // res.send("user")
  //查询User模型数据库，并将其传给客户端
  const userList = await User.find()
  res.send(userList)
})

//注册User接口
route.post("/register", async (req, res) => {
  //判断之前是否有该用户
  const user = await User.findOne({
    username: req.body.username,
  })
  //如果该用户已存在，就返回状态码409，并返回提示信息
  if (user) {
    return res.status(409).send({
      message: "该用户已存在",
    })
  }
  //创建新用户至User数据库
  const newUser = await new User(req.body).save()
  res.send(newUser)
})

//登录User接口
route.post("/login", async (req, res) => {
  //1.查询该用户是否存在
  const user = await User.findOne({
    username: req.body.username,
  })
  //如果该用户不存在，就返回状态码422，并返回提示信息
  if (!user) {
    return res.status(422).send({
      message: "该用户不存在，请注册",
    })
  }
  //2.如果存在，判断该密码是否正确，需要解密一下
  let isPassword = await bcrypt.compareSync(req.body.password, user.password)
  if (!isPassword) {
    return res.status(422).send({
      message: "密码错误",
    })
  }
  const { _id, username } = user
  const token = jwt.sign({ _id, username }, SECRET, { expiresIn: "24h" })
  res.send(token)
})

//验证用户权限接口
route.get("/verify", async (req, res) => {
  //jwt
  //获取token Bearer 后面的
  const token = req.headers.authorization.split(" ").pop()
  // console.log(jwt.verify(token, SECRET))
  //查询用户是否存在
  const { _id, username } = jwt.verify(token, SECRET)
  const user = await User.findById(_id)
  if (!user) {
    return res.status(422).send({
      message: "用户错误",
    })
  }
  //3.查看username
  if (username !== user.username) {
    res.status(422).send({
      message: "用户错误",
    })
  } else {
    //用户存在，查看权限
    if (user.isAdmin === "0") {
      res.status(409).send({
        message: "没有权限",
      })
    } else if (user.isAdmin === "1") {
      res.send("Admin")
    }
  }
})

//导出该路由
module.exports = route
