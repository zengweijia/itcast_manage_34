<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop label="层级">
        <template slot-scope="scope">
            {{scope.row.level | levels}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRightlist } from "@/api/right_index.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {},
  filters: {
    levels(level) {
      if (level === "0") {
        return "一级";
      } else if (level === "1") {
        return "二级";
      } else if (level === "2") {
        return "三级";
      } else {
        return "";
      }
    }
  },
  mounted() {
    getAllRightlist("list")
      .then(result => {
        console.log("所有权限列表", result)
        this.tableData = result.data.data
      })
      .catch(err => {
          console.log('失败时的所有权限列表',err);
      });
  }
};
</script>
<style lang="less" scoped>
</style>
