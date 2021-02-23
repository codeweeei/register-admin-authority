<template>
  <div class="register">
    <h3 class="title">注册页面</h3>
    <el-form :model="registerData"  :rules="rules" ref="registerData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model.number="registerData.name"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="registerData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="registerData.password2" autocomplete="off"></el-input>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="register('registerData')">注册</el-button>
        <el-button type="primary" @click="$router.push('/login')">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerData:{
        //表单模型
        username: "",
        password:"",
        password2:"",
        name:""
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
        password2:[
          {
            required:true,//必填项
            message:"确认密码不得为空",
            trigger: 'blur' //失去焦点时触发
          },
          {
            min:3,
            max:12,
            message:"长度应在3~12之间",
            trigger:'blur'
          },
          { 
            //确认密码与密码一致
            validator: validatePass, 
            trigger: 'blur' 
          }
        ],
        name:[
          {
            required:true,//必填项
            message:"用户名不得为空",
            trigger: 'blur' //失去焦点时触发
          },
          {
            min:2,
            max:8,
            message:"长度应在2~8之间",
            trigger:'blur'
          }
        ],
      }
    }
  },
  methods: {
    register(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.$http.post("/register",this.registerData).then(res => {
            // console.log(res.data)
            this.$message({
              type:"success",
              message:"用户注册成功~"
            })
            this.$router.push("/login")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style scoped>
  .register{
    width: 500px;
    height: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
  }
  .register .title{
    text-align: center;
  }
  .register .el-input{
    width: 90%;
  }
  .register .button{
    display: flex;
    justify-content: center;
  }
  .register .button button{
    margin:0 30px;
  }
</style>