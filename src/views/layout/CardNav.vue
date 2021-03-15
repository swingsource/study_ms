<template>
  <div class="card-nav">
    <div class="nav-card-wrapper">
      <div
        class="card"
        v-for="(item, index) of nav"
        :key="index + item.path"
        :style="{
          background: `url(${item.img}) no-repeat center center`,
          'background-size': '100% 100%',
        }"
        @click="handleClickNav(item)"
      >
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div class="personal-card">
      <div class="avatar"></div>
      <div class="hello">你好，我在等风！</div>
      <div class="zym">时光静好与君语，细水流年与君同</div>
      <div class="events">
        <div class="event-item">
          <p class="item-title">新增书籍数</p>
          <p class="item-value">1</p>
        </div>
        <div class="event-item">
          <p class="item-title">审批数</p>
          <p class="item-value">20</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navList } from '@/config/navList'

export default {
  data() {
    return {
      nav: [],
    }
  },
  mounted() {
    this.nav = navList
  },
  methods: {
    handleClickNav(item) {
      this.$router.push(`/card/${item.path}`)
    },
  },
}
</script>

<style scoped lang="stylus">
.card-nav
  display flex
  flex-flow row nowrap
  .nav-card-wrapper
    flex 4
    display flex
    flex-flow row wrap
    justify-content flex-start
    align-items flex-start
    .card
      position relative
      width calc(100vw / 6)
      height 0
      padding-bottom calc(100vw / 10)
      margin-right calc(100vw / 16)
      margin-bottom calc(100vw / 24)
      background var(--color-block)
      border-radius 6px
      cursor pointer
      &:hover
        transform scale3d(1.1, 1.1, 1)
        transition all .4s ease
      .name
        position absolute
        height 50px
        line-height 50px
        left 0
        bottom 0
        width 100%
        box-sizing border-box
        padding-left 40px
        background rgba(0, 0, 0, .3)
        font-size var(--font-size-big)
        color var(--color-normal)
        overflow hidden
        border-radius 0 0 6px 6px
  .personal-card
    box-sizing border-box
    height 360px
    padding 20px
    flex 1
    display flex
    flex-flow column nowrap
    justify-content flex-start
    align-items center
    border-radius 6px
    background var(--color-block)
    .avatar
      width 100px
      height 100px
      border-radius 50%
      background var(--color-primary)
    .hello
      margin-top 20px
      text-align center
      font-size var(--font-size-bigger)
      color var(--font-color-main)
    .zym
      margin-top 20px
      text-align center
      font-size var(--font-size-normal)
      color var(--font-color-regular)
    .events
      margin-top 20px
      padding 20px
      width 100%
      box-sizing border-box
      border-top 1px dashed var(--font-color-sub)
      display flex
      flex-flow row nowrap
      justify-content space-between
      align-items center
      .event-item
        .item-title
          font-size var(--font-size-normal)
          color var(--font-color-regular)
          text-align center
        .item-value
          margin-top 4px
          font-size var(--font-size-normal)
          color var(--font-color-regular)
          text-align center
</style>
