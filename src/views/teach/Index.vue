<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item label="">
          <el-select v-model="form.teachType" placeholder="教程类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="前端入门" value="前端入门"></el-option>
            <el-option label="前端进阶" value="前端进阶"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.teachName" placeholder="教程名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="handleAdd">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="handleAddByJson">JSON导入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table
          :data="renderTeachList"
          style="width: 100%"
          border>
        <el-table-column
            align="center"
            type="index">
        </el-table-column>
        <el-table-column
            prop="name"
            label="教程名称">
        </el-table-column>
        <el-table-column
            prop="type"
            align="center"
            label="教程类型">
        </el-table-column>
        <el-table-column
            prop="author"
            align="center"
            label="作者"
            width="200">
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            label="添加日期">
        </el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-picture-outline" circle @click="handleUpload(scope.row)"></el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
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
    <!-- 添加教程 -->
    <add-dialog v-model="addVisible" @success="handleReloadData"></add-dialog>
    <!-- 通过json导入教程 -->
    <add-dialog-json v-model="addByJsonVisible" @success="handleReloadData"></add-dialog-json>
    <!-- 修改教程 -->
    <update-dialog v-model="updateVisible" :row="currentRow" @success="handleReloadData"></update-dialog>
    <!-- 上传封面文件 -->
    <my-upload v-model="visibleUploadAdd" @uploadSuccess="handleUploadSuccess" :img-url="currentRow.coverUrl" title="封面"></my-upload>
  </div>
</template>

<script>
import { getTeachList, delTeach, updateTeach } from "@/api/teach"
import { fePagination } from "@/util/utils"
import { mapMutations } from 'vuex'

import Pagination from '@/core/pagination/Index'
import UpdateDialog from './Update'
import AddDialog from './Add'
import AddDialogJson from './AddByJSON'
import MyUpload from 'core/upload/Index'
import {updateBook} from "@/api/book";

export default {
  name: "Index",
  components: {
    Pagination,
    UpdateDialog,
    AddDialog,
    AddDialogJson,
    MyUpload
  },
  data () {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      form: {
        teachType: '',
        teachName: ''
      },
      serverTeachList: [],
      renderTeachList: [],
      updateVisible: false,
      currentRow: {},
      addVisible: false,
      addByJsonVisible: false,
      visibleUploadAdd: false,
    }
  },
  watch: {
    'form.teachType' () {
      this.handleSearch()
    }
  },
  mounted () {
    this.getTeachList()
  },
  methods: {
    ...mapMutations(['SET_CURRENT_NAV']),
    // 获取教程列表
    getTeachList () {
      const params = {
        name: this.form.teachName,
        type: this.form.teachType
      }
      getTeachList(params).then(res => {
        if (res.data.code === 200) {
          this.serverTeachList = res.data.data
          // 格式化日期
          this.serverTeachList.forEach(_ => {
            _.createTime = this.$moment(_.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
          })
          this.page.total = this.serverTeachList.length
          // 前端分页
          this.fePagination(this.serverTeachList)
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 分页
    fePagination () {
      this.renderTeachList = fePagination(this.serverTeachList, this.page.pageSize, this.page.pageNum)
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getTeachList()
    },
    handleCurrentChange (val) {
      this.page.pageNum = val
      this.getTeachList()
    },
    // 手动添加添加教程
    handleAdd () {
      this.addVisible = true
    },
    // 通过json导入数据
    handleAddByJson() {
      // this.$confirm('是否跳转到 导入教程 页面进行导入?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.SET_CURRENT_NAV('shell')
      //   this.$router.push('/tra/shell')
      // }).catch(() => {
      //   //
      // })
      this.addByJsonVisible = true
    },
    // 查询教程
    handleSearch () {
      this.getTeachList()
    },
    // 修改教程
    handleUpdate (row) {
      this.updateVisible = true
      this.currentRow = row
    },
    // 删除教程
    handleDel (row) {
      this.$confirm('确定要删除该教程么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTeach({id: row.id}).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            // 重新加载数据
            this.handleReloadData()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }).catch(() => {
        //
      })
    },
    // 上传图片
    handleUpload (row) {
      this.visibleUploadAdd = true
      this.currentRow = row
      console.log(this.currentRow)
    },
    // 上传图片成功
    handleUploadSuccess (imgUrl) {
      // 更新当前行数据的图片地址
      const params = {
        id: this.currentRow.id,
        coverUrl: imgUrl
      }
      updateTeach(params).then(res => {
        if (res.data.code !== 200) {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        } else {
          this.handleReloadData()
        }
      })
    },
    // 重新加载数据
    handleReloadData () {
      this.form.teachType = ''
      this.form.teachName = ''
      this.getTeachList()
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
