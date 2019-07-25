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
          <el-submenu index="1-3">
            <template slot="title">
              <i class="el-icon-dish"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <i class="el-icon-dessert"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="1-4">
            <template slot="title">
              <i class="el-icon-grape"></i>
              <span>管理权限</span>
            </template>
            <el-menu-item index="/home/role">
              <i class="el-icon-trophy-1"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/home/right">
              <i class="el-icon-scissors"></i>
              <span>权限列表</span>
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
export default {};
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
