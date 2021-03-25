<template>
  <div class="input-wrapper">
    <input
      class="input-fill"
      :type="type"
      :placeholder="placeholder"
      v-model="currentValue"
    />
    <label class="input-label">{{ label }}</label>
    <div class="input-slot" v-if="icon">
      <slot>
        <span class="icon iconfont" v-html="icon"></span>
      </slot>
    </div>
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
    icon: {
      type: String
    }
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
    box-sizing border-box
    height 40px
    width 100%
    padding 0 12px 0 30px
    line-height 40px
    border-radius 6px
    font-size 16px
    color var(--color-primary)
    transition all .2s
    border 1px solid #666
    &:placeholder-shown::placeholder
      color transparent
    &:focus
      border 1px solid var(--color-primary)
      & ~ div.input-slot span
        color var(--color-primary)
    &:not(:placeholder-shown) ~ .input-label, &:focus ~ .input-label
      transform scale(.8) translate3d(0, -34px, 0)
      background transparent
      color var(--font-color-placeholder)
  .input-label
    position absolute
    top 12px
    left 30px
    font-size 14px
    color var(--font-color-placeholder)
    transition all .2s
    transform-origin 0 0
    pointer-events none
  .input-slot
    position absolute
    top 9px
    left 8px
    .icon
      color var(--font-color-placeholder)
</style>
