<template>
    <div class="m-feedback-item">
        <template v-if="mode === 'single'">
            <div class="u-mode-single" v-loading="loading">
                <div class="u-feedback-misc">
                    <img
                        class="u-author-avatar"
                        :src="author.user_avatar | showAvatar"
                        :alt="author.display_name"
                    />
                    <a
                        class="u-author-name"
                        :href="post.post_author | authorLink"
                        target="_blank"
                    >{{ post.author || '匿名' }}</a>
                    <span class="u-feedback-date">
                        <time v-if="order == 'update'">{{post.post_modified | dateFormat}}</time>
                        <time v-else>{{post.post_date | dateFormat}}</time>
                    </span>
                </div>
                <div class="u-feedback-content">{{ post.post_content }}</div>
                <div class="u-single-imgs" v-if="images && images.length">
                    <img
                        v-for="(image, index) in images"
                        :key="image"
                        :src="image"
                        @click="handlePreview(index)"
                    />
                </div>

                <Thx
                    class="m-thx"
                    :postId="feedbackId"
                    postType="feedback"
                    :adminBoxcoinEnable="false"
                    :userBoxcoinEnable="true"
                />
                <div class="m-single-comment">
                    <el-divider content-position="left">评论</el-divider>
                    <Comment :id="feedbackId" category="post" v-if="feedbackId" />
                    <el-alert title="作者没有开启评论功能" type="warning" show-icon v-else></el-alert>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="u-mode-list">
                <div class="u-feedback-content">
                    <router-link tag="div" :to="data.ID | postLink">{{ data.post_excerpt }}</router-link>
                </div>
                <div class="u-feedback-misc">
                    <img
                        class="u-author-avatar"
                        :src="data.author_info.user_avatar | showAvatar"
                        :alt="data.author_info.display_name"
                    />
                    <a
                        class="u-author-name"
                        :href="data.post_author | authorLink"
                        target="_blank"
                    >{{ data.author_info.display_name }}</a>
                    <span class="u-feedback-date">
                        <time v-if="order == 'update'">{{data.post_modified | dateFormat}}</time>
                        <time v-else>{{data.post_date | dateFormat}}</time>
                    </span>
                    <span
                        class="like"
                        :class="{ disabled: !isLike ,on:!isLike}"
                        title="点赞"
                        @click="addLike"
                        v-if="isListPage"
                    >
                        <i class="like-icon">{{isLike ? '♡' : '♥'}}</i>
                        <span class="like-count" v-if="count">{{ count }}</span>
                    </span>
                </div>
                <i class="el-icon-close u-feedback-delete" @click.stop="delFeedback" v-show="isEditor" title="删除"></i>
            </div>
        </template>
    </div>
</template>

<script>
import { getRelativeTime } from "../utils/dateFormat";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { getAuthorInfo } from "@/service/cms";
import { getPost, removeFeedback } from "@/service/post.js";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "feedbackItem",
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        order: {
            type: String,
            default: "",
        },
        mode: {
            type: String,
            default: "list",
        },
        feedbackId: {
            type: [String, Number],
            defalut: 0,
        },
    },
    data() {
        return {
            isLike: true,
            count: 0,

            post: {},
            author: {},
            loading: false,
        };
    },
    computed: {
        images: function () {
            return this.post?.post_meta || [];
        },
        isListPage: function () {
            return this.mode != "single";
        },
        isEditor: function () {
            return User.isEditor();
        },
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val) {
                    this.count = val.count || 0;
                }
            },
        },
        feedbackId: {
            immediate: true,
            handler(val) {
                if (this.mode === "single") {
                    this.init()
                }
            },
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
            return "/feedback/" + val;
        },
    },
    methods: {
        handlePreview: function (i) {
            this.$hevueImgPreview({
                multiple: true, // 开启多图预览模式
                nowImgIndex: i, // 多图预览，默认展示第二张图片
                imgList: this.images, // 需要预览的多图数组
                controlBar: false,
                clickMaskCLose: true,
            });
        },
        // 点赞
        addLike: function () {
            if (!this.isLike) return;
            this.count++;
            if (this.isLike) {
                postStat("feedback", this.data?.ID, "likes");
            }
            this.isLike = false;
        },
        loadPost: function () {
            this.loading = true;
            getPost(this.feedbackId, this)
                .then((res) => {
                    this.post = res.data.data;

                    this.loadAuthor();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadAuthor: function (){
            getAuthorInfo(this.post?.post_author)
                .then(res => {
                    this.author = res.data.data;
                })
        },
        delFeedback: function (){
            this.$confirm("此操作将会删除该反馈，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                removeFeedback(this.data.ID)
                    .then(() => {
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                        });
                        this.$emit("update", this.data.ID);
                    })
                    .catch((err) => {
                        this.$notify({
                            title: "错误",
                            message:
                                err?.message ||
                                "删除失败，请重试或者联系管理员",
                            type: "error",
                        });
                    });
            })
        },
        init: function (){
            this.loadPost();
        }
    },
    components: {
        Comment,
    },
};
</script>

<style lang="less">
@import "../../assets/css/feedback_item.less";
</style>