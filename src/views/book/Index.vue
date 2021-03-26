<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item>
          <el-input v-model="form.title" placeholder="书籍名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.author" placeholder="作者"></el-input>
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
          :data="renderBookList"
          :header-cell-style="{'background': 'var(--color-primary-border)'}"
          border
          style="width: 100%">
        <el-table-column
            align="center"
            type="index">
        </el-table-column>
        <el-table-column
            prop="title"
            align="center"
            label="书籍名称">
        </el-table-column>
        <el-table-column
            prop="author"
            align="center"
            label="作者">
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="scope">
            <el-tag size="small"
                    v-for="(item, index) of scope.row.btn.split(',')"
                    :key="index"
                    style="margin-right: 4px;"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            label="创建时间">
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
            <el-button type="warning" size="mini" icon="el-icon-view" circle @click="handlePreview(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="handleDel(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页组件-->
    <pagination :page-size="page.pageSize"
                :page-num="page.pageNum"
                :total="page.total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
    >
    </pagination>
    <!-- 添加书籍 -->
    <add-dialog v-model="visibleAdd" @success="handleReloadData"></add-dialog>
    <!-- 预览书籍 -->
    <preview-dialog v-model="visiblePreview" :row="currentRow"></preview-dialog>
    <!-- 修改书籍 -->
    <update-dialog v-model="visibleUpdate" :row="currentRow" @success="handleReloadData"></update-dialog>
  </div>
</template>

<script>
import { getBookList, delBook } from "@/api/book"
import { fePagination } from "@/util/utils"

import Pagination from 'core/pagination/Index'
import AddDialog from './Add'
import PreviewDialog from './Preview'
import UpdateDialog from './Update'

export default {
  name: "Index",
  components: {
    Pagination,
    AddDialog,
    PreviewDialog,
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
        title: '',
        author: ''
      },
      serverBookList: [],
      renderBookList: [],
      visibleAdd: false,
      visiblePreview: false,
      visibleUpdate: false,
      currentRow: {}, // 当前操作的行数据
    }
  },
  mounted () {
    this.getAllBookList()
  },
  methods: {
    // 获取全部书籍数据
    getAllBookList () {
      const params = {
        title: this.form.title,
        author: this.form.author
      }
      getBookList(params).then(res => {
        if (res.data.code === 200) {
          this.serverBookList = res.data.data
          this.page.total = this.serverBookList.length
          // 格式化数据
          this.serverBookList.forEach(item => {
            item.createTime = this.$moment(item.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
          })
          this.getRenderBookList()
        }
      })
    },
    // 获得分页数据
    getRenderBookList () {
      this.renderBookList = fePagination(this.serverBookList, this.page.pageSize, this.page.pageNum)
    },
    // 分页方法
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getRenderBookList()
    },
    handleCurrentChange (val) {
      this.page.pageNum = val
      this.getRenderBookList()
    },
    // 查询
    handleSearch () {
      this.getAllBookList()
    },
    // 添加
    handleAdd () {
      this.visibleAdd = true
    },
    // 预览
    handlePreview (row) {
      this.visiblePreview = true
      this.currentRow = row
    },
    // 修改
    handleUpdate (row) {
      this.visibleUpdate = true
      this.currentRow = row
    },
    // 删除
    handleDel (row) {
      delBook({id: row.id}).then(res => {
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
      this.form.title = ''
      this.form.author = ''
      this.getAllBookList()
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
