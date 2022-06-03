<template>
    <div class="v-exam m-exam" v-loading="loading">
        <!-- 搜索 -->
        <ExamSearch @update="updateParams" />

        <!-- 切换 -->
        <div class="u-tabs">
            <div
                class="u-tab-item"
                v-for="(item, i) in types"
                :key="i"
                @click="clickTabs(i, item.value)"
                :class="i == activeIndex ? 'active' : ''"
            >
                <span class="u-tabs-span">{{ item.label }}</span>
            </div>
        </div>

        <!-- 列表 -->
        <template v-if="data && data.length">
            <component :is="component" :data="data"></component>
        </template>
        <!-- 空 -->
        <el-alert v-else title="没有找到相关条目" type="info" show-icon></el-alert>
        <!-- 分页 -->
        <el-pagination
            class="m-exam-pagination"
            background
            :page-size="per"
            :hide-on-single-page="true"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="skipTop"
        ></el-pagination>
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
            // 类型
            activeIndex: 0,
            type: "question",
            types: [
                { label: "试题库", value: "question" },
                { label: "试卷库", value: "paper" },
            ],

            data: [],
            total: 0,

            // 主要参数
            search: "",
            tag: "",
            client: "",
            page: 1,
        };
    },
    computed: {
        per: function () {
            return this.type == "paper" ? 12 : 15;
        },
        // 组合请求参数
        params: function () {
            let _params = {
                pageIndex: this.page,
                pageSize: this.per,
            };
            if (this.tag) _params.tag = this.tag;
            if (this.search) _params.title = this.search;
            if (this.client) _params.client = this.client;
            return _params;
        },
        loadMethods: function () {
            return this.type == "paper" ? getExamPaperList : getExamQuestionList;
        },
        component() {
            return this.type == "paper" ? "PaperList" : "QuestionList";
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
        resetParams() {
            this.page = 1;
            this.tag = "";
            this.data = "";
            this.total = 0;
            this.search = "";
        },
        // 更新参数
        updateParams({ key, val }) {
            if (val == "全部") val = "";
            if (key == "tag" || key == "search" || key == "client") this.page = 1;
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
        clickTabs(i, val) {
            this.activeIndex = i;
            this.type = val;
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
