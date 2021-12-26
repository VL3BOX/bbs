<template>
  <div class="v-paper-single">
    <SingleTitle :item="data" :score="score" type="paper" />
    <div class="m-list">
      <SingleCard v-for="(item, index) in list" :key="item.id" :item="item" :index="index + 1" :answer="answer" :userAnswers="userAnswers" :isSubmitted="isSubmitted" @changeVal="finalAnswer" />
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
  data: function() {
    return {
      isLogin: false,
      data: {},
      list: [],
      answer: '',
      score: -1,
      userAnswers: {},
      isSubmitted: false,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    user_id() {
      return this.data.createUserId
    },
  },

  methods: {
    loadData: function() {
      let id = this.$route.params.id
      getPaper(id).then((res) => {
        let data = res.data
        data.tags = JSON.parse(data.tags)
        for (let item of data.questionDetailList) {
          item.options = JSON.parse(item.options)
          item.tags = JSON.parse(item.tags)
        }
        this.data = data
        this.list = data.questionDetailList

        postStat('paper', this.id)
      })
    },
    finalAnswer: function(val) {
      let key, value

      for (var i in val) {
        key = i
        if (val[i].length) {
          value = val[i].sort()
        }
        value = val[i]
      }

      this.$set(this.userAnswers, key, value)
    },

    // 提示登录
    prompt() {
      this.$message.error('请先登录')
    },
    submit() {
      if (JSON.stringify(this.userAnswers) == '{}') {
        this.$alert('不能交白卷哦~', '提交失败', {
          type: 'error',
        })
      } else {
        let list = this.data.questionDetailList
        let obj = this.userAnswers
        let submitList = {}
        for (const key in obj) {
          submitList[key] = this.toSubmitList(key, obj[key], list)
        }
        submitAnswer(this.data.id, submitList, true).then((res) => {
          if (res.data.score) {
            this.answer = res.data.paper.questionDetailList
            this.score = res.data.score.score
            this.isSubmitted = true
          }
        })
      }
    },
    toSubmitList(id, val, obj) {
      let arr = []
      for (const i in obj) {
        if (obj[i].id == id) {
          if (typeof val == 'object') {
            arr = this.toOptions(val, obj[i].options)
          }
          if (typeof val == 'number') {
            arr = [obj[i].options[val]]
          }
        }
      }
      return arr
    },
    toOptions(obj, list) {
      let arr = []
      for (const i in list) {
        for (const j in obj) {
          if (i == j) {
            arr.push(list[i])
          }
        }
      }
      return arr
    },
  },
  created: function() {
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
@import '~@/assets/css/exam/exam.less';
@import '~@/assets/css/exam/single_title.less';
@import '~@/assets/css/exam/single_card.less';
</style>
