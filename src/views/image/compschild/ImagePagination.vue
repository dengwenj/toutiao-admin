<template>
  <div class="pagination">
    <!--current-page 当前页数，支持 .sync 修饰符 看文档动手拿来看下 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :current-page.sync="currentpage"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ImagePagination',
  components: {},
  props: {
    // 总条数
    totalCount: {
      type: Number,
      default: 0,
    },
    // 每页有多少条
    pageSize: {
      type: Number,
      default: 10,
    },
    currentpagesync: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentpage: null,
    }
  },
  computed: {},

  // 可以监听我们某一个属性的改变
  watch: {
    // currentpagesync: function () {},
    currentpagesync(value) {
      this.currentpage = value
    },
  },
  created() {},
  mounted() {},
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
  },
}
</script>

<style scoped lang="less">
.pagination {
  margin-top: 20px;
}
</style>