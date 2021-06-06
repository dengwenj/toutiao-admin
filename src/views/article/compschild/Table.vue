<template>
  <!--
  table 表格组件
  1 把需要展示的数组列表数据绑定给 table 组件的 data 属性 就是那个父传子的数据
        不需要自己在v-for了 它内部已经做了
  2 设计表格列 el-table-column
     width 可以设定表格列的宽度
     lable 可以设定列的标题
     prop  用来设定要渲染的列表项数据字段  只能展示文本
  3 表格列默认只能渲染普通文本，如果需要展示其他内容，例如放个按钮，放个图片，要用自定义表格列模板了
 -->
  <el-table
    :data="articles"
    border
    size="small"
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column prop="date" label="封面">
      <template slot-scope="scope">
        <!-- 组件image -->
        <!-- <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.cover.images[0]"
          fit="fit"
          lazy
        >
        </el-image> -->
        <img
          v-if="scope.row.cover.images[0]"
          class="articles-cover"
          :src="scope.row.cover.images[0]"
          alt=""
        />
        <img
          v-else
          class="articles-cover"
          src="@/views/article/no-cover.gif"
          alt=""
        />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column label="状态">
      <!--
        如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope"
        自定义列模板了 prop就没用了
        scope.row 拿到当前遍历项对象
        要数据的话通过声明 slot-scope="scope" 在 scope.row 就行了
        不要数据的话就不写
       -->
      <template slot-scope="scope">
        <el-tag :type="articleStatus[scope.row.status].type">{{
          articleStatus[scope.row.status].text
        }}</el-tag>
        <!-- <el-tag type="warning" v-if="scope.row.status === 0">草稿</el-tag>
        <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
        <el-tag type="success" v-else-if="scope.row.status === 2"
          >审核通过</el-tag
        >
        <el-tag type="danger" v-else-if="scope.row.status === 3"
          >审核失败</el-tag
        >
        <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag> -->
      </template>
    </el-table-column>
    <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
    <el-table-column label="操作">
      <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
      <template slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="small"
          @click="$router.push('/publish?id=' + scope.row.id)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
          @click="onDeleteArticle(scope.row.id)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ArticleTable',
  components: {},
  props: {
    articles: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      articleStatus: [
        {
          status: 0,
          type: 'warning',
          text: '草稿'
        },
        {
          status: 1,
          type: '',
          text: '待审核'
        },
        {
          status: 2,
          type: 'success',
          text: '审核通过'
        },
        {
          status: 3,
          type: 'danger',
          text: '审核失败'
        },
        {
          status: 4,
          type: 'info',
          text: '已删除'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onDeleteArticle (id) {
      // 子传父
      this.$emit('articleId', id)
      // console.log(id)
    }
  }
}
</script>

<style scoped lang="less">
.articles-cover {
  width: 100px;
  background-size: cover;
}
</style>
