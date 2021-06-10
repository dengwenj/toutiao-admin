<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    totalCount: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSizeChange() {
      this.$emit('handleSizeChange')
    },
    handleCurrentChange(page) {
      this.$emit('handleCurrentChange', page)
    },
  },
}
</script>

<style scoped lang="less">
.pagination {
  margin-top: 20px;
}
</style>