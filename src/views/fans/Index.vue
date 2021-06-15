<template>
  <div class="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <fans-breadcrumb></fans-breadcrumb>
      </div>
      <!-- 粉丝列表 -->
      <fans-list :fansList="fansList"></fans-list>

      <!-- 粉丝分页 -->
      <fans-pagination
        v-if="removelabel"
        :totalCount="totalCount"
        :pageSize="pageSize"
        @currentChange="currentChange"
      ></fans-pagination>
    </el-card>
  </div>
</template>

<script>
import FansBreadcrumb from './compschild/FansBreadcrumb'
import FansList from './compschild/FansList'
import FansPagination from './compschild/FansPagination'

// 事件总线
import globalBus from '@/utils/global-bus'

// 网络请求
import { fansList } from '@/api/fans'

export default {
  name: 'FansIndex',
  components: {
    FansBreadcrumb,
    FansList,
    FansPagination,
  },
  props: {},
  data() {
    return {
      label: '',
      removelabel: true,
      fansList: [], // 粉丝列表
      totalCount: 0,
      pageSize: 10,
    }
  },
  computed: {},
  watch: {},
  created() {
    globalBus.$on('fansLabel', (label) => {
      // console.log(label)
      this.label = label

      if (this.label === '粉丝画像') {
        this.removelabel = false
      } else {
        this.removelabel = true
      }
    })

    // 发送请求
    // this._fansStatisticsDate()
    this._fansList()
  },
  mounted() {},
  methods: {
    _fansList(page = 1) {
      fansList({
        page,
        per_page: this.pageSize,
      }).then((res) => {
        // console.log(res)
        const { results } = res.data.data
        this.fansList = results
        this.totalCount = res.data.data.total_count
      })
    },

    currentChange(page) {
      this._fansList(page)
    },
  },
}
</script>

<style scoped lang="less"></style>