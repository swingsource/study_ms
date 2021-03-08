<template>
  <div class="tradition">
    <div class="header-wrapper">
      <i-header></i-header>
    </div>
    <div class="main-wrapper">
      <div class="left">我是左侧</div>
      <div class="right">我是右侧，内容显示区域</div>
    </div>
  </div>
</template>

<script>
import IHeader from 'cps/header/Index'

export default {
  data() {
    return {}
  },
  components: {
    IHeader,
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
    background #cccccc
    .left
      width 240px
    .right
      flex 1
      background green
</style>
