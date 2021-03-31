<template>
  <my-dialog :title="title" v-model="currentVisible">
    <div slot="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上级目录" prop="parentName">
          <el-input v-model="form.parentName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序标识" prop="sortIndex">
          <el-input v-model="form.sortIndex" placeholder="非特殊情况，建议使用该默认值0"></el-input>
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
import { addChapter } from "@/api/chapter"

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
      title: '添加目录',
      currentVisible: this.visible,
      form: {
        teachId: this.row.teachId,
        parentId: this.row.parentId,
        parentName: this.row.parentName,
        name: '',
        sortIndex: 0
      },
      rules: {
        name: [
          { required: true, message: '请选择目录名称', trigger: 'blur' }
        ]
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
        this.form.teachId = nv.teachId
        this.form.parentId = nv.parentId
        this.form.parentName = nv.parentName
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
    // 确定添加
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addChapter(this.form).then(res => {
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
    },
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
