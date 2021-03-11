<template>
  <div class="login">
    <div class="login-img">
      <div class="web-name">
        <img src="./logo.png" alt="" />
        <span>欢迎使用山茶籽管理系统</span>
      </div>
      <div class="web-desc">寻找灵感，发现精彩</div>
      <img class="svg" src="./login.svg" alt="" />
    </div>
    <div class="login-content">
      <div class="login-form">
        <my-input
          label="用户名"
          placeholder="请输入用户名"
          type="text"
          v-model="account"
          icon="&#xe655;"
        ></my-input>
        <my-input
            label="密码"
            placeholder="请输入密码"
            type="password"
            v-model="password"
            icon="&#xe60f;"
            style="margin-top: 24px;"
        ></my-input>
        <div class="btn-submit" @click="handleSubmit">登 录</div>
      </div>
      <div class="tips">-- 时光静好与君语，细水流年与君同</div>
    </div>
  </div>
</template>

<script>
import MyInput from 'cps/input/Index'

import { mapState } from 'vuex'

export default {
  data() {
    return {
      account: '',
      password: '',
    }
  },
  components: {
    MyInput,
  },
  computed: {
    ...mapState(['layout'])
  },
  methods: {
    handleSubmit () {
      this.$router.push(`/${this.layout}`)
    }
  },
}
</script>

<style scoped lang="stylus">
.login
  height 100%
  display flex
  box-sizing border-box
  .login-img
    padding 6vh 3vw 6vh 6vh
    flex 1
    display flex
    flex-flow column nowrap
    justify-content space-around
    align-items center
    .web-name
      width 100%
      margin-top -12vh
      font-size 30px
      color var(--color-header)
      display flex
      align-items center
      img
        width 42px
        height 42px
        animation my-rotate 4.8s infinite linear
      span
        margin-left 20px
    .web-desc
      margin-top -12vh
      width 100%
      padding-right 10vw
      font-size 32px
      font-weight lighter
      text-align right
    img.svg
      margin-top -8vh
      width 32vw
      height 40vh
  .login-content
    flex 1
    padding 6vh 6vw 6vh 3vw
    display flex
    flex-flow column nowrap
    justify-content center
    align-items center
    background #f8f8f8
    .login-form
      width 20vw
      height 240px
      .btn-submit
        margin-top 30px
        width 100%
        height 36px
        line-height 36px
        text-align center
        background orange
        border-radius 32px
        cursor pointer
    .tips
      font-size 14px
      margin-top 6vh
 @keyframes my-rotate
   0%
     transform rotate(0)
   100%
     transform rotate(360deg)
</style>
