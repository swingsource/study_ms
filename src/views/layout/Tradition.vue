<template>
  <div class="tradition">
    <div class="header-wrapper">
      <i-header></i-header>
    </div>
    <div class="main-wrapper"
         ref="mainWrapper"
         :style="`--bg-color-normal: var(--color-error);--bg-color-block:var(--color-block)`">
      <div class="left">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :background-color="color_block"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">我是右侧，内容显示区域</div>
    </div>
  </div>
</template>

<script>
import IHeader from 'cps/header/Index'

export default {
  data() {
    return {
      color_normal: document.documentElement,
      color_block: this.$refs['mainWrapper'].style.getPropertyValue('--bg-color-block'),
      theme: this.$store.state.theme
    }
  },
  components: {
    IHeader,
  },
  mounted() {
    console.log(this.$refs['mainWrapper'])
    console.log(this.$refs['mainWrapper'].style)
    console.log(this.$refs['mainWrapper'].style.getPropertyValue('--bg-color-normal'))
  },
  watch: {
    theme (nv) {
      this.color_normal = this.$refs['mainWrapper'].style.getPropertyValue('--bg-color-normal')
      this.color_block = this.$refs['mainWrapper'].style.getPropertyValue('--bg-color-block')
      console.log(this.color_block)
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="stylus">
.tradition
  height 100%
  .header-wrapper
    height 60px
  .main-wrapper
    height calc(100% - 60px)
    display flex
    flex-flow row nowrap
    .left
      width 240px
      background var(--color-normal)
    .right
      flex 1
      background var(--color-normal)
      border-left 1px solid var(--color-border)
</style>
