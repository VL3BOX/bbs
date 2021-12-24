 <template>
  <div class="v-paper-single">
    <SingleTitle :item="data" :score="score" type="paper" />
    <div class="m-list">
      <SingleCard v-for="(item, index) in list" :key="item.id" :item="item" :index="index + 1" :answer="answer" :userAnswers="userAnswers" :isSubmitted="isSubmitted" @changeVal="finalAnswer" />
      <div class="m-mark" v-if="!isLogin" @click="prompt"></div>
    </div>
    <div class="u-submit" @click="submit">
      <el-button class="u-btn">提交</el-button>
    </div>
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
      isLogin: false,
      data: {},
      list: [],
      answer: "",
      score: -1,
      userAnswers: {},
      submitList: {},
      isSubmitted: false
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
        console.log(data, ';;;;')
        this.data = data;
        this.list = data.questionDetailList;
      });
    },
    finalAnswer: function (val) {
      let key, value;

      for (var i in val) {
        key = i;
        if (val[i].length) {
          value = val[i].sort();
        }
        value = val[i];
      }

      this.$set(this.userAnswers, key, value);
    },

    // 提示登录
    prompt () {
      this.$message.error("请先登录");
    },
    submit () {
      if (JSON.stringify(this.userAnswers) == "{}") {
        this.$alert("不能交白卷哦~", "提交失败", {
          type: "error",
        });
      } else {

        let list = this.data.questionDetailList

        for (let i = 0; i < list.length; i++) {
          for (let j in this.userAnswers) {
            if (list[i].id == j) {
              let arr = []
              for (let k = 0; k < list[i].options.length; k++) {
                if (this.userAnswers[j].length) {
                  for (let s = 0; s < this.userAnswers[j].length; s++) {
                    if (this.userAnswers[j][s] == k) {
                      arr.push(list[i].options[k])
                    }
                  }
                } else {
                  if (this.userAnswers[j] == k) {
                    arr.push(list[i].options[k])
                  }
                }
              }
              this.$set(this.submitList, list[i].id, arr);
            }
          }
        }

        submitAnswer(this.data.id, this.submitList, true).then((res) => {
          if (res.data.score) {
            this.answer = res.data.paper.questionDetailList;
            this.score = res.data.score.score
            this.isSubmitted = true
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
@import "../../assets/css/exam/paper_single.less";
</style>