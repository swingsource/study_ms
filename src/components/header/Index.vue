<template>
  <div class="header">
    <div class="left">
      <img src="./logo.png" alt="" />
      <span class="title">elementui test</span>
      <!-- card模式下，进入详情页面之后才会显示出来的导航菜单 -->
      <div class="nav-card-wrapper">
        <div class="current-nav">
          {{ currentNav }} <i class="el-icon-arrow-down"></i>
        </div>
        <div class="nav-list">
          <div
            class="row"
            v-for="(row, rindex) of currentNavList"
            :key="`row-${rindex}`"
          >
            <div
              class="nav-card"
              v-for="(nav, index) of row"
              :key="`nav-${index}`"
              :class="{ checking: checking === `row-${rindex}-nav-${index}` }"
              @mouseover="handleMouseover(`row-${rindex}-nav-${index}`)"
              @mouseout="handleMouseout(`row-${rindex}-nav-${index}`)"
              @click="handleClickNav(nav)"
            >
              <div
                class="nav-bg"
                :style="{
                  background: `url(${nav.img}) no-repeat`,
                  'background-size': 'cover',
                }"
              ></div>
              <div class="nav-name">{{ nav.name }}</div>
            </div>
          </div>
        </div>
      </div>
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
      <div class="username">
        <el-dropdown>
          <span class="el-dropdown-link">
            我在等风
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLogout" class="i-item"
              >退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { navList } from '@/config/navList'
import { colNum } from '@/config/nav.config'
import { groupArray } from '@/util/utils'

export default {
  data() {
    return {
      currentTheme: this.$store.state.theme,
      currentLayout: this.$store.state.layout,
      currentNav: '', // 当前路由
      currentNavList: [],
      checking: '', // 鼠标滑过路由
    }
  },
  computed: {
    ...mapState(['theme', 'layout']),
  },
  mounted() {
    this.currentNavList = groupArray(navList, colNum)
    this.currentNav = this.$route.meta.navName
  },
  watch: {
    theme(nv) {
      this.currentTheme = nv
    },
    layout(nv) {
      this.currentLayout = nv
    },
    $route(nv) {
      this.currentNav = nv.meta.navName
    },
  },
  methods: {
    ...mapMutations(['SET_THEME', 'SET_LAYOUT']),
    // 切换主题
    handleSwitchTheme(theme) {
      document.documentElement.setAttribute('theme', theme)
      this.SET_THEME(theme)
    },
    // 切换布局
    handleSwitchLayout(layout) {
      this.SET_LAYOUT(layout)
      this.$router.push(`/${layout}`)
    },
    // 鼠标滑过navcard
    handleMouseover(ref) {
      this.checking = ref
    },
    handleMouseout(ref) {
      this.checking = ''
    },
    // 点击nav
    handleClickNav(nav) {
      this.$router.push(`/card/${nav.path}`)
    },
    // 退出登录
    handleLogout() {
      this.$router.push('/login')
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
      margin 0 60px 0 12px
      font-size 20px
      color var(--font-color-main)
  .right
    display flex
    align-items center
    .theme .icon, .layout .icon
      margin-right 20px
      font-size 16px
      cursor pointer
      color var(--font-color-placeholder)
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
      color var(--font-color-sub)
      cursor pointer
// 下拉菜单样式
.i-item
  display flex
  flex-flow row nowrap
  justify-content flex-end
  align-items center
  .el-icon-check
    color var(--color-primary)
// card导航栏
.nav-card-wrapper
  position relative
  font-size var(--font-size-normal)
  color var(--font-color-main)
  cursor pointer
  .current-nav
    //
  .nav-list
    position absolute
    left -30px
    top 30px
    padding 20px
    background var(--color-block)
    border-radius 4px
    border 1px solid var(--color-border)
    box-shadow 0 0 10px 3px var(--color-block)
    &::before
      position absolute
      left 42px
      top -12px
      content ''
      width 0
      height 0
      border-width 6px
      border-style solid
      border-color transparent transparent var(--color-border) transparent
    .row
      display flex
      flex-flow row nowrap
      justify-content flex-start
      &:not(:first-child)
        margin-top 20px
      .nav-card
        width 66px
        height 90px
        &:not(:first-child)
          margin-left 32px
        &:hover
          background-color var(--color-primary-lighter)
        &.checking
          transform scale3d(.9, .9, 1)
          transition all .2s linear
        .nav-bg
          width 66px
          height 66px
          border-radius 10px
          overflow hidden
        .nav-name
          line-height 34px
          text-align center
          font-size var(--font-size-normal)
          color var(--font-color-main)
          background var(--color-block)
</style>
