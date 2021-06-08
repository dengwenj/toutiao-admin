<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <image-breadcrumb></image-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <!-- layout布局 -->
      <image-layout></image-layout>
    </el-card>
  </div>
</template>

<script>
import ImageBreadcrumb from './compschild/ImageBreadcrumb'
import ImageLayout from './compschild/ImageLayout'

export default {
  name: 'ImageIndex',
  components: {
    ImageBreadcrumb,
    ImageLayout,
  },
  props: {},
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
