<template>
    <div class="login">
        <div class="container">
<img src="../assets/avatar.jpg" alt="" class="avatar">
<el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm">
<!-- 用户名 -->
  <el-form-item  prop="username">
    <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
  </el-form-item>
<!-- 密码 -->
    <el-form-item  prop="password">
    <el-input v-model="loginForm.password" prefix-icon="myicon myicon-key"></el-input>
  </el-form-item>
<!-- 登录按钮 -->
  <el-form-item>
    <el-button type="primary" @click="login('loginForm')">登录</el-button>
  </el-form-item>
</el-form>
        </div>
    </div>
</template>
<script>
import { login } from '@/api/user_index.js'
export default {

  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          //   console.log('gogogo')
          login(this.loginForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$router.push({ name: 'home' })
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '登录失败，哪来回哪去',
                type: 'error'
              })
            })
        } else {
          //   console.log('gungungun')
          this.$message({
            message: '数据输入不合法',
            type: 'error'
          })
          return false
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
      margin-bottom: 10px
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
