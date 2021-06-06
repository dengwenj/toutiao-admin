<template>
  <el-form ref="form" :model="article" label-width="40px">
    <el-form-item label="标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" v-model="article.content"></el-input>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group v-model="article.cover.type">
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="article.channel_id" placeholder="请选择频道">
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in channels"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onPublish(article, false)"
        >发表</el-button
      >
      <el-button @click="onPublish(article, true)">存入草稿</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PublishForm',
  components: {},
  props: {
    channels: {
      type: Array,
      defalut () {
        return []
      }
    }
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 文章封面
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片地址
        },
        channel_id: null // 文章频道id
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPublish (article, draft) {
      this.$emit('addArticle', article, draft)
    }
  }
}
</script>

<style scoped lang="less">
</style>
