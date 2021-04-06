<template>
  <my-dialog :title="title" v-model="currentVisible">
    <div slot="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="资源名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="资源地址" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input type="textarea" :rows="4" v-model="form.introduction" placeholder=""></el-input>
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
import { addRecommend } from '@/api/recommend'

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
    }
  },
  model: {
    prop: 'visible',
    event: 'updateVisible'
  },
  data () {
    return {
      title: '添加资源',
      currentVisible: this.visible,
      form: {
        title: '',
        url: '',
        introduction: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入资源url', trigger: 'blur' }
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
          addRecommend(this.form).then(res => {
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
