<template>
  <div class="v-question-single">
    <SingleTitle :item="data" type="question" />
    <SingleCard :item="data" :answer="answer" :isSubmitted="isSubmitted" @changeVal="finalAnswer" />
    <div class="m-exam-submit" @click="submit">
      <el-button class="u-btn">提交</el-button>
    </div>
    <div class="m-exam-mark" v-if="!isLogin" @click="prompt"></div>

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
import { getQuestion, submitQuestionAnswer } from '@/service/exam.js'
import User from '@jx3box/jx3box-common/js/user'
export default {
  name: 'QuestionSingle',
  props: [],
  components: { SingleCard, SingleTitle, Comment },
  data: function () {
    return {
      isLogin: '',
      data: {},
      answer: '',
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
  watch: {},
  methods: {
    loadData () {
      let id = this.$route.params.id
      getQuestion(id).then((res) => {
        let data = res.data
        data.tags = JSON.parse(data.tags)
        data.options = JSON.parse(data.options)
        this.data = data

        postStat('question', this.id)
      })
    },
    finalAnswer (val) {
      this.userAnswers = {
        ...this.userAnswers,
        ...val
      }
    },
    prompt () {
      this.$message.error('请先登录')
    },
    submit () {
      if (JSON.stringify(this.userAnswers) == '{}') {
        this.$alert('你没有选择答案哦~', '提交失败', {
          type: 'error',
        })
      } else {
        let submitList = {};
        let obj = this.userAnswers
        for (const key in obj) {
          submitList = obj[key].map(o => this.data.options[o])
        }
        submitQuestionAnswer(this.$route.params.id, submitList).then((res) => {
          if (res.data) {
            this.answer = this.toAnswer(res.data.question)
            console.log(this.answer, 'res.data.question')
            this.isSubmitted = true
          }
        })
      }
    },
    toAnswer (obj) {
      let myAnswer = ''
      for (const key in this.userAnswers) {
        myAnswer = this.userAnswers[key].sort()
      }
      obj.answerList = obj.answerList.sort()
      return { ...obj, myAnswer }
    },
  },
  filters: {},
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
