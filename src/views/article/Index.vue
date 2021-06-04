<template>
  <div class="article-container">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <breadcrumb></breadcrumb>
      </div>
      <!-- form表单 -->
      <article-form></article-form>
    </el-card>
    <el-card class="bottom-card">
      <div slot="header">根据筛选条件共查询到111111条结果:</div>
      <!-- 数据表格 -->
      <article-table class="table-card" :articles="articles"></article-table>
      <!-- 分页 -->
      <article-pagination></article-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from './compschild/Breadcrumb'
import ArticleForm from './compschild/Form'
import ArticleTable from './compschild/Table'
import ArticlePagination from './compschild/Pagination'

// 网络请求
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {
    Breadcrumb,
    ArticleForm,
    ArticleTable,
    ArticlePagination
  },
  props: {},
  data () {
    return {
      articles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    // 发送请求
    this._getArticles()
  },
  mounted () {},
  methods: {
    _getArticles () {
      getArticles().then((res) => {
        console.log(res)
        this.articles = res.data.data.results
      })
    }
  }
}
</script>

<style scoped lang="less">
.top-card {
  margin-bottom: 20px;
}
.bottom-card {
  .table-card {
    margin-bottom: 20px;
  }
}
</style>
