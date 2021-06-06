<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <publish-breadcrumb></publish-breadcrumb>
      </div>
      <!-- 发布文章表单 -->
      <publish-form
        :channels="channels"
        @addArticle="addArticle"
      ></publish-form>
    </el-card>
  </div>
</template>

<script>
import PublishBreadcrumb from './compschild/PublishBreadcrumb'
import PublishForm from './compschild/PublishForm'

// 请求数据
import { getArticleChannels, addArticle } from '@/api/article'

export default {
  name: 'PublishIndex',
  components: {
    PublishBreadcrumb,
    PublishForm
  },
  props: {},
  data () {
    return {
      channels: [] // 文章频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    // 发送请求
    this._getArticleChannels()

    // 由于我们让发布和修改使用的同一个组件
    // 所以这里要判断
    // 如果路由路径参数中有id，则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    _getArticleChannels () {
      getArticleChannels().then((res) => {
        const { data } = res.data
        this.channels = data.channels
      })
    },
    addArticle (article, draft) {
      // 新建文章
      addArticle(article, draft).then((res) => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      })
    },

    // 修该文章：加载文章内容
    loadArticle () {
      console.log(111111111)
    }
  }
}
</script>

<style scoped lang="less"></style>
