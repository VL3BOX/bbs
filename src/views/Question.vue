<template>
    <div class="v-question">
        <template v-if="mode == 'list'">
            <!-- 搜索 -->
            <QuestionSearch :type="`paper`" @update="updateParams" />
            <QuestionList :data="data" v-if="data && data.length" />
            <el-alert v-else title="没有找到相关条目" type="info" show-icon></el-alert>
            <!-- 分页 -->
            <el-pagination class="m-exam-pagination" background :page-size="per" :hide-on-single-page="true" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total" @current-change="skipTop"></el-pagination>
        </template>
        <template v-else>
            <QuestionSingle />
        </template>
    </div>
</template>
<script>
import QuestionSearch from "@/components/exam/search.vue";
import QuestionList from "@/components/exam/question_list.vue";
import QuestionSingle from "@/components/exam/question_single.vue";
import { getExamQuestionList } from "@/service/exam.js";
export default {
    name: "Question",
    components: { QuestionList, QuestionSingle, QuestionSearch },
    data: function () {
        return {
            data: [],
            search: "",
            tag: "",
               client: "",
            per: 12,
            page: 1,
            total: 0,
        };
    },
    computed: {
        mode: function () {
            return this.$route.params.id ? "single" : "list";
        },
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
    },
    methods: {
        getListData() {
            getExamQuestionList(this.params).then((res) => {
                this.data = res.data?.data || "";
                this.total = ~~res.data?.page.total || 0;
            });
        },
        // 更新参数
        updateParams({ key, val }) {
            if (val == "全部") val = "";
            this[key] = val;
        },
        skipTop: function () {
            window.scrollTo(0, 0);
        },
    },
    created: function () {
        if (this.mode == "list") this.getListData();
    },
    watch: {
        // 监听参数更新
        params: {
            immediate: true,
            deep: true,
            handler: function () {
                this.getListData();
            },
        },
    },
};
</script>

<style lang="less">
    @import "../assets/css/exam/question.less";
</style>
