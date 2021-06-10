<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数">
      </el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数">
      </el-table-column>
      <el-table-column prop="" label="评论状态">
        <template slot-scope="scope">
          <div>{{ scope.row.comment_status ? '正常' : '关闭' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onSwitch(scope.row)"
            :disabled="scope.row.statusDisabled"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 网络请求
import { updataCommentStatus } from '@/api/article'

export default {
  name: '',
  components: {},
  props: {
    comment: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      tableData: [],
    }
  },
  computed: {},
  watch: {
    comment(value) {
      this.tableData = value
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 修改文章评论状态
    onSwitch(article) {
      // 禁止开关
      article.statusDisabled = true

      //  请求提交修改
      updataCommentStatus(article.id.toString(), article.comment_status).then(
        (res) => {
          // 开启开关
          article.statusDisabled = false
        }
      )
    },
  },
}
</script>

<style scoped lang="less"></style>
