<template>
  <div class="card">
    <div class="header-wrapper">
      <i-header></i-header>
    </div>
    <div class="main-wrapper">
      <router-view></router-view>
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
.card
  height 100%
  overflow hidden
  .header-wrapper
    height 60px
  .main-wrapper
    height calc(100% - 60px - 40px)
    overflow-y auto
    padding 40px
    background var(--color-normal)
</style>
