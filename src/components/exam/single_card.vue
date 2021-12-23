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
          <span class="u-hint">
            [{{ item.type == "checkbox" ? "多选题" : "单选题" }}]
          </span>
          <Article :content="item.title"></Article>
        </div>
        <div class="u-option">
          <template v-if="item.type === 'checkbox'">
            <el-checkbox-group v-model="checkbox" @change="checkAnswers(item.id, checkbox)">
              <el-checkbox v-for="(option, index) of options" :key="index" :label="index" border :disabled="isSubmitted" :class="[isSubmitted?'':'noSubmit', isCorrect(index,item.id,answer,options.length)?'isCorrect':'']">
                {{ String.fromCharCode(65 + index) }}.
                <Article :content="option"></Article>
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <template v-else>
            <el-radio-group v-model="radio" @change="checkAnswers(item.id, radio)">
              <el-radio v-for="(option, index) of options" :key="index" :label="index" border :disabled="isSubmitted" :class="[isSubmitted?'':'noSubmit',isCorrect(index,item.id,answer,options.length)?'isCorrect':'']">
                {{ String.fromCharCode(65 + index) }}.
                <Article :content="option"></Article>
              </el-radio>
            </el-radio-group>
          </template>
        </div>
      </div>
    </div>
    <div class="m-single-answer" v-if="answer">
      <div class="u-status" :class="myAnswers">{{ myAnswers | isCorrect}}</div>
      <div class="u-answer">
        你的答案：<b>{{ userAnswers[itemAnswer.id] | letter }}</b>
      </div>
      <div class="u-answer">
        正确答案：<b v-for="key in answerList" :key="key">{{
					key | letter
				}}</b>
      </div>
      <hr />
      <div class="m-analysis">
        <span class="u-label">解析：</span>

        <Article :content="itemAnswer.whyami" v-if="itemAnswer.whyami"></Article>
        <div v-else>暂无解析</div>
      </div>
    </div>
  </div>
</template>
<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
export default {
  name: "Card",
  props: ["item", "answer", "index", "userAnswers", 'isSubmitted'],
  components: { Article },
  data: function () {
    return {
      checkbox: [],
      radio: {},
      whyami: {},
      itemAnswer: '',
      Correct: false
    };
  },
  computed: {
    options: function () {
      return this.item.options;
    },
    answerList: function () {
      let list = []
      for (const key in this.itemAnswer.answerList) {
        list.push(this.itemAnswer.answerList[key])
      }
      list = list.sort()
      return list
    },
    myAnswers: function () {
      for (const key in this.userAnswers) {
        if (key == this.itemAnswer.id) {
          if (this.itemAnswer.type == "checkbox") {
            if (this.itemAnswer.answerList == this.userAnswers[key]) return 'isCorrect'
            return "isWrong";

          } else {
            let val
            for (const i in this.itemAnswer.answerList) {
              val = this.itemAnswer.answerList[i]
            }
            if (this.userAnswers[key] == val) return 'isCorrect'
            return "isWrong";
          }
        }
      }
      return "noAnswers";
    },
  },
  methods: {
    checkAnswers (key, val) {
      this.$emit("changeVal", { [key]: val });
    },
    getQuestionData () {
      this.itemAnswer = this.answer.question
    },
    getPaperData () {
      let data = {};
      for (let i = 0; i < this.answer.length; i++) {
        if (this.item.id == this.answer[i].id) {
          data = this.answer[i];
          break;
        }
      }
      this.itemAnswer = data;
    },
    isCorrect (val, id, list, len) {
      if (list) {
        if (list.question) {
          if (id == list.question.id) {
            for (let j = 0; j < len; j++) {
              for (let i = 0; i < list.question.answerList.length; i++) {
                if (val == list.question.answerList[i]) {
                  return true
                }
              }
            }
          }
        } else {
          for (let i = 0; i < list.length; i++) {
            if (id == list[i].id) {
              for (let j = 0; j < len; j++) {
                for (let j = 0; j < list[i].answerList.length; j++) {
                  if (val == list[i].answerList[j]) {
                    return true
                  }
                }
              }
            }
          }
        }
      }
      return false
    },
  },
  watch: {
    answer: {
      handler (data) {
        data.question ? this.getQuestionData() : this.getPaperData()
      },
      deep: true,
    },
    myAnswers: {
      handler (val) {
        console.log(val)
      },
      deep: true,
    }
  },
  filters: {
    letter: function (val) {
      if (typeof val == 'undefined') return '-'
      if (typeof val == "object") {
        let arr = [];
        for (const key in val) {
          arr.push(String.fromCharCode(65 + val[key]));
        }
        return arr.join("");
      }
      return String.fromCharCode(65 + val);
    },
    isCorrect: function (val) {
      if (val == 'isCorrect') return '回答正确'
      if (val == 'isWrong') return '回答错误'
      return '未作答'
    }
  },

};
</script>
