import axios from "axios"
import { Message } from "element-ui"

const http = axios.create({
  baseURL: "http://localhost:3000/user",
})

//设置请求拦截
http.interceptors.request.use((req) => {
  //判断本地存储里是否有token，有则将其保存至请求头里
  if (localStorage.getItem("elementToken")) {
    req.headers.Authorization = localStorage.getItem("elementToken")
  }
  return req
})

//设置响应拦截，用来做错误处理
http.interceptors.response.use(
  (res) => {
    //将响应结果直接返回
    return res
  },
  (err) => {
    //当有错时，弹出该错误信息(没有权限)
    // console.log(err.response)
    Message.error(err.response.data.message)
  }
)
export default http
