<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{
      activeId ? '修改文章' : '发布文章'
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    activeId: {
      type: String,
      defalut: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less"></style>
