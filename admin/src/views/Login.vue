<template>
  <div class="login">
    <h3 class="title">登录页面</h3>
    <el-form :model="loginData"  :rules="rules" ref="loginData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginData.password" autocomplete="off"></el-input>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="login('loginData')">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'Login',
  data() {
    return {
      loginData:{
        //表单模型
        username: "",
        password:"",
      },
      rules:{
        //表单规则
        username:[
          {
            required:true,//必填项
            message:"账号不得为空",
            trigger: 'blur' //失去焦点时触发
          },
          {
            min:3,
            max:12,
            message:"长度应在3~12之间",
            trigger:'blur'
          }
        ],
        password:[
          {
            required:true,//必填项
            message:"密码不得为空",
            trigger: 'blur' //失去焦点时触发
          },
          {
            min:3,
            max:12,
            message:"长度应在3~12之间",
            trigger:'blur'
          }
        ],
      }
    }
  },
  methods: {
    login(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.$http.post("/login",this.loginData).then(res => {
            // console.log(res.data)
            this.$message({
              type:"success",
              message:"用户登录成功~"
            })
            //登录成功返回token，将其保存至localStorage里
            localStorage.setItem("elementToken","Bearer "+ res.data)
            this.$router.push("/index")
          })
        } 
      });
    },
  },
}
</script>

<style scoped>
  .login{
    width: 500px;
    height: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
  }
  .login .title{
    text-align: center;
  }
  .login .el-input{
    width: 90%;
  }
  .login .button{
    display: flex;
    justify-content: center;
  }
  .login .button button{
    margin:0 30px;
  }
</style>