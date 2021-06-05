<template>
  <!-- page-size 每页显示条目个数 默认的是每页10条 total 是总条数
      current-change  currentPage改变时会触发	 回调参数当前页  @current-change="onCurrentChange"
   -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="totalCount"
    @current-change="onCurrentChange"
    :page-size="pageSize"
    :disabled="loading"
  >
  </el-pagination>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    // 父传子
    totalCount: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onCurrentChange (page) {
      this.$emit('onCurrentChange', page)
    }
  }
}
</script>

<style scoped lang="less"></style>
