const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema
const model = mongoose.model

const userSchema = new Schema({
  username: {
    //账号
    type: String,
    require: true,
  },
  password: {
    //密码
    type: String,
    require: true,
    set(val) {
      //使用bcrypt的哈希同步进行密码加密，设置等级
      return bcrypt.hashSync(val, 10)
    },
  },
  name: {
    //用户名
    type: String,
    require: true,
  },
  isAdmin: {
    //身份 1 -> 管理员 0 -> 普通用户
    type: String,
    default: "0",
  },
})
//创建好User模型
const User = model("User", userSchema)
//将其抛出
module.exports = User
