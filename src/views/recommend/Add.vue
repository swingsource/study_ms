<template>
  <my-dialog :title="title" v-model="currentVisible">
    <div slot="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="index">
        <el-form-item label="资源名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="资源地址" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="coverUrl">
          <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :auto-upload="true"
              :on-change="beforeUpload"
              :http-request="handleUpload">
            <img v-if="form.coverUrl" :src="form.coverUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { mapState } from 'vuex'

import MyDialog from 'core/dialog/Index'
import {upload} from "@/api/utils"

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
      file: '',
      form: {
        title: '',
        url: '',
        coverUrl: '',
        introduction: '',
        recommender: this.$store.state.user.username
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
  computed: {
    ...mapState(['user'])
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
    // 上传前的校验
    beforeUpload (file) {
      const isImage = !!['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      this.file = file
    },
    // 上传图片
    handleUpload () {
      const fd = new FormData()
      fd.append('file', this.file.raw)
      upload(fd).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.form.coverUrl = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
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
.index >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.index >>> .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.index >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.index >>> .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
