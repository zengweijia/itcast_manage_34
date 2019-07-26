<template>
  <div class="home">
    <el-container>
        <!-- 侧边栏 -->
      <el-aside width="200px">
        <h5 class="logo"></h5>
        <el-menu
          :router = 'true'
          :unique-opened= 'true'
          :default-active="'1-4-1'"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu v-for="first in leftmenu" :key="first.id" :index="first.id+''" >
            <template slot="title">
              <i class="el-icon-dish"></i>
              <span>{{first.authName}}</span>
            </template>
            <el-menu-item v-for="second in first.children" :key="second.id" :index="'/home/'+second.path">
              <i class="el-icon-dessert"></i>
              <span>{{second.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
          <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- 主体 -->
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLeftMenu } from '@/api/right_index.js'
export default {
  data () {
    return {
      leftmenu: []
    }
  },
  mounted () {
    getLeftMenu()
      .then((result) => {
        console.log(result)
        this.leftmenu = result.data.data
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: pink;
  }
}
</style>
