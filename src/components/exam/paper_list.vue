<template>
  <div class="m-paper-list">
    <el-row :gutter="20" class="u-list">
      <el-col :span="12" v-for="item in list" :key="'paper' + item.id" class="u-item">
        <router-link :to="{ name: 'paper', params: { id: item.id } }" class="u-link">
          <div class="u-title" :class="item.style">
            {{ item.title }}
          </div>
          <div class="u-tags">
            <el-tag class="u-tag" v-for="tag in item.tags" :key="tag" size="small">
              {{ tag }}
            </el-tag>
          </div>
          <div class="u-desc" :class="item.style">
            <img class="u-icon" svg-inline src="../../assets/img/logo.svg" />
            <div class="u-text">{{ item.desc }}</div>
          </div>
          <div class="u-info">
            <div>出卷人： {{ item.createUser }}</div>
            <div class="u-star">
              难度：
              <el-rate v-model="item.hardStar" disabled text-color="#ff9900"></el-rate>
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'PaperList',
  props: ['data'],
  components: {},
  data: function () {
    return {}
  },
  computed: {
    list: function () {
      return this.data?.map((item, i) => {
        try {
          item.tags = JSON.parse(item.tags).slice(0, 3)
        } catch (e) {
          console.log('解析试卷列表tag异常', e)
          item.tags = []
        }
        return item
      })
    },
  },
  watch: {},
  methods: {},
  filters: {},
  created: function () { },
  mounted: function () { },
}
</script>

<style lang="less">
@import "../../assets/css/exam/paper_list.less";
</style>
