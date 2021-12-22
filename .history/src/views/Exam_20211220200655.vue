<template>
  <div class="m-exam" v-loading="loading">
    <!-- 搜索 -->
    <div class="m-archive-search m-exam-search" slot="search-before" key="exam-search">
      <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
        <span slot="prepend">关键词</span>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <!-- 切换 -->
    <el-tabs class="m-exam-tabs" v-model="type">
      <el-tab-pane v-for="item in types" :label="item.label" :key="item.value" :name="item.value"></el-tab-pane>
    </el-tabs>

    <!-- tags搜索 -->
    <div class="m-exam-tags">
      <span
        @click="searchTag(item)"
        class="el-tag el-tag--small"
        v-for="(item, i) in tags"
        :key="i"
      >{{ item }}</span>
    </div>

    <!-- 内容 -->
    <div class="m-examlist">
      <template v-if="!loading">
        <List :list="list" :type="type" v-if="list && list.length > 0" />
        <el-alert v-else :title="title" type="info" center show-icon></el-alert>
      </template>
    </div>

    <!-- 分页 -->
  </div>
</template>

<script>
import PaperList from "@/components/exam/paper_list.vue";
import tags from "@/assets/data/exam_tags.json";
import { getExamPaperList, getExamQuestionList } from "@/service/exam.js";
export default {
  name: "Exam",
  props: [],
  components: {
    List
  },
  data: function() {
    return {
      type: "paper",
      types: [
        { label: "综合试卷", value: "paper" },
        { label: "趣味问题", value: "question" }
      ],
      tags: tags.tags,
      search: "",
      tag: "",

      loading: false, //加载状态
      list: [], //数据列表
      page: 1, //当前页数
      total: 1, //总条目数
      pages: 1, //总页数
      per: 10 //每页条目
    };
  },
  computed: {
    params: function() {
      if (this.tag == "" && this.search == "") {
        return { pageIndex: this.page };
      } else {
        if (this.tag == "") {
          return { pageIndex: this.page, title: this.search };
        }
        return {
          page: this.page,
          tag: this.tag
        };
      }
    },
    title: function() {
      if (this.type == "paper") {
        return "没有找到对应的试卷";
      }
      return "没有找到对应的问题";
    }
  },
  watch: {
    params: {
      immediate: true,
      deep: true,
      handler: function() {
        this.loadExamList();
      }
    },
    type: {
      deep: true,
      handler: function() {
        this.pages = 1;
        this.search = "";
        this.tag = "";
        sessionStorage.setItem("type", this.type);
        this.loadExamList();
      }
    },
    search: {
      handler: function() {
        this.tag = "";
      }
    }
  },
  methods: {
    loadExamList: function() {
      this.loading = true;
      if (this.type == "paper") {
        getExamPaperList(this.params)
          .then(res => {
            this.list = res.data.data || {};
            this.total = res.data.total || this.total;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        getExamQuestionList(this.params)
          .then(res => {
            this.list = res.data.data || {};
            this.total = res.data.total || this.total;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    searchTag(e) {
      this.tag = e;
    },
    skipTop: function() {
      window.scrollTo(0, 0);
    }
  },
  filters: {},
  created: function() {
    this.type = sessionStorage.getItem("type") || "paper";
  },
  mounted: function() {}
};
</script>

<style lang="less">
@import "../assets/css/exam.less";
</style>
