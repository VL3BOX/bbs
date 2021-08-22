<template>
    <div class="v-feedback" v-loading="loading">
        <!-- 单页 -->
        <template v-if="id">
            <div class="m-feedback-single-panel">
                <el-button size="mini" icon="el-icon-arrow-left" @click="goBack">返回列表</el-button>
                <a :href="feedback_url" class="u-email" target="_blank">
                    <i class="el-icon-phone-outline"></i>快捷邮件
                </a>
            </div>
            <div class="m-single-feedback-container">
                <feedback-item mode="single" :feedback-id="id" />
            </div>
        </template>

        <!-- 列表 -->
        <template v-else>
            <h2 class="m-feedback-title">
                <i class="u-icon el-icon-message"></i>
                <span class="u-title">反馈建议</span>
                <a :href="feedback_url" class="u-email" target="_blank">
                    <i class="el-icon-phone-outline"></i>快捷邮件
                </a>
            </h2>
            <publish-feedback @update="handleFeedbackUpdate"></publish-feedback>
            <listbox
                :data="data"
                :total="total"
                :pages="pages"
                :per="per"
                :page="page"
                @appendPage="appendPage"
                @changePage="changePage"
            >
                <!-- 过滤 -->
                <template slot="filter">
                    <!-- 版本过滤 -->
                    <clientBy @filter="filter" :type="client"></clientBy>
                    <!-- 排序过滤 -->
                    <orderBy @filter="filter"></orderBy>
                </template>

                <!-- 列表 -->
                <div class="m-feedback-list" v-if="data.length">
                    <ul class="u-list">
                        <li class="u-item" v-for="(item, i) in data" :key="i">
                            <feedback-item :data="item" :order="order" @update="handleUpdate" />
                        </li>
                    </ul>
                </div>
            </listbox>
        </template>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import publish_feedback from "@/components/feedback_publish.vue";
import feedbackItem from "@/components/feedback_item.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import _ from "lodash";
import { getPosts, getLikes } from "../service/post";
import dateFormat from "../utils/dateFormat";
import {
    __ossMirror,
    __imgPath,
    __ossRoot,
    __Root,
    feedback
} from "@jx3box/jx3box-common/data/jx3box";
import {
    showAvatar,
    showBanner,
    publishLink,
    buildTarget,
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Feedback",
    props: [],
    data: function () {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 10, //每页条目
            appendMode: false, //追加模式

            search: "",
            searchType: "title",

            order: "update", //排序模式
            mark: "", //筛选模式
            client: this.$store.state.client, //版本选择

            feedback_url : feedback
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        resetParams: function () {
            return [this.subtype, this.search, this.mark, this.client];
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
                sticky: 1,
                type: "feedback",
            };
            let optionalParams = ["search", "order", "mark", "client"];
            optionalParams.forEach((item) => {
                if (this[item]) {
                    params[item] = this[item];
                }
            });
            return params;
        },
        target: function () {
            return buildTarget();
        },
        // 根据栏目定义
        defaultBanner: function () {
            return __imgPath + "image/banner/null.png";
        },
        publish_link: function (val) {
            return publishLink("bbs");
        },
    },
    methods: {
        loadPosts: function () {
            this.loading = true;
            getPosts(this.params, this)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.appendMode = false;
                    this.loading = false;
                });
        },
        changePage: function (i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function (i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function (o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
        showBanner: function (val, subtype) {
            if (val) {
                return showBanner(val);
            } else {
                return __imgPath + "image/banner/bbs" + subtype + ".png?v=1";
            }
        },
        handleFeedbackUpdate: function (val) {
            this.data = [val, ...this.data];
            // this.loadPosts();
        },
        // 批量点赞
        loadLike: function () {
            let id = this.data.map((d) => d.ID);
            id = id.join(',');
            const params = {
                post_type: 'feedback',
                post_action: 'likes',
                id
            }
            getLikes(params).then((res) => {
                const likes = res.data.data;
                if(Object.keys(likes).length){
                    this.data.forEach((d) => {
                        this.$set(d, 'count', likes?.[d.ID]?.likes)
                    });
                }
            });
        },
        goBack: function () {
            this.$router.push("/feedback");
        },
        handleUpdate: function (id){
            this.data = this.data.filter(d => d.ID !== id);
        }
    },
    filters: {
        dateFormat: function (val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        isHighlight: function (val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function (val) {
            return mark_map[val];
        },
        markcls: function (val) {
            return "u-mark-" + val;
        },
    },
    watch: {
        subtype: function () {
            this.search = "";
        },
        params: {
            deep: true,
            immediate: true,
            handler: function (val) {
                this.loadPosts();
            },
        },
        "$route.query.page": function (val) {
            this.page = ~~val;
        },
        data: {
            deep: true,
            handler: function() {
                this.loadLike()
            }
        }
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
    },
    components: {
        listbox,
        "publish-feedback": publish_feedback,
        feedbackItem,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
@import "../assets/css/feedback.less";
</style>
