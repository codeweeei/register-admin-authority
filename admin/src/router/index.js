import Vue from "vue"
import VueRouter from "vue-router"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import index from "../views/index.vue"
import NotFound from "../views/404.vue"
import { Message } from "element-ui"

Vue.use(VueRouter)

//定义路由
const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: index,
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

//定义路由守卫
router.beforeEach((to, from, next) => {
  //首先查看本地是否有token值，有则赋值isToken为true
  const isToken = localStorage.getItem("elementToken") ? true : false
  if (to.path == "/register" || to.path == "/login") {
    next()
  } else {
    //判断本地是否有token，有则next，否则跳转至登录界面，重新登录即可
    if (!isToken) {
      Message.error("请重新登录")
      next("/login")
    } else if (isToken) {
      next()
    }
  }
})

export default router
