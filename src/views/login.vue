<template>
  <div class="login">
    <el-card class="reg-box">
      <el-input placeholder="账号" v-model="option.username"></el-input>
      <el-input placeholder="密码" v-model="option.password"></el-input>
      <el-input placeholder="重复密码" v-model="option.repassword"></el-input>
      <el-button type="primary" @click="reg">注册</el-button>
    </el-card>
    <el-card class="reg-box">
      <el-input placeholder="账号" v-model="option1.username"></el-input>
      <el-input placeholder="密码" v-model="option1.password"></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </el-card>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        option: {
          username: '',
          password: '',
          repassword: ''
        },
        option1: {
          username: '',
          password: '',
        }
      }
    },
    methods: {
      //注册
      reg(){
        this.api.login.reg(this.option).then(res => {
          this.$message.success(res.message)
        }).catch(res => {
          this.$message.error(res.message)
        })
      },
      //登录
      login(){
        this.api.login.login(this.option1).then(res => {
            this.$store.commit('setUserinfo',res.userInfo)
          this.$message.success(res.message)
          this.$router.push({name:'home'})
        }).catch(res => {
          this.$message.error(res.message)
        })
      }
    }
  }
</script>
<style lang="scss" scoped="">
  .reg-box {
    width: 500px;
    margin: 50px auto;
    .el-input {
      margin-bottom: 10px;
    }
  }
</style>
