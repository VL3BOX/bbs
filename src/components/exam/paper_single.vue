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
    </div>
    <div class="u-submit" @click="submit">提交</div>
  </div>
</template>
<script>
import SingleCard from "@/components/exam/single_card.vue";
import SingleTitle from "@/components/exam/single_title.vue";
import { getPaper, submitAnswer } from "@/service/exam.js";
export default {
  name: "PaperSingle",
  props: [],
  components: { SingleCard, SingleTitle },
  data: function () {
    return {
      data: {},
      list: [],
      answer: "",
      userAnswers: {},
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
    finalAnswer: function (val) {
      let key, value;
      for (var i in val) {
        key = i;
        value = val[i];
      }

      this.$set(this.userAnswers, key, value);
    },
    submit() {
      if (JSON.stringify(this.userAnswers) == "{}") {
        this.$alert("不能交白卷哦~", "提交失败", {
          type: "error",
        });
      } else {
         //TODO: 判断是否登录
        submitAnswer(this.data.id, this.userAnswers).then((res) => {
          console.log(res.data, "submitAnswer");
        });
      }
    },
  },
  created: function () {
    this.loadData();
  },
};
</script>

<style lang="less">
@import "../../assets/css/exam/paper_single.less";
</style>