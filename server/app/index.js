const express = require("express")
//引入req.body解析模块
const bodyParser = require("body-parser")
//引入mongo
const mongo = require("./config/db")
//引入routes(所有路由)
const routes = require("./router/index")

const app = new express()

//解决跨域
app.use(require("cors")())
mongo(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

app.listen(3000, () => {
  console.log("serve listen at http://localhost:3000")
})
