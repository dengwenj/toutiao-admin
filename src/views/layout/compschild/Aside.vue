<template>
  <el-menu
    class="nav-menu"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="collapse"
  >
    <!-- 插槽 -->
    <slot></slot>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-image"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-publish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-s-comment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fans"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-menu"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  comments: {},
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.nav-menu {
  .iconfont {
    padding-left: 3px;
    margin-right: 10px;
  }
}
</style>
