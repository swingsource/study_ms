<template>
  <my-dialog :title="title" v-model="currentVisible">
    <div slot="content">
      <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :on-change="handleChange"
          :show-file-list="false"
          :multiple="false"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取JSON文件</el-button>
      </el-upload>
      <!-- 批量添加信息打印 -->
      <div class="process-wrapper" ref="process"></div>
    </div>
  </my-dialog>
</template>

<script>
import { addTeach } from "@/api/teach"
import { spiderListToTree} from '@/util/utils'

import MyDialog from 'core/dialog/Index'
import { addChapter } from "@/api/chapter"
import { addContent } from "@/api/content"

export default {
  name: "Add",
  components: {
    MyDialog
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  model: {
    prop: 'visible',
    event: 'updateVisible'
  },
  data () {
    return {
      title: 'JSON导入',
      currentVisible: this.visible,
      teachData: {}
    }
  },
  watch: {
    visible (nv) {
      this.currentVisible = nv
      // 组件显示的时候，先初始化
      if (nv) {
        this.init()
      }
    },
    currentVisible (nv) {
      this.$emit('updateVisible', nv)
    }
  },
  methods: {
    // 初始化
    init () {
      this.$refs['form'] && this.$refs['form'].resetFields()
    },
    // 取消
    handleCancel () {
      this.currentVisible = false
    },
    handleChange (file) {
      // json文件 => json对象
      let reader = new FileReader()
      reader.onload = async (e) => {
        try {
          this.teachData = JSON.parse(e.target.result)
          this.handleInsetData(this.teachData)
        } catch (err) {
          this.$message({
            type: 'error',
            message: err.message
          })
        }
      }
      reader.readAsText(file.raw)
    },
    // 将解析后的数据全部添加
    handleInsetData () {
      // 判断，如果该教程已经存在，则不能添加
      // 添加教程
      let { name = '', author = '', type = '', introduction = '' } = this.teachData
      const teachParams = {
        name,
        author,
        type,
        introduction
      }

      let node = document.createElement('div')
      node.innerText = '开始添加教程。。。'
      node.style.fontSize = '12px'
      this.$refs['process'].appendChild(node)

      addTeach(teachParams).then(res => {
        if (res.data.code === 200) {
          // 添加成功，打印信息
          let node = document.createElement('div')
          node.innerText = `添加教程 ${name} 成功！`
          node.style.fontSize = '12px'
          node.style.color = 'green'
          this.$refs['process'].appendChild(node)

          // 获取添加的教程的id
          let addedTeachId = res.data.data[0]

          // 目录的树结构数据
          const chapterTree = spiderListToTree(this.teachData.data)

          //  遍历树 添加一级、二级目录
          chapterTree.forEach(item => {
            // 一级
            const paramsL1 = {
              teachId: addedTeachId,
              parentId: '0',
              name: item.name,
              sortIndex: item.parentSortIndex
            }
            setTimeout(() => {
              addChapter(paramsL1).then(res => {
                if (res.data.code === 200) {
                  // 添加成功，打印信息
                  let node = document.createElement('div')
                  node.innerText = `添加一级目录 ${item.name} 成功！`
                  node.style.fontSize = '12px'
                  node.style.color = 'green'
                  this.$refs['process'].appendChild(node)

                  // 获取一级目录的id
                  let addedChapterL1Id = res.data.data[0]

                  // 添加二级目录
                  item.children && item.children.forEach(chapter2 => {
                    const paramsL2 = {
                      teachId: addedTeachId,
                      parentId: addedChapterL1Id,
                      name: chapter2.name,
                      sortIndex: chapter2.sortIndex
                    }
                    setTimeout(() => {
                      addChapter(paramsL2).then(res => {
                        if (res.data.code === 200) {
                          // 添加成功，打印信息
                          let node = document.createElement('div')
                          node.innerText = `添加二级目录 ${chapter2.name} 成功！`
                          node.style.fontSize = '12px'
                          node.style.color = 'green'
                          this.$refs['process'].appendChild(node)

                          // 获取二级目录id
                          let addedChapterL2Id = res.data.data[0]

                          // 添加内容
                          const paramsContent = {
                            teachId: addedTeachId,
                            chapterId: addedChapterL2Id,
                            content: chapter2.content
                          }
                          addContent(paramsContent).then(res => {
                            if (res.data.code === 200) {
                              // 添加成功，打印信息
                              let node = document.createElement('div')
                              node.innerText = `添加二级目录的详细内容成功！`
                              node.style.fontSize = '12px'
                              node.style.color = 'green'
                              this.$refs['process'].appendChild(node)
                            } else {
                              // 添加失败，打印信息
                              let node = document.createElement('div')
                              node.innerText = `添加二级目录的详细内容失败！`
                              node.style.fontSize = '12px'
                              node.style.color = 'red'
                              this.$refs['process'].appendChild(node)
                            }
                          })
                        } else {
                          // 添加失败，打印信息
                          let node = document.createElement('div')
                          node.innerText = `添加二级目录 ${chapter2.name} 失败！`
                          node.style.fontSize = '12px'
                          node.style.color = 'red'
                          this.$refs['process'].appendChild(node)
                        }
                      })
                    }, 200)
                  })
                } else {
                  // 添加失败，打印信息
                  let node = document.createElement('div')
                  node.innerText = `添加一级目录 ${item.name} 失败！`
                  node.style.fontSize = '12px'
                  node.style.color = 'red'
                  this.$refs['process'].appendChild(node)
                }
              })
            }, 200)
          })
        } else {
          // 添加失败，打印信息
          let node = document.createElement('div')
          node.innerText = `添加教程《${name}》失败：${res.data.msg}`
          node.style.fontSize = '12px'
          node.style.color = 'red'
          this.$refs['process'].appendChild(node)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.btn-wrapper
  display flex
  flex-flow row nowrap
  justify-content flex-end
  align-items center
>>> .el-select
  width 100%
.process-wrapper
  margin 10px 0
  height 240px
  overflow-y auto
</style>
