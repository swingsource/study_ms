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
          <el-select v-model="form.parentId" placeholder="请选择一级目录" style="margin-left: 10px;">
            <el-option v-for="(teach, index) of levelOneList"
                       :key="index"
                       :label="teach.name"
                       :value="teach.id">
            </el-option>
          </el-select>
          <el-select v-model="form.id" placeholder="请选择二级目录" style="margin-left: 10px;">
            <el-option v-for="(teach, index) of levelTwoList"
                       :key="index"
                       :label="teach.name"
                       :value="teach.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="handleAdd">新增内容</el-button>
          <el-button type="primary" size="medium" @click="handleUpdate">修改内容</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content-wrapper">
      <div id="content"></div>
    </div>
  </div>
</template>

<script>
import { getTeachList } from "@/api/teach"
import { getChapterList } from "@/api/chapter"
import { getContent, updateContent, addContent } from "@/api/content"

import E from 'wangeditor'
const editor = new E('div#content')

export default {
  name: "Index",
  data () {
    return {
      form: {
        teachId: '',
        parentId: '',
        id: ''
      },
      teachList: [],
      levelOneList: [],
      levelTwoList: [],
      currentContent: {},
    }
  },
  watch: {
    'form.teachId' (nv) {
      // 切换教程
      this.form.parentId = ''
      this.form.id = ''
      this.initEditor()
      this._getChapterListSimple()
    },
    'form.parentId' (nv) {
      // 切换一级目录
      this.form.id = ''
      this.initEditor()
      this._getLevel2ListSimple()
    },
    'form.id' (nv) {
      if (nv) {
        this.initEditor()
        this._getContent()
      }
    },
  },
  mounted () {
    // 获取默认的teachId parentId id
    let { teachId = '', parentId = '', id = '' } = this.$route.params
    this.form.teachId = teachId
    this.form.parentId = parentId
    this.form.id = id

    // 根据路由带的参数选出当前所在目录
    this._getTeachListAndChapterList()

    // 创建编辑器
    let height = document.getElementsByClassName('content-wrapper')[0].clientHeight
    editor.config.height = height - 50
    editor.config.zIndex = 0
    editor.i18next = window.i18next
    editor.create()
  },
  methods: {
    // 获取教程列表
    _getTeachList () {
      if (!this.form.teachId) {
        getTeachList({}).then(res => {
          if (res.data.code === 200) {
            this.teachList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
        return Promise.reject('请先选择教程，才能编辑内容')
      }
      return getTeachList({}).then(res => {
        if (res.data.code === 200) {
          return res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 根据路由带的参数选出当前所在目录
    _getTeachListAndChapterList () {
      this._getTeachList().then(res => {
        this.teachList = res
        // 根据教程获取目录
        const params = {
          teachId: this.form.teachId
        }
        getChapterList(params).then(res => {
          if (res.data.code === 200) {
            // 得到一级目录菜单
            this.levelOneList = res.data.data
            // 根据一级目录得到二级目录
            this.levelOneList.forEach(item => {
              if (item.id === this.form.parentId) {
                this.levelTwoList = item.children
              }
            })
            // 获取内容
            this._getContent()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }).catch(res => {
        this.$message({
          type: 'warning',
          message: res
        })
      })
    },
    // 单纯的 根据教程获取目录
    _getChapterListSimple() {
      const params = {
        teachId: this.form.teachId
      }
      getChapterList(params).then(res => {
        if (res.data.code === 200) {
          this.levelOneList = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 单纯的 根据一级目录获取二级目录列表
    _getLevel2ListSimple () {
      this.levelOneList.length && this.levelOneList.forEach(item => {
        if (item.id === this.form.parentId) {
          this.levelTwoList = item.children
        }
      })
    },
    // 获取内容
    _getContent () {
      const params = {
        teachId: this.form.teachId,
        chapterId: this.form.id
      }
      getContent(params).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.length) {
            this.currentContent = res.data.data[0]
            // 设置内容
            editor.txt.html(this.currentContent.content)
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 清空富文本编辑器
    initEditor () {
      editor.txt.html('')
    },
    // 新增内容
    handleAdd () {
      const params = {
        teachId: this.form.teachId,
        chapterId: this.form.id,
        content: editor.txt.html()
      }
      addContent(params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 修改内容
    handleUpdate () {
      if (!this.currentContent.id) {
        this.$message({
          type: 'warning',
          message: '请选择二级目录'
        })
        return
      }
      const params = {
        id: this.currentContent.id,
        content: editor.txt.html()
      }
      updateContent(params).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
  }
}
</script>

<style scoped lang="stylus">
.index
  height 100%
  overflow hidden
  display flex
  flex-flow column nowrap
  .operate-bar
    display flex
    flex-flow row nowrap
    justify-content flex-end
    align-items center
  .content-wrapper
    margin-top 10px
    flex 1
</style>
