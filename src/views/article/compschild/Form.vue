<template>
  <el-form ref="form" :model="form" size="small" label-width="40px">
    <el-form-item label="状态">
      <el-radio-group v-model="form.resource">
        <el-radio label="全部"></el-radio>
        <el-radio label="草稿"></el-radio>
        <el-radio label="待审核"></el-radio>
        <el-radio label="审核通过"></el-radio>
        <el-radio label="审核失败"></el-radio>
        <el-radio label="已删除"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
        v-model="form.date1"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">筛选</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Form',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less"></style>
