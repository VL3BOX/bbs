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
        <!-- tags搜索 -->
        <div class="m-exam-tags">
            <span @click="selected(item, i)" class="el-tag el-tag--small el-tag--plain" v-for="(item, i) in tags" :key="i" :class="tag_index == i ? 'active' : ''">{{ item }}</span>
        </div>
        <div class="m-exam-tags">
            <span @click="switchClient(item, i)" class="el-tag el-tag--small el-tag--plain" v-for="(item, i) in clients" :key="i" :class="client_index == i ? 'active' : ''">{{ item.value }}</span>
        </div>
    </div>
</template>

<script>
import tags from "@/assets/data/exam_tags.json";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { __clients } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Search",
    data: function () {
        return {
            // 搜索
            search: "",
            activeIndex: 0,

            // 标签
            tags: tags,
            tag: "",
            tag_index: 0,
            client: "",
            client_index: 0,
        };
    },
    computed: {
        // 发布按钮链接
        publish_link: function () {
            return publishLink("exam");
        },
        clients() {
            let arr = [];
            for (const key in __clients) {
                arr.unshift({ key, value: __clients[key] });
            }
            arr.unshift({ key: "", value: "全部" });
            return arr;
        },
    },
    watch: {
        search: {
            handler: function (val) {
                this.$emit("update", { key: "search", val: val });
            },
        },
        client: {
            handler: function (val) {
                this.$emit("update", { key: "client", val });
            },
        },
        tag: {
            handler: function (val) {
                this.tag == this.$route.query.tag
                    ? ""
                    : this.$router.push({ query: { ...this.$route.query, tag: val } });
                this.$emit("update", { key: "tag", val });
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
        },
        switchClient(val, i) {
            this.client = val.key;
            this.client_index = i;
        },
    },
    created() {
        if (this.$route.query.tag) {
            this.tag = this.$route.query.tag;
            this.tag_index = this.tags.findIndex((item) => item == this.tag);
        }
    },
};
</script>

<style lang="less">
    .m-exam-tags {
        .pt(10px);
    }
    @import "~@/assets/css/exam/exam.less";
</style>
