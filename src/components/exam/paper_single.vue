<template>
  <div class="v-paper-single">
    <SingleTitle :item="data" :score="score" type="paper" />
    <div class="m-list">
      <SingleCard v-for="(item, index) in list" :key="item.id" :item="item.list" :index="index + 1" :answer="item.answer" :isSubmitted="isSubmitted" @changeVal="finalAnswer" />
      <div class="m-exam-mark" v-if="!isLogin" @click="prompt"></div>
    </div>
    <div class="m-exam-submit" @click="submit">
      <el-button class="u-btn">提交</el-button>
    </div>

    <p>&nbsp;</p>

    <Thx class="m-thx" :postId="id" postType="emotion" :userId="user_id" :adminBoxcoinEnable="false" :userBoxcoinEnable="false" />
    <div class="m-single-comment">
      <el-divider content-position="left">评论</el-divider>
      <Comment :id="id" category="emotion" />
    </div>
  </div>
</template>
<script>
import SingleCard from '@/components/exam/single_card.vue'
import SingleTitle from '@/components/exam/single_title.vue'
import Comment from '@jx3box/jx3box-comment-ui/src/Comment.vue'
import { postStat } from '@jx3box/jx3box-common/js/stat.js'
import { getPaper, submitAnswer } from '@/service/exam.js'
import User from '@jx3box/jx3box-common/js/user'
export default {
  name: 'PaperSingle',
  props: [],
  components: { SingleCard, SingleTitle, Comment },
  data: function () {
    return {
      isLogin: false,
      data: {},
      list: [],
      answer: '',
      score: "",
      userAnswers: {},
      isSubmitted: false,
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    user_id () {
      return this.data.createUserId
    },
  },

  methods: {
    loadData () {
      getPaper(this.id).then((res) => {
        let data = res.data;
        data.tags = JSON.parse(data.tags);
        data.questionDetailList = data.questionDetailList.map(item => {
          item.options = JSON.parse(item.options);
          item.tags = JSON.parse(item.tags);

          return item
        })
        this.data = data;

        this.list = data.questionDetailList.map(item => {
          return {
            list: item
          }
        });
        postStat("paper", this.id);
      })
    },
    finalAnswer (val) {
      this.userAnswers = {
        ...this.userAnswers,
        ...val
      }
    },
    // 提示登录
    prompt () {
      this.$message.error('请先登录')
    },
    submit () {
      if (!Object.keys(this.userAnswers).length) {
        this.$alert("不能交白卷哦~", "提交失败", {
          type: "error",
        });
      } else {
        let list = this.data.questionDetailList;
        let obj = this.userAnswers;
        let submitList = {};
        for (const key in obj) {
          const item = list.find(l => l.id === ~~key)
          submitList[key] = obj[key].map(o => item.options[o])
        }
        let userAnswers = []
        for (let i in this.userAnswers) {
          userAnswers.push({ id: [i], myAnswer: this.sortKey(this.userAnswers[i]) })
        }
        submitAnswer(this.id, submitList, true).then((res) => {
          if (res.data.score) {
            const paper = res.data.paper;
            this.list = this.list.map(item => {
              let answer = paper.questionDetailList.find(q => q.id === item.list.id);
              answer.answerList = this.sortKey(answer.answerList)
              const myAnswer = userAnswers.find(q => q.id == answer.id)
              item.answer = { ...answer, ...myAnswer };
              return item;
            })
            this.score = [] + res.data.score.score;
            this.isSubmitted = true;
          }
        });
      }
    },
    sortKey (obj) {
      let arr = []
      for (const key in obj) {
        arr.push(obj[key])
      }
      return arr.sort()
    }
  },
  created: function () {
    if (!User.isLogin()) {
      this.prompt()
      this.isLogin = false
    } else {
      this.isLogin = true
    }
    this.loadData()
  },
}
</script>

<style lang="less">
@import "~@/assets/css/exam/exam.less";
@import "~@/assets/css/exam/single_title.less";
@import "~@/assets/css/exam/single_card.less";
</style>
