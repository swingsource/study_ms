<template>
  <div class="input-wrapper">
    <input
      class="input-fill"
      :type="type"
      :placeholder="placeholder"
      v-model="currentValue"
    />
    <label class="input-label">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    type: {
      type: String,
      validator(nv) {
        return ['text', 'password'].indexOf(nv) > -1
      },
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    label: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: 'value',
    event: 'updateValue',
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(nv) {
      this.currentValue = nv
    },
    currentValue(nv) {
      this.$emit('updateValue', nv)
    },
  },
}
</script>

<style scoped lang="stylus">
.input-wrapper
  position relative
  input
    width 100%
    outline none
    &:focus
      outline none
  .input-fill
    height 36px
    width 100%
    padding 0 12px
    line-height 36px
    border-radius 7px
    font-size 16px
    color #000
    transition all .2s
    border 1px solid #666
    &:placeholder-shown::placeholder
      color transparent
    &:focus
      border 1px solid #2486ff
    &:not(:placeholder-shown) ~ .input-label, &:focus ~ .input-label
      transform scale(.8) translate3d(0, -30px, 0)
      background transparent
      color orange
  .input-label
    position absolute
    top 11px
    left 12px
    font-size 16px
    color #50a3a2
    transition all .2s
    transform-origin 0 0
    pointer-events none
</style>
