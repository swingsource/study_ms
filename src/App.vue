<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    document.documentElement.setAttribute('theme', this.theme)
  },
  computed: {
    ...mapState(['theme']),
  },
}
</script>

<style lang="stylus">
@import '~@/assets/theme/index.css'
#app
  height 100%
</style>
