## 搭建注册登录权限接口

1. npm init 生成 package.json 文件
2. `npm i express -S` 安装 express 插件
3. 在根目录下创建 app 文件夹——index.js
4. 在 package.json 文件里配置 nodemon 热启动 index.js 文件
5. 使用接口调试工具 postmen
6. `npm i mongoose -S` 安装 mongoose 模块
7. `npm i body-parser -S` 安装 body-parser 才能使用 req.body 来获取请求体的内容
8. 密码加密：1.引入密码加密解密文件 2. 密码加盐处理

- 注册时加密
- 登录时解密进行验证

9. token 设置及处理（user.\_id + user.username）

10. bcrypt 密码加密 `npm i bcrypt/bcryptjs -S` 前者性能更高，安装不上就安装后者

- 模型中进行加密，登录验证密码时进行解密

11. 前者 token 仅仅是用\_id 加 username 拼接起来的，不安全，使用 jwt（jsonwebtoken） 对 token 进行处理

- npm i jsonwebtoken -S

12. jwt 的加密文件存放至别的文件（导出）里，再导入即可，最好存入环境变量中
