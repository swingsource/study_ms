<template>
  <div class="header">
    <div class="left">
      <img src="./logo.png" alt="" />
      <span class="title">MS蓝狐</span>
    </div>
    <div class="right">
      <div class="avatar"></div>
      <div class="username">我在等风</div>
      <div class="switch-theme"></div>
    </div>
  </div>
</template>

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
    .avatar
      width 24px
      height 24px
      border-radius 50%
      background green
    .username, .switch-theme
      margin-left 20px
    .username
      font-size 16px
</style>
