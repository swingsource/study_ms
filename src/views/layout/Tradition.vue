<template>
  <div class="tradition">
    <div class="header-wrapper">
      <i-header></i-header>
    </div>
    <div
      class="main-wrapper"
      ref="mainWrapper"
      style="--bg-color-normal: var(--color-error);--bg-color-block:var(--color-block);--text-color:var(--font-color-main);"
    >
      <div class="left">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          :background-color="color_block"
          :text-color="color_font"
          :active-text-color="color_font"
        >
          <el-menu-item
            v-for="(item, index) of navList"
            :key="index"
            :index="index + ''"
            @click="handleClickNav(item.path)"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import IHeader from 'cps/header/Index'

import { mapState } from 'vuex'
import { navList } from '@/config/navList'

export default {
  data() {
    return {
      color_normal: '',
      color_block: '',
      color_font: '',
      navList,
    }
  },
  components: {
    IHeader,
  },
  mounted() {
    this.color_normal = this.$refs['mainWrapper'].style.getPropertyValue(
      '--bg-color-normal'
    )
    this.color_block = this.$refs['mainWrapper'].style.getPropertyValue(
      '--bg-color-block'
    )
    this.color_font = this.$refs['mainWrapper'].style.getPropertyValue(
      '--text-color'
    )
  },
  computed: {
    ...mapState(['theme']),
  },
  watch: {
    theme(nv) {
      this.color_normal = this.$refs['mainWrapper'].style.getPropertyValue(
        '--bg-color-normal'
      )
      this.color_block = this.$refs['mainWrapper'].style.getPropertyValue(
        '--bg-color-block'
      )
      this.color_font = this.$refs['mainWrapper'].style.getPropertyValue(
        '--text-color'
      )
    },
  },
  methods: {
    handleClickNav(path) {
      this.$router.push(`/tra/${path}`)
    },
  },
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
      overflow auto
      background var(--color-block)
    .right
      flex 1
      padding 20px
      overflow auto
      background var(--color-normal)
// 样式穿透element
// 修改菜单激活状态下的背景色
>>> .el-submenu__title:hover, >>> .el-menu-item:hover
  background var(--color-primary-lighter) !important
>>> .is-active
  background var(--color-primary) !important
// 去掉menu右边框
>>> .el-menu
  border-right none
</style>
