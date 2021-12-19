<template>
  <div class="v-exam-card" v-if="list&&list.length">
    <div class="u-item" v-for="(item, i) in list" :key="item.id">
      <div class="m-question">
        <div class="u-number">
          <div class="u-num">
            <span v-if="type == 'paper'">{{ i + 1 }}</span>
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
              <el-checkbox-group v-model="userAnswers[item.id]">
                <el-checkbox
                  v-for="(option, index) of item.options"
                  :key="index"
                  :label="index"
                  border
                  :disabled="isSubmitted"
                  :class="{
                    'is-correct-answer': isCorrectAnswerClass(
                      item.id,
                      index
                    ),
                    'is-wrong-answer': isWrongAnswerClass(item.id, index),
                  }"
                >
                  {{ String.fromCharCode(65 + index) }}.
                  <Article :content="option"></Article>
                </el-checkbox>
              </el-checkbox-group>
            </template>
            <template v-else>
              <el-radio-group v-model="userAnswers[item.id]">
                <el-radio
                  v-for="(option, index) of item.options"
                  :key="index"
                  :label="index"
                  border
                  :disabled="isSubmitted"
                  :class="{
                    'is-correct-answer': isCorrectAnswerClass(
                      item.id,
                      index
                    ),
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
      <div class="m-answer">
        <div class="u-status">{{ myAnswers }}</div>
        <div class="u-answer">你的答案：<b>a</b></div>
        <div class="u-answer">正确答案：<b>c</b></div>
        <hr />
        <div class="m-analysis">
          <span class="u-label">解析：</span>
          <div>222</div>
          <Article :content="whyami[item.id]"></Article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
export default {
  name: "Card",
  props: ["list", "type"],
  data: function () {
    return {
      correctAnswers: {},
      whyami: {},
      isSubmitted: false,
      chooseCheckbox: {},
      chooseRadio: {},
      userAnswers: {},
      finalAnswers: {},
      aa: [],
    };
  },
  components: {
    Article,
  },
  computed: {
    
    myAnswers: function () {
      if (null) return "未作答";
      if (1) return "回答正确";
      return "回答错误";
    },
  },
  methods: {
    isCheckbox(val) {
      console.log(val, "this.isCheckbox");
    },
    isRadio(val) {
      console.log(val, "this.idRadio");
    },
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
  },
  watch: {
    chooseCheckbox: {
      handler(val) {
        this.isCheckbox(val);
      },
      deep: true,
    },
    chooseRadio: {
      handler(val) {
        this.isRadio(val);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less">
@import "../../assets/css/exam.less";
</style>