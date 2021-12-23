<template>
  <div class="v-question-single">
    <SingleTitle :item="data" />
    <SingleCard :item="data" :answer="answer" @changeVal="finalAnswer" />
    <div class="u-submit" @click="submit">提交</div>
    <div class="m-mark" v-if="!isLogin" @click="prompt"></div>
  </div>
</template>
<script>
import SingleCard from "@/components/exam/single_card.vue";
import SingleTitle from "@/components/exam/single_title.vue";
import { getQuestion } from "@/service/exam.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
  name: "QuestionSingle",
  props: [],
  components: { SingleCard, SingleTitle },
  data: function () {
    return {
      isLogin: "",
      data: {},
      answer: "",
      userAnswers: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    loadData: function () {
      let id = this.$route.params.id;
      getQuestion(id).then((res) => {
        let data = res.data;
        data.tags = JSON.parse(data.tags);
        data.options = JSON.parse(data.options);
        this.data = data;
      });
    },
    finalAnswer: function (val) {
      let key, value;
      for (var i in val) {
        key = i;
        value = val[i];
      }

      this.$set(this.userAnswers, key, value);
    },
    prompt() {
      this.$message.error("请先登录");
    },
    submit() {
      if (JSON.stringify(this.userAnswers) == "{}") {
        this.$alert("你没有选择答案哦~", "提交失败", {
          type: "error",
        });
      } else {
        //TODO: \提交答案
      }
    },
  },
  filters: {},
  created: function () {
    if (!User.isLogin()) {
      this.prompt();
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    this.loadData();
  },
};
</script>

<style lang="less">
@import "../../assets/css/exam/question_single.less";
</style>