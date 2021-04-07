<template>
  <div class="index">
    <my-dialog v-model="currentVisible" :title="title">
      <div slot="content">
        <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :auto-upload="true"
            :on-success="handleSuccess"
            :on-change="beforeUpload"
            :http-request="handleUpload">
          <img v-if="currentImgUrl" :src="currentImgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import { upload } from "@/api/utils"

import MyDialog from 'core/dialog/Index'

export default {
  name: "Index",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '上传文件'
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'visible',
    event: 'updateVisible'
  },
  components: {
    MyDialog
  },
  data () {
    return {
      currentVisible: this.visible,
      file: '',
      currentImgUrl: this.imgUrl
    }
  },
  watch: {
    visible (nv) {
      this.currentVisible = nv
    },
    currentVisible (nv) {
      this.$emit('updateVisible', nv)
    },
    imgUrl (nv) {
      this.currentImgUrl = nv
    }
  },
  methods: {
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
    handleUpload () {
      const fd = new FormData()
      fd.append('file', this.file.raw)
      upload(fd).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.currentImgUrl = res.data.data
          this.$emit('uploadSuccess', this.currentImgUrl)
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    handleSuccess () {},
  }
}
</script>

<style scoped lang="stylus">
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
