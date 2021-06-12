<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <settings-breadcrumb></settings-breadcrumb>
      </div>

      <!-- 表单 -->
      <settings-form :user="user"></settings-form>
    </el-card>
  </div>
</template>

<script>
import settingsBreadcrumb from './compschild/settingsBreadcrumb'
import settingsForm from './compschild/settingsForm'

// 网络请求
import { getUserProfile } from '@/api/user'

export default {
  name: 'SettingsIndex',
  components: {
    settingsBreadcrumb,
    settingsForm,
  },
  props: {},
  data() {
    return {
      user: {}, // 个人资料
    }
  },
  computed: {},
  watch: {},
  created() {
    // 发送请求
    this._getUserProfile()
  },
  mounted() {},
  methods: {
    _getUserProfile() {
      getUserProfile().then((res) => {
        // console.log(res)
        this.user = res.data.data
      })
    },
  },
}
</script>

<style scoped lang="less"></style>
