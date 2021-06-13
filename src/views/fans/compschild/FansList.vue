<template>
  <div class="">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="粉丝列表" name="first">
        <el-row :gutter="20">
          <el-col
            class="fan-list"
            :span="4"
            :xl="4"
            :lg="4"
            :md="6"
            :sm="8"
            :xs="12"
            v-for="(item, index) in fansList"
            :key="index"
          >
            <el-avatar class="fans-photo" :src="item.photo"></el-avatar>
            <p>{{ item.name }}</p>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="second">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div ref="main" style="width: 600px; height: 400px"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// ECharts
import * as echarts from 'echarts'

// 事件总线
import globalBus from '@/utils/global-bus'

export default {
  name: '',
  components: {},
  props: {
    fansList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      activeName: 'first',
    }
  },
  computed: {},
  watch: {
    label(value) {
      this.echarts = value
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      globalBus.$emit('fansLabel', tab.label)

      console.log(tab.label)
      if (tab.label === '粉丝画像') {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.main)
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts',
          },
          tooltip: {},
          legend: {
            data: ['头条'],
          },
          xAxis: {
            data: ['内容', '素材', '发布', '评论', '粉丝', '个人'],
          },
          yAxis: {},
          series: [
            {
              name: '头条',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      }
    },
  },
}
</script>

<style scoped lang="less">
.fan-list {
  text-align: center;
  border: 1px solid #ebeef5;
  .fans-photo {
    width: 70px;
    height: 70px;
    margin-top: 20px;
  }
}
</style>