<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item label="">
          <el-select v-model="form.userType" placeholder="用户类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="前端用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <template>
        <el-table
            :data="renderUserList"
            border
            style="width: 100%">
          <el-table-column
              align="center"
              type="index">
          </el-table-column>
          <el-table-column
              prop="userType"
              align="center"
              label="用户类型"
              width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.userType === 'admin'">管理员</span>
              <span v-else>前端用户</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="username"
              align="center"
              label="用户名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="password"
              align="center"
              label="密码">
          </el-table-column>
          <el-table-column
              prop="createTime"
              align="center"
              label="创建时间">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="handleDel(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </div>
    <!-- 分页组件 -->
    <pagination :page-num="page.pageSize"
                :page-size="page.pageSize"
                :total="page.total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <!-- 添加用户 -->
    <add-dialog v-model="visibleAdd" @success="handleReloadData"></add-dialog>
    <!-- 修改用户 -->
    <update-dialog v-model="visibleUpdate" :row="currentRow" @success="handleReloadData"></update-dialog>
  </div>
</template>

<script>
  import { getUserList, delUser } from "@/api/user"
  import { fePagination } from "@/util/utils"

  import Pagination from 'core/pagination/Index'
  import AddDialog from './Add'
  import UpdateDialog from './Update'

  export default {
    components: {
      Pagination,
      AddDialog,
      UpdateDialog
    },
    data () {
      return {
        page: {
          pageSize: 10,
          pageNum: 1,
          total: 0
        },
        form: {
          userType: '',
          username: ''
        },
        userList: [],
        renderUserList: [],
        visibleAdd: false,
        visibleUpdate: false,
        currentRow: {}, // 当前操作的行数据
      }
    },
    mounted() {
      this.getAllUserList()
    },
    methods: {
      // 获取所有用户
      getAllUserList () {
        const params = {
          userType: this.form.userType,
          username: this.form.username
        }
        getUserList(params).then(res => {
          if (res.data.code === 200) {
            this.userList = res.data.data
            // 格式化日期
            this.userList.forEach(_ => {
              _.createTime = this.$moment(_.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
            })
            this.page.total = this.userList.length
            // 分页
            this.getRenderUserList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      // 分页获取 user，并且格式化数据
      getRenderUserList () {
        this.renderUserList = fePagination(this.userList, this.page.pageSize, this.page.pageNum)
      },
      // 分页方法
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getRenderUserList()
      },
      handleCurrentChange (val) {
        this.page.pageNum = val
        this.getRenderUserList()
      },
      // 查询
      handleSearch () {
        this.getAllUserList()
      },
      // 添加
      handleAdd () {
        this.visibleAdd = true
      },
      // 修改
      handleUpdate (row) {
        this.visibleUpdate = true
        this.currentRow = row
      },
      // 删除
      handleDel (row) {
        delUser({id: row.id}).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            // 更新数据
            this.handleReloadData()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      // 重新加载数据
      handleReloadData () {
        this.form.userType = ''
        this.form.username = ''
        this.getAllUserList()
      }
    }
  }
</script>

<style scoped lang="stylus">
.index
  .operate-bar
    display flex
    flex-flow row nowrap
    justify-content flex-end
    align-items center
</style>
