<template>
  <div class="dialog-wrapper">
    <el-dialog :title="title" :visible.sync="currentVisible" :width="width">
      <slot name="content"></slot>
      <slot name="footer"></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default : '40%'
    }
  },
  model: {
    prop: 'visible',
    event: 'updateDialogVisible'
  },
  data () {
    return {
      currentVisible: this.visible
    }
  },
  watch: {
    currentVisible (nv) {
      this.$emit('updateDialogVisible', nv)
    },
    visible (nv) {
      this.currentVisible = nv
      if (nv) {
        this.$emit('shown')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.dialog-wrapper
  & >>> .el-dialog__header
    padding-top 10px
    background var(--color-block)
  & >>> .el-dialog__title
    font-size var(--font-size-big)
    color var(--font-color-main)
  & >>> .el-dialog__body
    background var(--color-normal)
  & >>> .el-dialog__footer
    background var(--color-normal)
</style>
