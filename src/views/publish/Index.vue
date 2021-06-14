<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <publish-breadcrumb :activeId="activeId"></publish-breadcrumb>
      </div>
      <!-- 发布文章表单 -->
      <publish-form
        ref="publishForm"
        :channels="channels"
        :activeId="activeId"
        :index="index"
        :url="url"
        @addArticle="addArticle"
        @radioChange="radioChange"
      >
        <!-- 文章封面 -->
        <div v-if="type > 0" class="upload-cover">
          <upload-cover
            v-for="(item, index) in type"
            :key="item"
            @coverUpload="coverUpload(index, $event)"
          />
        </div>
      </publish-form>
    </el-card>
  </div>
</template>

<script>
import PublishBreadcrumb from './compschild/PublishBreadcrumb'
import PublishForm from './compschild/PublishForm'
import UploadCover from './compschild/UploadCover'

// 请求数据
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updataArticle,
} from '@/api/article'

export default {
  name: 'PublishIndex',
  components: {
    PublishBreadcrumb,
    PublishForm,
    UploadCover,
  },
  props: {},
  data() {
    return {
      channels: [], // 文章频道列表
      activeId: null, // 活跃路由的id
      type: null,
      index: null,
      url: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    // 发送请求
    this._getArticleChannels()

    // 活跃路由的路由参数id
    this.activeId = this.$route.query.id

    // 由于我们让发布和修改使用的同一个组件
    // 所以这里要判断
    // 如果路由路径参数中有id，则请求展示文章内容
    if (this.activeId) {
      this.loadArticle()
    }
  },
  mounted() {},
  methods: {
    _getArticleChannels() {
      getArticleChannels().then((res) => {
        const { data } = res.data
        this.channels = data.channels
      })
    },

    addArticle(article, draft) {
      // 如果是修改文章，则执行修改操作，否则执行添加操作
      if (this.activeId) {
        // 修改文章
        updataArticle(
          this.activeId,
          this.$refs.publishForm.article,
          (draft = false)
        ).then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          // 跳转到内容管理
          this.$router.push('/article')
        })
      } else {
        // 新建文章
        addArticle(article, draft).then((res) => {
          this.$message({
            message: draft ? '存入草稿成功' : '发布成功',
            type: 'success',
          })
          // 跳转到内容管理
          this.$router.push('/article')
        })
      }
    },

    // 修该文章：加载文章内容
    loadArticle() {
      // 获取指定文章
      getArticle(this.activeId).then((res) => {
        this.$refs.publishForm.article = res.data.data
      })
    },

    radioChange(type) {
      this.type = type
    },

    coverUpload(index, url) {
      this.index = index
      this.url = url
    },
  },
}
</script>

<style scoped lang="less">
.upload-cover {
  display: flex;
}
</style>
