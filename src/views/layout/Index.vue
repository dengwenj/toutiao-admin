<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto" :style="width">
      <!-- 侧边栏组件 -->
      <app-aside class="aside-menu" :collapse="isCollapse">
        <div class="toutiao" v-show="!isCollapse">尾尾头条</div>
      </app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 头部组件 -->
        <app-header @iClick="iClick" :tupiao="isCollapse"></app-header>
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
  name: 'layoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {
      // 父传子 传给子了
      isCollapse: false // 侧边菜单栏的展示状态
    }
  },
  computed: {
    width () {
      return this.isCollapse ? {} : { width: '200px' }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击收缩展开 子传父的
    iClick () {
      this.isCollapse = !this.isCollapse
    }
  }
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
  // background-color: #d3dce6;
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
