<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <image-breadcrumb></image-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>

      <!-- 素材列表 -->
      <image-layout
        :images="images"
        :loadImage="loadImage"
        @collect="collect"
      ></image-layout>

      <!-- 分页 -->
      <image-pagination
        @changePage="changePage"
        :totalCount="totalCount"
        :pageSize="pageSize"
        :currentpagesync="currentpagesync"
      ></image-pagination>
    </el-card>
  </div>
</template>

<script>
import ImageBreadcrumb from './compschild/ImageBreadcrumb'
import ImageLayout from './compschild/ImageLayout'
import ImagePagination from './compschild/ImagePagination'

// 网络请求
import { getImages, collectImage } from '@/api/image'

export default {
  name: 'ImageIndex',
  components: {
    ImageBreadcrumb,
    ImageLayout,
    ImagePagination,
  },
  props: {},
  data() {
    return {
      images: [], // 图片素材列表
      loadImage: null, // 重新发送请求渲染新的数据
      page: 1, // 当前页
      totalCount: 0, // 总数据条数
      pageSize: 12, // 每页有多少条
      currentpagesync: 1, // 重置高亮页码，防止数据页码不对应 就是在全部和收藏的时候防止页码不对应
    }
  },
  computed: {},
  watch: {},
  created() {
    // 发送请求
    this.loadImage = this.loadImages
    this.loadImages(this.page)
  },
  mounted() {},
  methods: {
    // 网络请求
    loadImages(page = 1, value = false) {
      // 重置高亮页码，防止数据页码不对应
      this.currentpagesync = page
      getImages({
        collect: value,
        page,
        per_page: this.pageSize,
      }).then((res) => {
        console.log(res)
        const { data } = res.data
        this.images = data.results
        this.totalCount = data.total_count // 总条数
      })
    },

    // 点击是否收藏
    collect(value) {
      // 只要触发这里就每次就是从第一页开始
      this.loadImages(1, value)
    },

    // 点击下面的页码
    changePage(page) {
      this.page = page
      this.loadImages(this.page)
    },
  },
}
</script>

<style scoped lang="less"></style>
