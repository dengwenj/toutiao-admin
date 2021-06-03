<template>
  <div class="nav-header">
    <div>
      <i class="el-icon-s-fold"></i>
      <span class="left">f2e.xd私人开发的尾尾头条</span>
    </div>
    <el-dropdown>
      <div class="right">
        <img src="~@/views/login/login_bg.jpg" alt="" />
        <span>用户昵称<i class="el-icon-arrow-down el-icon--right"></i></span>
      </div>
      <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
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
.nav-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    margin-left: 5px;
  }
  .right {
    img {
      margin-right: 5px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
