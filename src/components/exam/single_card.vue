<template>
  <div class="v-single-card" v-if="item">
    <div class="m-single-question">
      <div class="u-number">
        <div class="u-num">
          <span v-if="index">{{ index }}</span>
        </div>
        <div class="u-tags">
          <el-tag class="u-tag" v-for="tag in item.tags" :key="tag" size="small">
            {{ tag }}
          </el-tag>
        </div>
      </div>
      <div class="u-cont">
        <div class="u-title">
          <span class="u-hint"> [{{ item.type == 'checkbox' ? '多选题' : '单选题' }}] </span>
          <Article :content="item.title"></Article>
        </div>
        <div class="u-option">
          <template v-if="item.type === 'checkbox'">
            <el-checkbox-group v-model="checkbox" @change="checkAnswers(item.id, checkbox)">
              <el-checkbox v-for="(option, i) of options" :key="i" :label="i" border :disabled="isSubmitted" :class="[isSubmitted ? '' : 'noSubmit', answer ? answer.myAnswerIsRight? '': myWrongClass(i): '']">
                {{ String.fromCharCode(65 + i) }}.
                <Article :content="option"></Article>
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <template v-else>
            <el-radio-group v-model="radio" @change="checkAnswers(item.id, radio)">
              <el-radio v-for="(option, i) of options" :key="i" :label="i" border :disabled="isSubmitted" :class="[isSubmitted ? '' : 'noSubmit',answer ? answer.myAnswerIsRight? '': myWrongClass(i): '']">
                {{ String.fromCharCode(65 + i) }}.
                <Article :content="option"></Article>
              </el-radio>
            </el-radio-group>
          </template>
        </div>
      </div>
    </div>
    <div class="m-single-answer" v-if="answer">
      <div class="u-status" :class="myAnswersClass(answer.myAnswer, answer.myAnswerIsRight)">{{ answer.myAnswer | isNoAnswer | isCorrect(answer.myAnswerIsRight) }}</div>
      <div class="u-answer">
        你的答案：
        <span v-if="answer.myAnswer">
          <b v-for="key in answer.myAnswer" :key="key">{{ key | letter }}</b>
        </span>
        <b v-else>-</b>
      </div>
      <div class="u-answer">
        正确答案：
        <b v-for="key in answer.answerList" :key="key">{{ key | letter }}</b>
      </div>
      <hr />
      <div class="m-analysis">
        <span class="u-label">解析：</span>
        <Article :content="answer.whyami" v-if="answer.whyami"></Article>
        <div v-else>暂无解析</div>
      </div>
    </div>
  </div>
</template>
<script>
import Article from '@jx3box/jx3box-editor/src/Article.vue'
export default {
  name: 'Card',
  props: ['item', 'answer', 'index', 'isSubmitted'],
  components: { Article },
  data: function () {
    return {
      checkbox: [],
      radio: {},
    }
  },
  computed: {
    options: function () {
      return this.item.options
    },
  },
  methods: {
    checkAnswers (key, val) {
      let value = Array.isArray(val) ? val : [val]
      this.$emit("changeVal", { [key]: value });
    },
    myAnswersClass (val, boolean) {
      if (typeof val == 'undefined') return 'noAnswer'
      if (boolean) return 'isCorrect'
      return 'isWrong'
    },
    myWrongClass (index) {
      let list = this.answer.answerList
      let my = this.answer.myAnswer || []
      for (let i = 0; i < list.length; i++) {
        if (index == list[i]) return 'isCorrect'
      }
      for (let j = 0; j < my.length; j++) {
        if (index == my[j]) return 'isWrong'
      }
    }
  },
  watch: {},
  filters: {
    letter: function (val) {
      return String.fromCharCode(65 + val)
    },
    isNoAnswer (val) {
      return typeof val == 'undefined' ? '未作答' : val
    },
    isCorrect: function (val, boolean) {
      if (val == '未作答') return val
      if (boolean) {
        return '回答正确'
      } else {
        return '回答错误'
      }
    },
  },
}
</script>
