<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="公告资讯"
            slug="notice"
            root="/bbs/#notice"
            :publishEnable="false"
            :adminEnable="true"
            :feedbackEnable="true"
            :withoutLeft="true"
        >
            <img slot="logo" svg-inline src="./assets/img/notice.svg" />
        </Breadcrumb>
        <Main :withoutRight="true" :withoutLeft="true">
            <div class="m-notice-single">
                <header class="m-single-header">
                    <h1 class="m-single-title">{{ post.post_title }}</h1>

                    <div class="m-single-info">
                        <!-- <div class="u-author u-sub-block">
                            <a class="u-name" :href="author_link">{{ author_name }}</a>
                        </div>-->

                        <span class="u-modate u-sub-block" title="发布时间">
                            <i class="u-icon-modate el-icon-date"></i>
                            <time>发布时间：{{post.post_date | showDate }}</time>
                        </span>

                        <span class="u-views u-sub-block">
                            <i class="el-icon-view"></i>
                            {{ stat.views || '-' }}
                        </span>

                        <a class="u-edit u-sub-block" :href="edit_link" v-if="isAdmin">
                            <i class="u-icon-edit el-icon-edit-outline"></i>
                            <span>编辑</span>
                        </a>
                    </div>
                </header>

                <div class="m-single-post" v-if="post._check">
                    <div class="m-single-content">
                        <Article :content="content" />
                    </div>
                </div>
                <div class="m-single-null" v-else>
                    <el-alert :title="null_tip" type="warning" show-icon></el-alert>
                </div>

                <Thx
                    class="m-thx"
                    :postId="id"
                    postType="bbs"
                    :userId="user_id"
                    :adminBoxcoinEnable="false"
                    :userBoxcoinEnable="false"
                />

                <div class="m-single-comment">
                    <el-divider content-position="left">评论</el-divider>
                    <Comment :id="id" category="post" v-if="id && !post.comment" />
                    <el-alert title="作者没有开启评论功能" type="warning" show-icon v-else></el-alert>
                </div>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "@/service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat.js";
import { showDate } from "@jx3box/jx3box-common/js/moment";
import {editLink} from '@jx3box/jx3box-common/js/utils'
import User from '@jx3box/jx3box-common/js/user'
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import {__visibleMap} from '@jx3box/jx3box-common/data/jx3box.json'
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            loading: false,
            post: {},
            author: {},
            stat: {},
            isAdmin : User.isAdmin()
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        user_id: function () {
            return this.post?.post_author || 0;
        },
        edit_link: function () {
            return editLink(this.post?.post_type, this.post?.ID);
        },
        content : function (){
            return this.post?.post_content || ''
        },
        null_tip : function (){
            let str = '作者设置了【'
            str += __visibleMap[this.post.visible]
            str += '】'
            return str
        },
    },
    methods: {},
    components: {
        Article,
        Comment,
    },
    created: function () {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.user_id = this.post.post_author;
                    document.title = this.post.post_title;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat("bbs", this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat("bbs", this.id);
        }
    },
    filters: {
        showDate,
    },
};
</script>

<style lang="less">
@import "./assets/css/notice.less";
</style>
