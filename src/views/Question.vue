<template>
    <div class="v-question">
        <template v-if="mode == 'list'">
            <QuestionList :data="data" />
        </template>
        <template v-else>
            <QuestionSingle />
        </template>
    </div>
</template>
<script>
import QuestionList from "@/components/exam/question_list.vue";
import QuestionSingle from "@/components/exam/question_single.vue";
import { getExamQuestionList } from "@/service/exam.js";
export default {
    name: "Question",
    props: [],
    components: { QuestionList, QuestionSingle },
    data: function() {
        return {
            data: [],
            params: { pageIndex: 1 },
        };
    },
    computed: {
        mode: function() {
            return this.$route.params.id ? "single" : "list";
        },
    },
    methods: {
        getListData() {
            getExamQuestionList(this.params).then((res) => {
                this.data = res.data.data || {};
            });
        },
    },
    created: function() {
        if (this.mode == "list") this.getListData();
    },
    mounted: function() {},
    filters: {},
    watch: {},
};
</script>

<style lang="less">
@import "../assets/css/exam/question.less";
</style>
