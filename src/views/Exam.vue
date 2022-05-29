<template>
    <div class="v-exam m-exam" v-loading="loading">
        <!-- 搜索 -->
        <ExamSearch :type="type" @update="updateParams" />
        <!-- 列表 -->
        <template v-if="data && data.length">
            <PaperList v-if="type == 'paper'" :data="data" />
            <QuestionList v-else :data="data" />
        </template>
        <!-- 空 -->
        <el-alert v-else title="没有找到相关条目" type="info" show-icon></el-alert>
        <!-- 分页 -->
        <el-pagination class="m-exam-pagination" background :page-size="per" :hide-on-single-page="true" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total" @current-change="skipTop"></el-pagination>
    </div>
</template>
<script>
import ExamSearch from "@/components/exam/exam_search.vue";
import PaperList from "@/components/exam/paper_list.vue";
import QuestionList from "@/components/exam/question_list.vue";
import { getExamPaperList, getExamQuestionList } from "@/service/exam.js";
export default {
    name: "Exam",
    props: [],
    components: {
        ExamSearch,
        PaperList,
        QuestionList,
    },
    data: function () {
        return {
            loading: false,
            type: "question",
            data: [],
            total: 0,

            // 主要参数
            search: "",
            tag: "",
            page: 1,
        };
    },
    computed: {
        per: function () {
            return this.type == "paper" ? 12 : 15;
        },
        // 组合请求参数
        params: function () {
            return {
                pageIndex: this.page,
                pageSize: this.per,
                title: this.search,
                tag: this.tag,
            };
        },
        loadMethods: function () {
            return this.type == "paper" ? getExamPaperList : getExamQuestionList;
        },
    },
    watch: {
        // 切换类别
        type: function () {
            this.resetParams();
            this.loadExamData();
        },
        // 监听参数更新
        params: {
            immediate: true,
            deep: true,
            handler: function () {
                this.loadExamData();
            },
        },
    },
    methods: {
        // 重置参数
        resetParams: function () {
            this.page = 1;
            this.tag = "";
            this.data = "";
            this.total = 0;
        },
        // 更新参数
        updateParams(payload) {
            let { key, val } = payload;
            if (val == "全部") val = "";
            this[key] = val;
        },
        // 加载数据
        loadExamData() {
            this.loading = true;
            this.loadMethods(this.params)
                .then((res) => {
                    this.data = res.data?.data || "";
                    this.total = ~~res.data?.page.total || 0;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 杂项
        skipTop: function () {
            window.scrollTo(0, 0);
        },
    },
};
</script>

<style lang="less">
    @import "~@/assets/css/app.less";
    @import "../assets/css/exam/exam.less";
</style>
