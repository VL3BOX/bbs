<template>
    <div class="v-search">
        <!-- 搜索 -->
        <div class="m-archive-search m-exam-search" slot="search-before" key="exam-search">
            <a :href="publish_link" class="u-publish el-button el-button--primary">+ 发布作品</a>
            <el-input placeholder="请输入搜索内容" v-model.trim.lazy="search" class="input-with-select">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 切换 -->
        <!-- <el-tabs class="m-exam-tabs" v-model="type">
			<el-tab-pane v-for="item in types" :label="item.label" :key="item.value" :name="item.value"></el-tab-pane>
		</el-tabs> -->
        <div class="u-tabs">
            <div class="u-tab-item" v-for="(item, i) in types" :key="i" @click="clickTabs(i,item.value)" :class="i == activeIndex ? 'active' : ''">
                <span class="u-tabs-span">{{ item.label }}</span>
            </div>
        </div>

        <!-- tags搜索 -->
        <div class="m-exam-tags">
            <span @click="selected(item, i)" class="el-tag el-tag--small el-tag--plain" v-for="(item, i) in tags" :key="i" :class="tag_index == i ? 'active' : ''">{{ item }}</span>
        </div>
    </div>
</template>

<script>
import tags from "@/assets/data/exam_tags.json";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Search",
    components: {},
    data: function () {
        return {
            // 搜索
            search: "",
            activeIndex: 0,

            // 类型
            type: "question",
            types: [
                { label: "试题库", value: "question" },
                { label: "试卷库", value: "paper" },
            ],

            // 标签
            tags: tags,
            tag: "",
            tag_index: 0,
        };
    },
    computed: {
        // 发布按钮链接
        publish_link: function () {
            return publishLink("exam");
        },
    },
    watch: {
        search: {
            handler: function (val) {
                this.$emit("update", { key: "search", val: val });
            },
        },
        type: {
            handler: function (val) {
                this.$emit("update", { key: "type", val: val });
            },
        },
        tag: {
            handler: function (val) {
                this.$emit("update", { key: "tag", val: val });
            },
        },
    },
    methods: {
        selected(val, i) {
            this.tag = val;
            this.tag_index = i;
        },
        clickTabs(i, val) {
            this.activeIndex = i;
            this.type = val;
        },
    },
};
</script>

<style lang="less">
    @import "~@/assets/css/exam/exam.less";
</style>
