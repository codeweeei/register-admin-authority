<template>
  <div class="index">
    <h3 class="title">用户列表页</h3>
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'index',
  data(){
    return {
      userList:[]
    }
  },
  beforeMount() {
    //用户登录跳转->获取用户列表（管理员权限）admin admin
    this.$http.get("/").then(res => {
      // console.log(res.data)
      this.userList = res.data
    }) 
  }
}
</script>

<style scoped>
  .index{
    width: 500px;
    /* height: 400px; */
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
  }
  .index .title{
    text-align: center;
  }
</style>