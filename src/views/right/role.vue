<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row style="margin-bottom: 10px" v-for="first in props.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag @close="delRightById(props.row,first.id)" closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
                <el-row style="margin-bottom: 10px" v-for="second in first.children" :key="second.id">
                    <el-col :span="4">
              <el-tag @close="delRightById(props.row,second.id)" closable type="info">{{second.authName}}</el-tag>
                    </el-col>
                    <el-col :span="20">
              <el-tag @close="delRightById(props.row,third.id)" style="margin:0 10px 10px 0" closable type="warning" v-for="third in second.children" :key="third.id">{{third.authName}}</el-tag>
            </el-col>
                </el-row>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="24" v-show="props.row.children.length == 0">
                  你没有任何的权限，请先充值！！！
              </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色授权" placement="bottom">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRolelist,delRightByRoleId } from "@/api/role_index.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    //删除角色指定权限 roleId,rightId
    async delRightById (row,rightId) {
        let res = await delRightByRoleId(row.id,rightId)
        console.log('删除角色指定权限',res)
        if (res.data.meta.status === 200) {
            this.$message({
                type:'success',
                message:res.data.meta.msg
            })
            row.children = res.data.data
        }
    }
  },
  mounted() {
    getAllRolelist()
      .then(result => {
        console.log("所有用户数据", result);
        this.tableData = result.data.data;
      })
      .catch(err => {
        this.$message({
          type: "warning",
          message: "获取失败"
        });
      });
  }
};
</script>
<style lang="less" scoped>
</style>
