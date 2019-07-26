<template>
  <div class="role">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮 -->
    <el-button @click="adddialogFormVisible=true" style="margin-bottom: 10px" type="success">添加角色</el-button>
    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row style="margin-bottom: 10px" v-for="first in props.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag
                @close="delRightById(props.row,first.id)"
                closable
                type="success"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row style="margin-bottom: 10px" v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag
                    @close="delRightById(props.row,second.id)"
                    closable
                    type="info"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="delRightById(props.row,third.id)"
                    style="margin:0 10px 10px 0"
                    closable
                    type="warning"
                    v-for="third in second.children"
                    :key="third.id"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="props.row.children.length == 0">你没有任何的权限，请先充值！！！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 自定义列模板 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色授权" placement="bottom">
            <el-button @click="showGrantDialog(scope.row)" type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 树形控件 -->
    <!-- 数据源 复选框 当前节点的唯一标识 默认全展开 默认被选中的节点（数组类型） 设置查询属性和显示属性 -->
    <el-dialog title="角色授权" :visible.sync="grantdialogFormVisible">
      <el-tree
        ref="mytree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加角色" :visible.sync="adddialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addRole,
  getAllRolelist,
  delRightByRoleId,
  grantRightById
} from '@/api/role_index.js'
import { getAllRightlist } from '@/api/right_index.js'
export default {
  data () {
    return {
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      form: {
        roleName: '',
        roleDesc: ''
      },
      adddialogFormVisible: false,
      // 单前行角色id
      roleId: '',
      // 表格数据
      tableData: [],
      // 指定树形默认
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      grantdialogFormVisible: false,
      checkedArr: [],
      rightList: []
    }
  },
  methods: {
    // 添加角色
    addsubmit () {
      this.$refs.form.validate((val, obj) => {
        if (val) {
          addRole(this.form).then(res => {
            console.log('添加角色', res)
            if (res.data.meta.status === 201) {
              this.adddialogFormVisible = false
              this.$refs.form.resetFields()
              this.roleInit()
            }
          })
        }
      })
    },
    // 实现角色权限的授权提交
    async grantSubmit () {
      var arr = this.$refs.mytree.getCheckedNodes()
      // console.log('权限分配arr', arr)
      var temp = []
      arr.forEach(item => {
        temp.push(item.id + ',' + item.pid)
      })
      var tempstr = temp.join(',')
      var temparr = tempstr.split(',')
      var finslarr = [...new Set(temparr)]
      var rightId = finslarr.join(',')
      // 角色id  权限id字符串
      let res = await grantRightById(this.roleId, rightId)
      console.log(this.roleId, rightId)
      // console.log('权限分配res', res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.grantdialogFormVisible = false
        this.roleInit()
      }
    },
    // 显示授权对话框，获取数据
    async showGrantDialog (row) {
      this.roleId = row.id
      this.grantdialogFormVisible = true
      let res = await getAllRightlist('tree')
      console.log('树形授权数据res', res)
      console.log('树形授权数据row', row)
      this.rightList = res.data.data

      this.checkedArr.length = 0
      if (row.children && row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children && first.children.length > 0) {
            first.children.forEach(second => {
              if (second.children && second.children.length > 0) {
                second.children.forEach(third => {
                  // console.log('third.id', third.id)
                  this.checkedArr.push(third.id)
                  // console.log(this.checkedArr)
                })
              }
            })
          }
        })
      }
    },
    // 删除角色指定权限 roleId,rightId
    async delRightById (row, rightId) {
      let res = await delRightByRoleId(row.id, rightId)
      console.log('删除角色指定权限', res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        row.children = res.data.data
      }
    },
    roleInit () {
      getAllRolelist()
        .then(result => {
          console.log('所有用户数据', result)
          this.tableData = result.data.data
        })
        .catch(err => {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '获取失败'
          })
        })
    }
  },
  mounted () {
    this.roleInit()
  }
}
</script>
<style lang="less" scoped>
</style>
