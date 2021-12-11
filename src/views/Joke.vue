<template>
    <div class="v-joke" v-loading="loading">
        <!-- 单页 -->
        <div class="m-joke-single-container" v-if="id">
            <div class="m-joke-goback">
                <el-button size="mini" icon="el-icon-arrow-left" @click="goBack">返回列表</el-button>
                <a class="u-doc" href="/tool/23239" target="_blank">
                    <i class="el-icon-info"></i>游戏内获取或发布骚话
                </a>
            </div>
            <el-row class="v-joke-list" :gutter="20">
                <el-col :span="24" class="item">
                    <div class="v-joke-list-item">
                        <joke-item :joke="joke" mode="single" />
                    </div>
                </el-col>
            </el-row>
            <div class="m-joke-tags" v-if="joke.tags && joke.tags.length">
                <i class="el-icon-price-tag"></i>
                <span class="u-tag" v-for="(tag,i) in joke.tags" :key="i">{{tag}}</span>
            </div>
            <Thx
                class="m-thx"
                :postId="id"
                postType="joke"
                :userId="user_id"
                :adminBoxcoinEnable="false"
                :userBoxcoinEnable="true"
            />
            <div class="m-single-comment">
                <el-divider content-position="left">评论</el-divider>
                <Comment :id="id" category="post" v-if="id && !joke.comment" />
                <el-alert title="作者没有开启评论功能" type="warning" show-icon v-else></el-alert>
            </div>
        </div>

        <!-- 列表 -->
        <div class="m-joke-list-container" v-else>
            <!-- 搜索 -->
            <div class="m-joke-search" slot="search-before">
                <el-input placeholder="请输入搜索内容" v-model="search">
                    <span slot="prepend">关键词</span>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!-- 门派分类 -->
            <div class="m-joke-types">
                <el-tabs v-model="type">
                    <el-tab-pane name="all" label="全部">
                        <span slot="label">
                            <i class="u-icon el-icon-menu" style="vertical-align: 0;"></i>全部
                        </span>
                    </el-tab-pane>
                    <el-tab-pane v-for="(item,i) in schoolmap" :key="i" :name="i">
                        <div slot="label" style="min-width:57px;">
                            <img class="u-icon" :src="i | showSchoolIcon" :alt="item" />
                            {{item}}
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 列表 -->
            <el-row class="v-joke-list" :gutter="20" v-if="jokes && jokes.length">
                <el-col :span="24" v-for="(joke) in jokes" :key="joke.ID" class="item">
                    <div class="v-joke-list-item">
                        <joke-item :joke="joke" @update="handleJokeUpdate" />
                    </div>
                </el-col>
            </el-row>
            <el-alert v-else title="没有找到相关条目" type="info" show-icon></el-alert>
            <!-- 分页 -->
            <el-pagination
                class="v-joke-pagination"
                background
                :page-size="per"
                :hide-on-single-page="true"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @current-change="skipTop"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import emotion from "@jx3box/jx3box-emotion/data/default.json";
import { getJokes, getJoke } from "@/service/joke";
import { getLikes } from "../service/next";
import joke_item from "../components/joke_item";
import schoolmap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
    name: "Joke",
    components: {
        "joke-item": joke_item,
        Comment,
    },
    data: function () {
        return {
            loading: false,
            sortedEmotions: [],
            schoolmap,

            type: "all",
            search: "",
            per: 10,
            page: 1,
            total: 1,
            jokes: [],

            joke: "",
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        params({ search, page, per }) {
            const obj = {
                per,
                page,
                order: "post_date-DESC",
            };
            if (this.type != "all") obj.subtype = this.type;
            if (search) Object.assign(obj, { search });

            return obj;
        },
        keys: function () {
            return [this.search, this.page, this.per, this.type, this.id];
        },
        user_id: function () {
            return this.joke?.post_author || 0;
        },
    },
    filters: {
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
        },
    },
    methods: {
        // 表情排序
        sortEmotion() {
            const keys = Object.keys(emotion);
            keys.sort((item1, item2) => {
                return item1.localeCompare(item2);
            });
            keys.forEach((key) => {
                const obj = {
                    key,
                    value: emotion[key],
                };
                this.sortedEmotions.push(obj);
            });
        },
        loadList() {
            this.loading = true;
            getJokes(this.params)
                .then((res) => {
                    this.jokes = res.data.data.list;
                    this.total = res.data.data.total;
                })
                .catch((error) => {})
                .finally(() => {
                    this.loading = false;
                });
        },
        loadSingle() {
            this.loading = true;
            getJoke(this.id)
                .then((res) => {
                    this.joke = res.data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        init: function () {
            this.id ? this.loadSingle() : this.loadList();
        },
        goBack: function () {
            this.$router.push("/joke");
        },
        handleJokeUpdate: function () {
            this.loadList();
        },
        skipTop: function () {
            window.scrollTo(0, 0);
        },
        // 批量获取点赞
        loadLike: function () {
            let id = this.jokes.map((d) => "joke-" + d.ID);
            id = id.join(",");
            const params = {
                post_type: "joke",
                post_action: "likes",
                id: "joke-" + id,
            };
            getLikes(params).then((res) => {
                const likes = res.data.data;
                if (Object.keys(likes).length) {
                    this.jokes.forEach((d) => {
                        this.$set(d, "count", likes?.["joke-" + d.ID]?.likes);
                    });
                }
            });
        },
    },
    watch: {
        keys: {
            handler() {
                this.init();
            },
            deep: true,
            immediate: true,
        },
        jokes: {
            deep: true,
            handler() {
                this.loadLike();
            },
        },
    },
    created: function () {
        this.sortEmotion();
    },
};
</script>

<style lang="less">
@import "../assets/css/joke.less";
</style>
