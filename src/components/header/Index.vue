<template>
  <div class="header">
    <div class="left">
      <img src="./logo.png" alt="" />
      <span class="title">MS蓝狐</span>
    </div>
    <div class="right">
      <div class="theme">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="icon iconfont">&#xe618;</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native="handleSwitchTheme('dark')"
              class="i-item"
            >
              <i class="el-icon-check"></i>
              暗黑模式</el-dropdown-item
            >
            <el-dropdown-item
              @click.native="handleSwitchTheme('light')"
              class="i-item"
            >
              <i class="el-icon-check"></i>高亮模式
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="layout">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="icon iconfont">&#xe6be;</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native="handleSwitchLayout('tra')"
              class="i-item"
            >
              <i class="el-icon-check"></i>侧边栏式
            </el-dropdown-item>
            <el-dropdown-item
              @click.native="handleSwitchLayout('card')"
              class="i-item"
            >
              <i class="el-icon-check"></i>卡片式
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="avatar"></div>
      <div class="username">我在等风</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      themeType: false,
    }
  },
  methods: {
    ...mapMutations(['SET_THEME']),
    handleSwitchTheme(theme) {
      document.documentElement.setAttribute('theme', theme)
      this.SET_THEME(theme)
    },
    handleSwitchLayout(layout) {
      this.$router.push(`/${layout}`)
    },
  },
}
</script>

<style scoped lang="stylus">
.header
  margin 0 20px
  height 100%
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
  .left
    display flex
    align-items center
    img
      width 36px
      height 36px
    .title
      margin-left 12px
      font-size 20px
  .right
    display flex
    align-items center
    .theme .icon, .layout .icon
      margin-right 20px
      font-size 16px
      cursor pointer
    .layout .icon
      font-size 20px
    .avatar
      margin-right 8px
      width 22px
      height 22px
      border-radius 50%
      background green
    .username
      font-size 14px
// 下拉菜单样式
.i-item
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
</style>
