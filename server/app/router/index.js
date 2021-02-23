//引入route
const userRoute = require("./user")
// const itemRoute = require("./router/item")

module.exports = (app) => {
  app.use("/user", userRoute)
}
