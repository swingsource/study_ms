<template>
  <my-dialog :title="title" v-model="currentVisible" width="50%">
    <div slot="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="书籍名称" prop="title">
              <el-input v-model="form.title" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="书籍标签" prop="btn">
              <el-input v-model="form.btn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="作者简介">
              <el-input type="textarea" :rows="3" v-model="form.authorIntroduce"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="书籍特色">
              <el-input type="textarea" :rows="4" v-model="form.features"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所有章节">
              <el-input type="textarea" :rows="8" v-model="form.chapter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详情">
              <el-input type="textarea" :rows="8" v-model="form.detail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="购买地址">
              <el-input type="textarea" :rows="3" v-model="form.buySelect"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
import { updateBook } from '@/api/book'

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
      title: '修改书籍',
      currentVisible: this.visible,
      form: {
        id: this.row.id,
        title: this.row.title,
        author: this.row.author,
        btn: this.row.btn,
        authorIntroduce: this.row.authorIntroduce,
        features: this.row.features,
        chapter: this.row.chapter,
        detail: this.row.detail,
        buySelect: this.row.buySelect
      },
      rules: {
        title: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
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
        this.form.buySelect = nv.buySelect
        this.form.chapter = nv.chapter
        this.form.features = nv.features
        this.form.authorIntroduce = nv.authorIntroduce
        this.form.btn = nv.btn
        this.form.author = nv.author
        this.form.detail = nv.detail
        this.form.title = nv.title
      },
      deep: true
    },
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
    // 确定修改
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updateBook(this.form).then(res => {
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
