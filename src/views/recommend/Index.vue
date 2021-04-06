<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item label="">
          <el-select v-model="form.approval" placeholder="审核结果">
            <el-option label="全部" value=""></el-option>
            <el-option label="通过" value="agree"></el-option>
            <el-option label="不通过" value="reject"></el-option>
            <el-option label="未审核" value="un"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.recommender" placeholder="推荐人"></el-input>
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
      <el-table
          :data="renderRecommendList"
          border
          style="width: 100%">
        <el-table-column
            align="center"
            type="index">
        </el-table-column>
        <el-table-column
            prop="recommender"
            align="center"
            label="推荐人">
        </el-table-column>
        <el-table-column
            prop="title"
            align="center"
            label="标题">
        </el-table-column>
        <el-table-column
            prop="url"
            align="center"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            label="创建时间">
        </el-table-column>
        <el-table-column
            prop="introduction"
            align="center"
            :show-overflow-tooltip="true"
            label="简介">
        </el-table-column>
        <el-table-column label="审批结果" align="center" width="120px">
          <template slot-scope="scope">
            <el-link type="success" v-if="scope.row.approval === 'agree'">通过</el-link>
            <el-link type="danger" v-if="scope.row.approval === 'reject'">未通过</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-check" v-if="scope.row.approval === ''" circle @click="handleAgree(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-close" v-if="scope.row.approval === ''" circle @click="handleReject(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="handleDel(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <pagination :page-num="page.pageSize"
                :page-size="page.pageSize"
                :total="page.total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <!-- 添加推荐资源 -->
    <add-dialog v-model="visibleAdd" @success="handleReloadData"></add-dialog>
  </div>
</template>

<script>
import { getRecommendList, delRecommend, agree, reject } from "@/api/recommend"
import { fePagination } from "@/util/utils"

import Pagination from 'core/pagination/Index'
import AddDialog from './Add'

export default {
  components: {
    Pagination,
    AddDialog
  },
  data () {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      form: {
        approval: '',
        title: '',
        recommender: ''
      },
      recommendList: [],
      renderRecommendList: [],
      visibleAdd: false,
      currentRow: {}, // 当前操作的行数据
    }
  },
  mounted() {
    this.getRecommendList()
  },
  methods: {
    // 获取所有推荐审核
    getRecommendList () {
      const params = {
        title: this.form.title,
        recommender: this.form.recommender,
        approval: this.form.approval
      }
      getRecommendList(params).then(res => {
        if (res.data.code === 200) {
          this.recommendList = res.data.data
          // 格式化日期
          this.recommendList.forEach(_ => {
            _.createTime = this.$moment(_.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
          })
          this.page.total = this.recommendList.length
          // 分页
          this.getRenderRecommendList()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 分页获取 recommend
    getRenderRecommendList () {
      this.renderRecommendList = fePagination(this.recommendList, this.page.pageSize, this.page.pageNum)
    },
    // 分页方法
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getRenderRecommendList()
    },
    handleCurrentChange (val) {
      this.page.pageNum = val
      this.getRenderRecommendList()
    },
    // 查询
    handleSearch () {
      this.getRecommendList()
    },
    // 添加
    handleAdd () {
      this.visibleAdd = true
    },
    // 删除
    handleDel (row) {
      delRecommend({ id: row.id }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.handleReloadData()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 审批通过
    handleAgree (row) {
      agree({ id: row.id }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.handleReloadData()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 审批不通过
    handleReject (row) {
      reject({ id: row.id }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
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
      this.getRecommendList()
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
