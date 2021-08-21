<template>
    <div class="m-feedback-item">
        <template v-if="mode === 'single'">
            <div class="u-feedback-single" v-loading="loading">
                <div class="u-single-header">
                    <!-- <h2>反馈建议</h2> -->
                    <single-header :post="post">
                        <span>类型：反馈建议</span>
                    </single-header>
                </div>
                <div class="u-single-content">
                    {{ post.post_content }}
                </div>
                <div class="u-single-imgs">
                    <img v-for="(image, index) in images" :key="image" :src="image" @click="handlePreview(index)">
                </div>

                <Thx class="m-thx" :postId="feedbackId" postType="feedback" :adminBoxcoinEnable="false" :userBoxcoinEnable="true" />
                <div class="m-single-comment">
                    <el-divider content-position="left">评论</el-divider>
                    <Comment :id="feedbackId" category="post" v-if="feedbackId" />
                    <el-alert title="作者没有开启评论功能" type="warning" show-icon v-else></el-alert>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="u-feedback-content">
                <router-link tag="div" :to="data.ID | postLink">
                    {{ data.post_excerpt }}
                </router-link>
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
                <span class="like" :class="{ disabled: !isLike }" title="点赞" @click="addLike">
                    <img src="../assets/img/like.svg" class="like-icon" svg-inline>
                    <span class="like-count">{{ count }}</span>
                </span>
            </div>
        </template>
    </div>
</template>

<script>
import { getRelativeTime } from "../utils/dateFormat";
import {
    showAvatar,
    authorLink,
} from "@jx3box/jx3box-common/js/utils";
import { postStat, getStat } from "@jx3box/jx3box-common/js/stat";
import { getPost } from "@/service/post.js";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import singleHeader from "@jx3box/jx3box-page/src/components/single-header.vue";
export default {
    name: 'feedbackItem',
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        order: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: 'list'
        },
        feedbackId: {
            type: [String, Number],
            defalut: 0
        }
    },
    data() {
        return  {
            isLike: true,
            count: 0,

            post: {},
            loading: false
        }
    },
    computed: {
        images: function (){
            return this.post?.post_meta || []
        }
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val) {
                    this.count = val.count || 0
                }
            }
        },
        feedbackId: {
            immediate: true,
            handler(val) {
                if (this.mode === 'single') {
                    this.loadPost()
                }
            }
        }
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
        postLink: function(val) {
            return location.origin + '/' + 'feedback' + '/' + val;
        },
    },
    methods: {
        handlePreview: function (i) {
            this.$hevueImgPreview({
                multiple: true, // 开启多图预览模式
                nowImgIndex: i, // 多图预览，默认展示第二张图片
                imgList: this.images, // 需要预览的多图数组
                controlBar: false,
                clickMaskCLose: true
            })
        },
        // 点赞
        addLike: function () {
            if (!this.isLike) return
            this.count++;
            if (this.isLike) {
                postStat('feedback', this.data?.ID, "likes");
            }
            this.isLike = false;
        },
        loadPost: function (){
            this.loading = true
            getPost(this.feedbackId, this)
                .then(res => {
                    this.post = res.data.data
                })
                .finally(() => {
                    this.loading = false
                })
        }
    },
    components: {
        Comment,
        singleHeader
    }
}
</script>

<style lang="less">
@import "../assets/css/feedback_item.less";
</style>