<template>
  <div class="v-paper">
    <template v-if="mode == 'list'">
      <PaperList />
    </template>
    <template v-else>
      <PaperSingle />
    </template>
  </div>
</template>

<script>
import PaperList from "@/components/exam/paper_list.vue";
import PaperSingle from "@/components/exam/paper_single.vue";
import { getExamPaperList, getPaper, submitAnswer } from "@/service/exam.js";
export default {
  name: "Paper",
  props: [],
  data: function() {
    return {
      id: 0,
      detail: "",
      list: [],
      answers: {},
      isFinished: false
    };
  },
  computed: {
    mode: function() {
      return this.$route.params.id ? "single" : "list";
    }
  },
  methods: {
    getData() {
      getPaper(this.id)
        .then(res => {
          let _list = res?.data?.questionDetailList;
          _list.forEach((item, i) => {
            item.tags = JSON.parse(item.tags);
            item.options = JSON.parse(item.options);
          });
          this.list = _list;
          this.detail = res?.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    submit(force = false) {
      let data = this.answers;
      let arr = Object.keys(data);
      console.log(data, typeof data, arr.length);
      if (arr.length < 1) {
        this.$alert("不能交白卷哦~", "提交失败", {
          type: "error"
        });
      } else {
        submitAnswer(this.examid, data, force).then(res => {
          console.log(res.data, "submitAnswer");
        });
      }
    }
  },

  created: function() {},
  mounted: function() {
    this.id = +this.$route.params.id;
    if (this.id !== 0) {
      this.getData();
    }
  },
  components: { PaperList, PaperSingle }
};
</script>

<style lang="less">
@import "../assets/css/paper.less";
</style>
