<template>
  <div class="index">
    <div class="operate-bar">
      <el-form :inline="true" :model="form">
        <el-form-item label="">
          <el-select v-model="form.teachId" placeholder="请选择教程">
            <el-option v-for="(teach, index) of teachList"
                       :key="index"
                       :label="teach.name"
                       :value="teach.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="handleAdd('levelOne')">添加一级目录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <el-table
          :data="chapterList"
          border
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          style="width: 100%">
        <el-table-column
            align="center"
            type="index">
        </el-table-column>
        <el-table-column
            prop="name"
            align="left"
            label="目录名称">
        </el-table-column>
        <el-table-column
            prop="createTime"
            align="center"
            label="创建时间">
        </el-table-column>
        <el-table-column
            prop="sortIndex"
            align="center"
            width="120px"
            label="排序标识">
        </el-table-column>
        <el-table-column label="操作" align="right" width="180px">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-plus" circle @click="handleAdd(scope.row)" v-if="scope.row.parentId - 0 === 0"></el-button>
            <el-button type="success" size="mini" icon="el-icon-notebook-2" circle @click="handleAddContent(scope.row)" v-if="scope.row.parentId - 0 !== 0"></el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
            <el-button type="warning" size="mini" icon="el-icon-delete" circle @click="handleDel(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="handleDelForce(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 增加目录 -->
    <add-dialog v-model="addVisible" :row="currentRow" @success="handleReloadData"></add-dialog>
    <!-- 修改目录 -->
    <update-dialog v-model="updateVisible" :row="currentRow" @success="handleReloadData"></update-dialog>
  </div>
</template>

<script>
import { getTeachList } from "@/api/teach"
import { getChapterList } from "@/api/chapter"
import { mapMutations } from 'vuex'

import AddDialog from './Add'
import UpdateDialog from './Update'

export default {
  name: "Index",
  components: {
    AddDialog,
    UpdateDialog
  },
  data () {
    return {
      teachList: [],
      chapterList: [],
      form: {
        teachId: ''
      },
      updateVisible: false,
      currentRow: {},
      addVisible: false,
    }
  },
  watch: {
    'form.teachId' () {
      this.handleSearch()
    }
  },
  mounted () {
    this._getTeachList()
  },
  methods: {
    ...mapMutations(['SET_CURRENT_NAV']),
    // 获取教程列表
    _getTeachList () {
      getTeachList({}).then(res => {
        if (res.data.code === 200) {
          this.teachList = res.data.data
        }
      })
    },
    // 获取某个教程下面的目录
    _getChapterList () {
      if (!this.form.teachId) {
        this.$message({
          type: 'warning',
          message: '请先选择一个教程'
        })
        return
      }
      const params = {
        teachId: this.form.teachId
      }
      getChapterList(params).then(res => {
        if (res.data.code === 200) {
          this.chapterList = res.data.data
          // 格式化数据
          this.chapterList.forEach(_ => {
            _.createTime = this.$moment(_.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
            if (_.children && _.children.length) {
              _.children.forEach(item => {
                item.createTime = this.$moment(item.createTime - 0).format('YYYY[年]MM[月]DD[日] hh:mm:ss')
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 根据教程 搜索目录列表
    handleSearch () {
      this._getChapterList()
    },
    // 添加目录
    handleAdd (row) {
      if (!this.form.teachId) {
        this.$message({
          type: 'warning',
          message: '请先选择一个教程！'
        })
        return
      }
      if (row === 'levelOne') {
        // 添加一级目录
        this.currentRow = {
          teachId: this.form.teachId,
          parentId: '0',
          parentName: '',
        }
      } else {
        // 添加二级目录
        this.currentRow = {
          teachId: this.form.teachId,
          parentId: row.id,
          parentName: row.name
        }
      }
      this.addVisible = true
    },
    // 添加内容
    handleAddContent (row) {
      this.$router.push({
        path: '/tra/content',
        query: {
          teachId: this.form.teachId,
          id: row.id
        }
      })
      this.SET_CURRENT_NAV('content')
    },
    // 修改目录
    handleUpdate (row) {
      this.currentRow = row
      this.updateVisible = true
    },
    // 删除目录 - 有子目录则不能删除
    handleDel (row) {},
    // 删除目录 - 强制删除
    handleDelForce (row) {},
    // 重新加载数据
    handleReloadData () {
      this.form.teachType = ''
      this.form.teachName = ''
      this._getChapterList()
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
