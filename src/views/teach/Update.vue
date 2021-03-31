<template>
  <my-dialog :title="title" v-model="currentVisible">
    <div slot="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="教程名称">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="教程类型">
          <el-select v-model="form.type" placeholder="请选择教程类型">
            <el-option label="前端入门" value="前端入门"></el-option>
            <el-option label="前端进阶" value="前端进阶"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
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
import { updateTeach } from '@/api/teach'

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
      title: '修改教程',
      currentVisible: this.visible,
      form: {
        id: this.row.id,
        name: this.row.name,
        type: this.row.type,
        author: this.row.author,
        introduction: this.row.introduction
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
        this.form.type = nv.type
        this.form.name = nv.name
        this.form.author = nv.author
        this.form.introduction = nv.introduction
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
          updateTeach(this.form).then(res => {
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
