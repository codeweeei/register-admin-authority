const mongoose = require("mongoose")

//定义数据库地址
const mongoUrl = "mongodb://localhost:27017/login"

//将连接导出
module.exports = (app) => {
  mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
