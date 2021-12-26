<template>
    <div class="v-question-single">
        <SingleTitle :item="data" type="question" />
        <SingleCard :item="data" :answer="answer" :userAnswers="userAnswers" :isSubmitted="isSubmitted" @changeVal="finalAnswer" />
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
import SingleCard from "@/components/exam/single_card.vue";
import SingleTitle from "@/components/exam/single_title.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { postStat } from "@jx3box/jx3box-common/js/stat.js";
import { getQuestion, submitQuestionAnswer } from "@/service/exam.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "QuestionSingle",
    props: [],
    components: { SingleCard, SingleTitle, Comment },
    data: function() {
        return {
            isLogin: "",
            data: {},
            answer: "",
            userAnswers: {},
            submitAnswers: {},
            isSubmitted: false,
        };
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        user_id() {
            return this.data.createUserId
        }
    },
    watch: {},
    methods: {
        loadData: function() {
            let id = this.$route.params.id;
            getQuestion(id).then((res) => {
                let data = res.data;
                data.tags = JSON.parse(data.tags);
                data.options = JSON.parse(data.options);
                this.data = data;

                postStat("question", this.id)
            });
        },
        finalAnswer: function(val) {
            let key, value;

            for (var i in val) {
                key = i;
                if (val[i].length) {
                    value = val[i].sort();
                }
                value = val[i];
            }

            let arr = [];
            for (let i = 0; i < this.data.options.length; i++) {
                for (let j = 0; j < value.length; j++) {
                    if (value[j] == i) {
                        arr.push(this.data.options[i]);
                    }
                }
            }

            this.submitAnswers = arr;
            this.$set(this.userAnswers, key, value);
        },
        prompt() {
            this.$message.error("请先登录");
        },
        submit() {
            if (JSON.stringify(this.userAnswers) == "{}") {
                this.$alert("你没有选择答案哦~", "提交失败", {
                    type: "error",
                });
            } else {
                submitQuestionAnswer(this.$route.params.id, this.submitAnswers).then((res) => {
                    if (res.data) {
                        this.answer = res.data;
                        this.isSubmitted = true;
                    }
                });
            }
        },
    },
    filters: {},
    created: function() {
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
@import "~@/assets/css/exam/exam.less";
@import "~@/assets/css/exam/single_title.less";
@import "~@/assets/css/exam/single_card.less";
</style>
