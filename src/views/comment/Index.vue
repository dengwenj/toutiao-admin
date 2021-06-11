
<template>
  <div class="commnet-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <comment-breadcrumb></comment-breadcrumb>
      </div>
      <!-- 评论表格 -->
      <comment-table :comment="comment"></comment-table>

      <!-- 分页 -->
      <comment-pagination
        :totalCount="totalCount"
        :currentPage="currentPage"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></comment-pagination>
    </el-card>
  </div>
</template>

<script>
import commentBreadcrumb from './compschild/commentBreadcrumb'
import commentTable from './compschild/commentTable'
import commentPagination from './compschild/commentPagination'

// 网络请求
import { getArticles } from '@/api/article'

export default {
  name: 'CommentIndex',
  components: {
    commentBreadcrumb,
    commentTable,
    commentPagination,
  },
  props: {},
  data() {
    return {
      comment: [], // 评论
      totalCount: 0, // 总评论
      // pageSize: 10, // 每页多少
      pageSizeSync: 10,
      currentPage: 1,
    }
  },
  computed: {},
  watch: {},
  created() {
    // 发送请求
    this._getArticles()
  },
  mounted() {},
  methods: {
    _getArticles(page = 1) {
      // 让分页组件激活的页码和请求数据的页码保持一致
      this.currentPage = page

      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSizeSync,
      }).then((result) => {
        // console.log(result)
        const { results } = result.data.data
        results.forEach((item) => {
          item.statusDisabled = false
        })
        this.comment = results
        this.totalCount = result.data.data.total_count
      })
    },

    handleCurrentChange(page) {
      this._getArticles(page)
      this.currentPage = page
    },

    handleSizeChange(pageSizeSync) {
      this.pageSizeSync = pageSizeSync
      this._getArticles(1, pageSizeSync)
      // console.log(pageSizeSync)
    },
  },
}
</script>

<style scoped lang="less"></style>
