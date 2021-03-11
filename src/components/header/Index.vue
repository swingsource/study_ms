<template>
  <div class="header">
    <div class="left">
      <img src="./logo.png" alt="" />
      <span class="title">山茶籽网管理系统</span>
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
              <i class="el-icon-check" v-if="currentTheme === 'dark'"></i>
              暗黑模式</el-dropdown-item
            >
            <el-dropdown-item
              @click.native="handleSwitchTheme('light')"
              class="i-item"
            >
              <i class="el-icon-check" v-if="currentTheme === 'light'"></i
              >高亮模式
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
              <i class="el-icon-check" v-if="currentLayout === 'tra'"></i
              >侧边栏式
            </el-dropdown-item>
            <el-dropdown-item
              @click.native="handleSwitchLayout('card')"
              class="i-item"
            >
              <i class="el-icon-check" v-if="currentLayout === 'card'"></i
              >卡片式
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
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      themeType: false,
      currentTheme: this.$store.state.theme,
      currentLayout: this.$store.state.layout,
    }
  },
  computed: {
    ...mapState(['theme', 'layout']),
  },
  watch: {
    theme(nv) {
      this.currentTheme = nv
    },
    layout(nv) {
      this.currentLayout = nv
    },
  },
  methods: {
    ...mapMutations(['SET_THEME', 'SET_LAYOUT']),
    handleSwitchTheme(theme) {
      document.documentElement.setAttribute('theme', theme)
      this.SET_THEME(theme)
    },
    // 切换布局
    handleSwitchLayout(layout) {
      this.SET_LAYOUT(layout)
      this.$router.push(`/${layout}`)
    },
  },
}
</script>

<style scoped lang="stylus">
.header
  padding 0 20px
  height 100%
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
  background var(--color-block)
  .left
    display flex
    align-items center
    img
      width 32px
      height 32px
    .title
      margin-left 12px
      font-size 20px
      color var(--font-color-title)
  .right
    display flex
    align-items center
    .theme .icon, .layout .icon
      margin-right 20px
      font-size 16px
      cursor pointer
      color var(--font-color-icon)
    .layout .icon
      font-size 20px
    .avatar
      margin-right 8px
      width 22px
      height 22px
      border-radius 50%
      background var(--color-primary)
      cursor pointer
    .username
      font-size var(--font-size-normal)
      color var(--font-color-desc)
      cursor pointer
// 下拉菜单样式
.i-item
  display flex
  flex-flow row nowrap
  justify-content flex-end
  align-items center
  .el-icon-check
    color var(--color-primary)
</style>
