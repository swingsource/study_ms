<template>
  <div class="login">
    <div class="login-img">
      <div class="web-name">
        <img src="./logo.png" alt="" />
        <span>啊吧啊吧</span>
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
        ></my-input>
      </div>
      <button @click="handleClick">test</button>
    </div>
  </div>
</template>

<script>
import MyInput from 'cps/input/Index'

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
  methods: {
    handleClick() {
      console.log(this.account)
    },
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
    background #eee
    .login-form
      width 20vw
      height 400px
</style>
