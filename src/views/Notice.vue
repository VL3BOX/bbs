<template>
    <div class="m-archive m-notice" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <!-- <h2 class="u-notice-header">公告资讯</h2> -->
            <!-- 搜索 -->
            <div
                class="m-archive-search m-notice-search"
                slot="search-before"
                key="notice-search"
            >
                <!-- <a
                    :href="publish_link"
                    class="u-publish el-button el-button--primary"
                >
                    + 发布作品
                </a>-->
                <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                    <span slot="prepend">关键词</span>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

            <!-- 过滤 -->
            <template slot="filter">
                <!-- 版本过滤 -->
                <clientBy @filter="filter" :type="client"></clientBy>
                <!-- 角标过滤 -->
                <!-- <markBy @filter="filter"></markBy> -->
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>

            <!-- 列表 -->
            <div class="m-archive-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <!-- Banner -->
                        <router-link class="u-banner" :to="'/notice/' + item.ID" :target="target">
                            <img
                                :src="
                                    showBanner(
                                        item.post_banner,
                                        item.post_subtype
                                    )
                                "
                            />
                        </router-link>

                        <h3 class="u-notice-title" :class="{ isSticky: item.sticky }">
                            <!-- 标题文字 -->
                            <router-link
                                class="u-title"
                                :style="item.color | isHighlight"
                                :to="'/notice/' + item.ID"
                                :target="target"
                            >{{ item.post_title || "无标题" }}</router-link>

                            <!-- 角标 -->
                            <span class="u-marks" v-if="item.mark && item.mark.length">
                                <i
                                    v-for="mark in item.mark"
                                    class="u-mark"
                                    :class="mark | markcls"
                                    :key="mark"
                                >{{ mark | showMark }}</i>
                            </span>
                        </h3>

                        <!-- 字段 -->
                        <div class="u-content u-desc">{{ item.post_excerpt || item.post_title }}</div>

                        <!-- 作者 -->
                        <div class="u-notice-misc">
                            <img
                                class="u-author-avatar"
                                :src="item.author_info.user_avatar | showAvatar"
                                :alt="item.author_info.display_name"
                            />
                            <a
                                class="u-author-name"
                                :href="item.post_author | authorLink"
                                target="_blank"
                            >{{ item.author_info.display_name }}</a>
                            <span class="u-notice-date">
                                <time v-if="order == 'update'">{{item.post_modified | dateFormat}}</time>
                                <time v-else>{{item.post_date | dateFormat}}</time>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import _ from "lodash";
import { getPosts } from "../service/post";
import { getRelativeTime } from "../utils/dateFormat";
import {
    __ossMirror,
    __imgPath,
    __ossRoot,
    __Root,
} from "@jx3box/jx3box-common/data/jx3box";
import {
    showAvatar,
    authorLink,
    showBanner,
    publishLink,
    buildTarget,
    getAppType,
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list",
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
        };
    },
    computed: {
        resetParams: function () {
            return [this.search, this.client];
        },
        params: function () {
            let params = {
                per: this.per,
                page: ~~this.page || 1,
                sticky: 1,
                type: "notice",
            };
            let optionalParams = ["search", "order", "client"];
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
            return publishLink("notice");
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
    },
    filters: {
        dateFormat: function (val) {
            return getRelativeTime(new Date(val));
        },
        showAvatar: function (val) {
            return showAvatar(val);
        },
        authorLink: function (val) {
            return authorLink(val);
        },
        postLink: function (val) {
            return location.origin + "/" + getAppType() + "/" + val;
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
        "$route.params.subtype": function (val) {
            this.$store.state.subtype = val;
        },
    },
    created: function () {
        this.page = ~~this.$route.query.page || 1;
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/notice.less";
</style>
