<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item label="">
          <el-select v-model="form.teachId" placeholder="所属教程">
            <el-option label="全部教程" value=""></el-option>
            <el-option v-for="(item, index) of teachList"
                       :key="index"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.creator" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table
          :data="renderList"
          border
          style="width: 100%">
        <el-table-column
            align="center"
            width="45px"
            type="index">
        </el-table-column>
        <el-table-column
            prop="creator"
            align="center"
            label="用户名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="teachId"
            align="center"
            label="所属教程"
            :show-overflow-tooltip="true"
            width="180">
          <template slot-scope="scope">
            <span v-for="(teach, index) of teachList" :key="index" v-if="teach.id === scope.row.teachId">{{teach.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            width="240px"
            label="时间">
        </el-table-column>
        <el-table-column
            prop="comment"
            align="center"
            :show-overflow-tooltip="true"
            label="内容">
        </el-table-column>
        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
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
  </div>
</template>

<script>
import { getCommentList, addComment, delComment } from "@/api/comment"
import { getTeachList } from "@/api/teach"
import { fePagination } from "@/util/utils"

import Pagination from 'core/pagination/Index'

export default {
  components: {
    Pagination
  },
   data () {
     return {
       form: {
         teachId: '',
         creator: ''
       },
       page: {
         pageSize: 10,
         pageNum: 1,
         total: 0
       },
       teachList: [],
       serverList: [],
       renderList: [],
     }
   },
   mounted () {
    this._getTeachList()
     this._getCommentList()
   },
   methods: {
     // 获取教程列表
     _getTeachList () {
       getTeachList({}).then(res => {
         if (res.data.code === 200) {
           this.teachList = res.data.data
         }
       })
     },
     // 获取评论列表
     _getCommentList () {
       const params = {
         teachId: this.form.teachId,
         creator: this.form.creator
       }
       getCommentList(params).then(res => {
         if (res.data.code === 200) {
           this.$message({
             type: 'success',
             message: res.data.msg
           })
           this.serverList = res.data.data
           // 格式化日期
           this.serverList.forEach(_ => {
             _.createTime = this.$moment(_.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
           })
           // 分页
           this.page.total = this.serverList.length
           this.getRenderList()
           // 分页
         } else {
           this.$message({
             type: 'error',
             message: res.data.msg
           })
         }
       })
     },
     // 分页
     getRenderList () {
       this.renderList = fePagination(this.serverList, this.page.pageSize, this.page.pageNum)
     },
     handleSizeChange (val) {
       this.page.pageSize = val
       this._getCommentList()
     },
     handleCurrentChange (val) {
       this.page.pageNum = val
       this._getCommentList()
     },
     // 搜索
     handleSearch () {
       this._getCommentList()
     },
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
