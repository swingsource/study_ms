<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item label="">
          <el-select v-model="form.userType" placeholder="用户类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.user" placeholder="用户名"></el-input>
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
            :data="dataList"
            border
            style="width: 100%">
          <el-table-column
              type="index"
              align="center"
              :index="indexMethod">
          </el-table-column>
          <el-table-column
              prop="userType"
              label="用户类型"
              width="180">
          </el-table-column>
          <el-table-column
              prop="username"
              label="用户名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="password"
              label="密码">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间">
          </el-table-column>
          <el-table-column
              prop="avatar"
              label="头像">
          </el-table-column>
          <el-table-column
              prop="gender"
              label="性别">
          </el-table-column>
          <el-table-column
              prop="freeze"
              label="已冻结">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </div>
  </div>
</template>

<script>
  import { getUserList } from "@/api/user"

  export default {
    data () {
      return {
        form: {},
        dataList: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    mounted() {
      getUserList()
    },
    methods: {
      indexMethod () {
        return 1
      },
      handleSearch () {},
      handleAdd () {}
    }
  }
</script>

<style scoped lang="stylus">
.index
  .operate-bar
    display flex
    flex-direction row-reverse
</style>
