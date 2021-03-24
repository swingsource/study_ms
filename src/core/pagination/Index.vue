<template>
  <div class="pagination">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="total, prev, pager, next, sizes"
        :hide-on-single-page="false"
        :page-sizes="[10, 20, 50, 200]"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageNum: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
  }
}
</script>

<style scoped lang="stylus">
.pagination
  margin-top 20px
  display flex
  flex-direction row-reverse
</style>
