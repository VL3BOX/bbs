<template>
  <div class="v-exam">
    <ExamSearch :type="type" @dataBind="autoSearch" />
    <PaperList v-if="type == 'paper'" :data="data" />
    <QuestionList v-else :data="data" />
  </div>
</template>
<script>
import ExamSearch from "@/components/exam/exam_search.vue";
import PaperList from "@/components/exam/paper_list.vue";
import QuestionList from "@/components/exam/question_list.vue";
import { getExamPaperList, getExamQuestionList } from "@/service/exam.js";
export default {
  name: "Exam",
  props: [],
  components: {
    ExamSearch,
    PaperList,
    QuestionList,
  },
  data: function () {
    return {
      type: "paper",
      data: [],
      params: {},
      pageIndex: 1, 
    };
  },
  watch: {
    type: {
      deep: true,
      handler: function () {
        this.pageIndex = 1;
        this.params.title = "";
        this.$delete(this.params, "tag");
        sessionStorage.setItem("type", this.type);
        this.loadExamData();
      },
    },
  },
  methods: {
    autoSearch(e) {
      if (e.type) this.type = e.type;
      if (e.tag) {
        if (e.tag == "全部") {
          this.$delete(this.params, "tag");
        } else {
          this.params.tag = e.tag;
        }
      }
      if (e.search) {
        this.params.title = e.search;
      }
      this.loadExamData();
    },
    loadExamData() {
      let params = {};
      if (this.params.tag) {
        if (this.params.title !== "") {
          params = {
            pageIndex: this.pageIndex,
            title: this.params.title,
            tag: this.params.tag,
          };
        } else {
          params = {
            pageIndex: this.pageIndex,
            tag: this.params.tag,
          };
        }
      } else {
        if (this.params.title !== "") {
          params = {
            pageIndex: this.pageIndex,
            title: this.params.title,
          };
        } else {
          params = { pageIndex: this.page };
        }
      }

      if (this.type == "paper") {
        this.getPaperData(params);
      } else {
        this.getQuestionData(params);
      }
    },
    getPaperData(params) {
      getExamPaperList(params)
        .then((res) => {
          this.data = res.data.data || {};
          this.total = res.data.total || this.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getQuestionData(params) {
      getExamQuestionList(params)
        .then((res) => {
          this.data = res.data.data || {};
          this.total = res.data.total || this.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted: function () {
    this.loadExamData();
  },
};
</script>

<style lang="less">
@import "../assets/css/exam.less";
</style>
