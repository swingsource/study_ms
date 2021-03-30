<template>
  <div>
    <ul>
      <li>教程名称：{{teachData.name}}</li>
      <li>作者：{{teachData.author}}</li>
      <li>类别：{{teachData.type}}</li>
      <li>简介：{{teachData.introduction}}</li>
      <li>添加教程请求数量：1 个</li>
      <li>添加目录请求数量：{{this.teachData.data.length}} 个</li>
      <li>添加内容请求数量：{{this.teachData.data.length}} 个</li>
      <el-button type="primary" size="small" @click="handleInsetData">开始导入数据</el-button>
    </ul>
    <el-divider></el-divider>
    <div class="process-wrapper" ref="process">

    </div>
  </div>
</template>

<script>
import { spiderListToTree } from '@/util/utils'
import teachData from '@/assets/spider/htmlBase'

import { addTeach } from "@/api/teach"
import { addChapter } from "@/api/chapter"
import { addContent } from "@/api/content"

export default {
  name: "Index",
  created () {
    this.teachData = teachData
  },
  data () {
    return {
      teachData: {}
    }
  },
  methods: {
    handleInsetData () {
      // 添加教程
      let { name = '', author = '', type = '', introduction = '' } = this.teachData
      const teachParams = {
        name,
        author,
        type,
        introduction
      }

      let node = document.createElement('div')
      node.innerText = '请求添加教程接口。。。'
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
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.process-wrapper div
  font-size 12px
</style>
