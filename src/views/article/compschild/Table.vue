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
  <el-table :data="articles" border size="small" style="width: 100%">
    <el-table-column prop="date" label="封面"> </el-table-column>
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="status" label="状态"> </el-table-column>
    <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
    <el-table-column label="操作">
      <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
      <template>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="small"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="small"
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
    }
  },
  data () {
    return {
      // isBorder: true,
      // tableData: [
      //   {
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄',
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄',
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄',
      //   },
      // ],
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
