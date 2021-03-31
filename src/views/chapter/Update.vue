<template>
  <my-dialog :title="title" v-model="currentVisible">
    <div slot="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="目录名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序标识">
          <el-input v-model="form.sortIndex"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <div class="btn-wrapper">
        <el-button size="medium" @click="handleCancel" style="margin-right: 20px;">取消</el-button>
        <el-button type="primary" size="medium" @click="handleSubmit">确定</el-button>
      </div>
    </div>
  </my-dialog>
</template>

<script>
import { updateChapter } from "@/api/chapter"

import MyDialog from 'core/dialog/Index'

export default {
  name: "Add",
  components: {
    MyDialog
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: 'visible',
    event: 'updateVisible'
  },
  data () {
    return {
      title: '修改目录',
      currentVisible: this.visible,
      form: {
        id: this.row.id,
        name: this.row.name,
        sortIndex: this.row.sortIndex
      }
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
    },
    row: {
      handler (nv) {
        this.form.id = nv.id
        this.form.name = nv.name
        this.form.sortIndex = nv.sortIndex
      },
      deep: true
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
    // 修改
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updateChapter(this.form).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.currentVisible = false
              this.$emit('success')
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
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
</style>
