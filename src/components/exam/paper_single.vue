 <template>
  <div class="v-paper-single">
    <SingleTitle :item="data" />
    <div class="m-list">
      <SingleCard
        v-for="(item, index) in list"
        :key="item.id"
        :item="item"
        :index="index + 1"
        :answer="answer"
        @changeVal="finalAnswer"
      />
      <div class="m-mark" v-if="!isLogin" @click="prompt"></div>
    </div>
    <div class="u-submit" @click="submit">提交</div>
  </div>
</template>
<script>
import SingleCard from "@/components/exam/single_card.vue";
import SingleTitle from "@/components/exam/single_title.vue";
import { getPaper, submitAnswer } from "@/service/exam.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
  name: "PaperSingle",
  props: [],
  components: { SingleCard, SingleTitle },
  data: function () {
    return {
      isLogin: "",
      data: {},
      list: [],
      answer: "",
      userAnswers: {},
      submitList: {},
    };
  },

  methods: {
    loadData: function () {
      let id = this.$route.params.id;
      getPaper(id).then((res) => {
        let data = res.data;
        data.tags = JSON.parse(data.tags);
        for (let item of data.questionDetailList) {
          item.options = JSON.parse(item.options);
          item.tags = JSON.parse(item.tags);
        }

        this.data = data;
        this.list = data.questionDetailList;
      });
    },
    finalAnswer: function (e) {
      let key, val;

      for (const i in e) {
        if(e[i] instanceof Array){
          
        }
      }
      // this.$set(this.userAnswers, answerKey, answerValue);

      // this.$set(this.submitList, keys, keysValue);
    },

    // 提示登录
    prompt() {
      this.$message.error("请先登录");
    },
    submit() {
      if (JSON.stringify(this.userAnswers) == "{}") {
        this.$alert("不能交白卷哦~", "提交失败", {
          type: "error",
        });
      } else {
        console.log(this.userAnswers, this.submitList, "...............");
        submitAnswer(this.data.id, this.submitList, true).then((res) => {
          console.log(res.data, "submitAnswer");
          if (res.data.score) {
            this.answer = res.data.paper.questionDetailList;
          }
        });
      }
    },
  },
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
@import "../../assets/css/paper.less";
</style>