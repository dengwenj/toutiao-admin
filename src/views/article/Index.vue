<template>
  <div class="article-container">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <breadcrumb></breadcrumb>
      </div>
      <!-- form表单 -->
      <article-form
        :dianji="dianji"
        @status="statusClick"
        :channels="channels"
        :loading="loading"
      ></article-form>
    </el-card>
    <el-card class="bottom-card">
      <div slot="header">根据筛选条件共查询到{{ totalCount }}条结果:</div>
      <!-- 数据表格 -->
      <article-table
        class="table-card"
        :articles="articles"
        :loading="loading"
        @articleId="articleId"
      ></article-table>
      <!-- 分页 -->
      <article-pagination
        @onCurrentChange="onCurrentChange"
        :totalCount="totalCount"
        :pageSize="pageSize"
        :loading="loading"
      ></article-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from './compschild/Breadcrumb'
import ArticleForm from './compschild/Form'
import ArticleTable from './compschild/Table'
import ArticlePagination from './compschild/Pagination'

// 网络请求
import { getArticles, getArticleChannels, articleId } from '@/api/article'

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
      articles: [], // 文章数据列表
      totalCount: 0, // 总条数
      pageSize: 10, // 每页条数
      status: null, // 子传父 子组件传递过来的 查询文章的状态，不传就是全部
      dianji: null, // 父传子 子组件再去调用这个函数就可以重新发送请求了 就有新的数据过来了
      channels: [], // 文章频道列表
      channelId: null, // 查询文章的频道
      rangDate: null, // 范围日期
      loading: true // 表单加载中 loading
    }
  },
  computed: {},
  watch: {},
  created () {
    // 发送请求
    this._getArticles()
    this._getArticleChannels()

    // 把这个函数存到数据里面 在用父传子把这个函数传到子组件里面去
    // 子组件再去调用这个函数就可以重新发送请求了 就有新的数据过来了
    this.dianji = this._getArticles
  },
  mounted () {},
  methods: {
    // 获取文章列表
    // page = 1 默认为第一页
    _getArticles (page = 1) {
      // 发送请求时 展示加载中 loading
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId ? this.channelId : null,
        begin_pubdate: this.rangDate ? this.rangDate[0] : null, // 开始日期
        end_pubdate: this.rangDate ? this.rangDate[1] : null // 截止日期
      }).then((res) => {
        // console.log(res)
        const { results, total_count } = res.data.data
        this.articles = results
        this.totalCount = total_count

        // 数据请求完毕 关闭加载中 loading
        this.loading = false
      })
    },

    // 子传父 分页
    onCurrentChange (page) {
      // 把点击的页码给参数传过去  要调用才能去执行 不能在data里面弄变量这样他没有调用
      this._getArticles(page)
    },

    statusClick (status, region, rangDate) {
      this.status = status
      // console.log(status)
      this.channelId = region
      // console.log(region)
      this.rangDate = rangDate
      // console.log(rangDate)
    },

    //  文章频道
    _getArticleChannels () {
      getArticleChannels().then((res) => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },

    // 删除文章
    articleId (id) {
      // 找到数据接口 封装请求方法 删除请求调用 处理响应结果
      this.$confirm('是否删除文章？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 这里就是做一些业务
          // console.log(id)
          articleId(id).then((res) => {
            console.log(res)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
