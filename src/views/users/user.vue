<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input
        style="width: 300px;margin-right: 15px;margin-bottom: 15px"
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        @keyup.enter.native="init"
      >
        <el-button @click="init" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.mg_state" placement="top">
            <el-switch
              @change="changeState(scope.row.id,scope.row.mg_state)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button @click="showEditDialog(scope.row)" type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="bottom">
            <el-button @click="showGrantDialog(scope.row)" type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button @click="del(scope.row.id)" type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="edit" ref="edit" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="edit.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="edit.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="edit.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantform">
        <el-form-item label="用户名：" :label-width="formLabelWidth"><span>{{grantform.username}}</span></el-form-item>
        <el-form-item label="角 色" :label-width="formLabelWidth">
          <el-select v-model="grantform.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  </div>
</template>
<script>
import {
  getAllUserList,
  addUser,
  editUser,
  delUserById,
  UpdateUserState
} from '@/api/user_index.js'
import { getAllRolelist, grantUserRole } from '@/api/role_index.js'
export default {
  data () {
    return {
      // value: '100',
      userinfo: '',
      tableData: [],
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      total: 0,
      dialogFormVisible: false,
      grantdialogFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],

        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 添加正则验证规则
          {
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请输入合法的电子邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入合法的手机号',
            trigger: 'blur'
          }
        ]
      },
      edit: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      grantform: {
        id: '',
        rid: '',
        username: ''
      },
      roleList: []
    }
  },
  methods: {
    init () {
      getAllUserList(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.tableData = res.data.data.users
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 切换每页显示数量时触发
    handleSizeChange (val) {
      console.log(`每页打印${val}条`)
      this.userobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前是第${val}页`)
      this.userobj.pagenum = val
      this.init()
    },
    // 添加用户
    addsubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          addUser(this.form)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '数据添加成功'
                })
                this.dialogFormVisible = false
                this.$refs.form.resetFields()
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
        }
      })
    },
    // 编辑用户
    // 1 填充数据
    showEditDialog (row) {
      this.dialogFormVisible = true
      console.log('row', row)
      this.edit.id = row.id
      this.edit.username = row.username
      this.edit.email = row.email
      this.edit.mobile = row.mobile
    },
    // 2 编辑提交
    editsubmit () {
      this.$refs.edit.validate(valid => {
        if (valid) {
          editUser(this.edit)
            .then(res => {
              console.log('编辑', res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '数据编辑成功'
                })
                this.dialogFormVisible = false
                this.$refs.edit.resetFields()
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
        }
      })
    },
    // 根据id删除指定用户
    del (id) {
      this.$confirm(
        `此操作将永久删除id号为${id}的用户, 是否继续?`,
        '删除提示：',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          delUserById(id)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })

                this.userobj.pagenum =
                  Math.ceil((this.total - 1) / this.userobj.pagesize) <
                  this.userobj.pagenum
                    ? --this.userobj.pagenum
                    : this.userobj.pagenum

                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 改变状态
    async changeState (id, type) {
      console.log('type', type)
      let res = await UpdateUserState(id, type)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '状态修改成功'
        })
      }
    },
    // 分配角色
    showGrantDialog (row) {
      this.grantdialogFormVisible = true
      this.grantform.id = row.id
      this.grantform.username = row.username
      this.grantform.rid = row.rid
    },
    // 获取所有角色数据
    async roleListInit () {
      let res = await getAllRolelist()
      console.log('获取所有角色', res)
      this.roleList = res.data.data
    },
    async grantrole () {
      if (!this.grantform.rid) {
        this.$message({
          type: 'warning',
          message: '请选择一个角色'
        })
      } else {
        let res = await grantUserRole(this.grantform)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '角色设置成功'

          })
          console.log('设置角色',res)
          this.grantdialogFormVisible = false
          this.init()         
        }
      }
    }
  },
  mounted () {
    this.init()
    this.roleListInit()
  }
}
</script>
<style lang="less" scoped>
</style>
