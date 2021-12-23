<template>
  <div class="v-single-card" v-if="item">
    <div class="m-single-question">
      <div class="u-number">
        <div class="u-num">
          <span v-if="index">{{ index }}</span>
        </div>
        <div class="u-tags">
          <el-tag
            class="u-tag"
            v-for="tag in item.tags"
            :key="tag"
            size="small"
          >
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
            <el-checkbox-group
              v-model="checkbox"
              @change="checkAnswers(item.id, checkbox)"
            >
              <el-checkbox
                v-for="(option, index) of options"
                :key="index"
                :label="index"
                border
                :disabled="isSubmitted"
                :class="{
                  'is-correct-answer': isCorrectAnswerClass(item.id, index),
                  'is-wrong-answer': isWrongAnswerClass(item.id, index),
                }"
              >
                {{ String.fromCharCode(65 + index) }}.
                <Article :content="option"></Article>
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <template v-else>
            <el-radio-group
              v-model="radio"
              @change="checkAnswers(item.id, radio)"
            >
              <el-radio
                v-for="(option, index) of options"
                :key="index"
                :label="index"
                border
                :disabled="isSubmitted"
                :class="{
                  'is-correct-answer': isCorrectAnswerClass(item.id, index),
                  'is-wrong-answer': isWrongAnswerClass(item.id, index),
                }"
              >
                {{ String.fromCharCode(65 + index) }}.
                <Article :content="option"></Article>
              </el-radio>
            </el-radio-group>
          </template>
        </div>
      </div>
    </div>
    <div class="m-single-answer" v-if="answer">
      <div class="u-status">{{ myAnswers }}</div>
      <div class="u-answer">你的答案：<b>a</b></div>
      <div class="u-answer">
        正确答案：<b v-for="key in itemAnswer.answerList" :key="key">{{
          key | letter
        }}</b>
      </div>
      <hr />
      <div class="m-analysis">
        <span class="u-label">解析：</span>

        <Article
          :content="itemAnswer.whyami"
          v-if="itemAnswer.whyami"
        ></Article>
        <div v-else>暂无解析</div>
      </div>
    </div>
  </div>
</template>
<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
export default {
  name: "Card",
  props: ["item", "answer", "index"],
  components: { Article },
  data: function () {
    return {
      checkbox: [],
      radio: {},
      isSubmitted: false,
      whyami: {},
    };
  },
  computed: {
    myAnswers: function () {
      if (null) return "未作答";
      if (this.itemAnswer.myAnswerIsRight) return "回答正确";
      return "回答错误";
    },
    options: function () {
      return this.item.options;
    },
    itemAnswer: function () {
      let data = {};
      for (let i = 0; i < this.answer.length; i++) {
        if (this.item.id == this.answer[i].id) {
          data = this.answer[i];
          break;
        }
      }
      return data;
    },
  },
  methods: {
    isCorrectAnswerClass(qid, idx) {
      // if (Object.keys(this.correctAnswers).length > 0) {
      //   return this.correctAnswers[qid].includes(idx);
      // } else {
      //   return false;
      // }
    },
    isWrongAnswerClass(qid, idx) {
      // if (Object.keys(this.correctAnswers).length > 0) {
      //   if (
      //     !this.correctAnswers[qid].includes(idx) &&
      //     this.userAnswers[qid] !== null
      //   ) {
      //     if (this.userAnswers[qid] === idx) {
      //       return true;
      //     } else if (typeof this.userAnswers[qid] !== "number") {
      //       return this.userAnswers[qid].includes(idx);
      //     }
      //   }
      // }
      return false;
    },
    checkAnswers(key, val) {
      this.$emit("changeVal", { [key]: val });
    },
  },
  watch: {
    itemAnswer: {
      handler(val) {
        console.log(val, "valvalvalval");
      },
      deep: true,
    },
  },
  filters: {
    letter: function (val) {
      return String.fromCharCode(65 + val);
    },
  },
};
</script>
