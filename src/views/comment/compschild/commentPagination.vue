<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange(pageSizeSync)"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPageSync"
      :page-sizes="[10, 20, 50]"
      :page-size.sync="pageSizeSync"
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
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageSizeSync: 10,
      currentPageSync: 1,
    }
  },
  computed: {},
  // 可以监听组件中属性的改变
  watch: {
    currentPage(value) {
      this.currentPageSync = value
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(pageSizeSync) {
      this.$emit('handleSizeChange', pageSizeSync)
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