<template>
  <div class="">
    <el-pagination
      class="fans-pagination"
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      @current-change="currentChange"
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
    currentChange(page) {
      this.$emit('currentChange', page)
    },
  },
}
</script>

<style scoped lang="less">
.fans-pagination {
  margin-top: 20px;
}
</style>