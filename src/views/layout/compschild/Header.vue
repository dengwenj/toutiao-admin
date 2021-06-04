<template>
  <div class="nav-header">
    <div>
      <i :class="zuoyou" @click="iClick"></i>
      <span class="left">由f2e.xd私人开发的尾尾头条</span>
    </div>
    <el-dropdown>
      <div class="right">
        <img :src="user.photo" alt="" />
        <span>
          {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </div>
      <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 网络请求
import { getUserProfile } from '@/api/user'

export default {
  name: 'Header',
  components: {},
  props: {
    tupiao: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {} // 用户个人资料
    }
  },
  computed: {
    zuoyou () {
      return this.tupiao ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  watch: {},
  created () {
    // 网络请求 用户个人资料
    this._getUserProfile()
  },
  mounted () {},
  methods: {
    // 除了登录接口，其他所有接口都需要授权才能请求使用
    // 就是 除了登录接口，其他接口都需要提供身份 token
    _getUserProfile () {
      getUserProfile().then((res) => {
        this.user = res.data.data
      })
    },

    // 事件
    iClick () {
      // 字传父
      this.$emit('iClick')
    },
    onLogout () {
      this.$confirm('是否退出登录？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除本地储存的token 就相当于退出登录了
          window.localStorage.removeItem('user')
          // 跳转到登录页面
          this.$router.replace('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
.nav-header {
  position: relative;
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
    span {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
