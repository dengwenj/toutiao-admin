<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <!-- aside组件 -->
      <app-aside class="aside-menu">
        <div class="toutiao">尾尾头条</div>
      </app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <app-header></app-header>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './compschild/Aside'
import AppHeader from './compschild/Header'

export default {
  name: '',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
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
.layout-container {
  // 这样就可以撑开整个页面
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
    .toutiao {
      margin-top: 15px;
      text-align: center;
      color: #89abcf;
      font-size: 18px;
    }
  }
}
.header {
  // background-color: #b3c0d1;
  border-bottom: 1px solid #ccc;
}
.main {
  background-color: #e9eef3;
}
</style>
