<template>
  <div class="v-search">
    <!-- 搜索 -->
    <div
      class="m-archive-search m-exam-search"
      slot="search-before"
      key="exam-search"
    >
      <el-input
        placeholder="请输入搜索内容"
        v-model="search"
        class="input-with-select"
      >
        <span slot="prepend">关键词</span>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <!-- 切换 -->
    <el-tabs class="m-exam-tabs" v-model="newType">
      <el-tab-pane
        v-for="item in types"
        :label="item.label"
        :key="item.value"
        :name="item.value"
      ></el-tab-pane>
    </el-tabs>

    <!-- tags搜索 -->
    <div class="m-exam-tags">
      <span
        @click="selected(item, i)"
        class="el-tag el-tag--small"
        v-for="(item, i) in tags"
        :key="i"
        :class="current == i ? 'active' : ''"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script>
import tags from "@/assets/data/exam_tags.json";
export default {
  name: "Search",
  props: ["type"],
  components: {},
  data: function () {
    return {
      search: "",
      types: [
        { label: "综合试卷", value: "paper" },
        { label: "趣味问题", value: "question" },
      ],
      tags: tags.tags,
      current: 0,
      newType: this.type,
    };
  },
  computed: {},
  watch: {
    search: {
      handler: function (val) {
        this.$emit("dataBind", { search: val });
      },
    },
    newType: {
      handler: function (val) {
        this.$emit("dataBind", { type: val, tag: "" });
        this.current = 0;
      },
    },
  },
  methods: {
    selected(val, i) { 
      this.$emit("dataBind", { tag: val });
      this.current = i;
    },
  },
  filters: {},

  mounted: function () {},
};
</script>

<style lang="less">
@import "../../assets/css/exam.less";
</style>
<style lang="less" scoped>
.active {
  color: #f39;
}
</style>