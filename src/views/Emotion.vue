<template>
    <div class="v-emotion" v-loading="loading">
        <!--单页-->
        <div class="m-emotion-single-container" v-if="id">
            <div class="m-emotion-goback">
                <el-button class="u-back" size="mini" icon="el-icon-arrow-left" @click="goBack">返回列表</el-button>
            </div>
            <emotion-item :emotion="emotion" mode="single"></emotion-item>
            <Thx
                class="m-thx"
                :postId="id"
                postType="emotion"
                :userId="user_id"
                :adminBoxcoinEnable="false"
                :userBoxcoinEnable="true"
            />
            <div class="m-single-comment">
                <el-divider content-position="left">评论</el-divider>
                <Comment :id="id" category="emotion" />
            </div>
        </div>

        <!--列表-->
        <div class="m-emotion-list-container" v-else>
            <!-- 搜索 -->
            <div class="m-emotion-search" slot="search-before">
                <el-input placeholder="请输入搜索内容" v-model="search">
                    <span slot="prepend">关键词</span>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <ul class="m-emotion-list" v-if="list && list.length">
                <li class="u-item" v-for="(item, i) in list" :key="item.id">
                    <emotion-item :emotion="item" :index="i" @preview="handlePreview"></emotion-item>
                </li>
            </ul>
            <el-alert v-else title="没有找到相关条目" type="info" show-icon></el-alert>
            <el-button style="width: 100%;" type="primary" @click="loadMore" v-show="page < pages">加载更多</el-button>
            <!-- 分页 -->
            <el-pagination
                class="m-joke-pagination"
                background
                :page-size="per"
                :hide-on-single-page="true"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @current-change="skipTop"
            ></el-pagination>
            <!-- <el-alert title="即将登陆，敬请期待" type="warning" show-icon>
            </el-alert> -->
        </div>
    </div>
</template>

<script>
import {getEmotions,getEmotion} from '@/service/emotion';
import emotion_item from "@/components/emotion/emotion_item";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
    name: "Emotion",
    props: [],
    data: function () {
        return {
            search: '',
            list: [],
            loading: false,

            // pagination
            star: 0,
            per: 10,
            page: 1,
            pages: 1,
            total: 0,
            appendMode: false,

            emotion: ''
        };
    },
    computed: {
        params: function ({search, per, page}) {
            return {
                search,
                per,
                page,
            }
        },
        id: function () {
            return ~~this.$route.params.id;
        },
        images: function () {
            return this.list.map(item => item.url)
        },
        user_id: function () {
            return this.emotion?.user_id || 0;
        },
        keys: function () {
            return [
                this.search,
                this.page,
                this.per,
                this.id,
                this.star,
            ];
        },
    },
    methods: {
        goBack: function () {
            this.$router.push("/emotion");
        },
        loadList: function () {
            this.loading = true
            getEmotions(this.params).then(res => {
                if (this.appendMode) {
                    this.list = this.list.concat(res.data?.data?.list || [])
                } else {
                    this.list = res.data?.data?.list || []
                }
                this.total = res.data.data.total;
                this.pages = res.data.data.pages;
            }).finally(() => {
                this.loading = false
            })
        },
        loadSingle() {
            this.loading = true;
            getEmotion(this.id)
                .then((res) => {
                    this.emotion = res?.data?.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handlePreview: function (i) {
            this.$hevueImgPreview({
                multiple: true, // 开启多图预览模式
                nowImgIndex: i, // 多图预览，默认展示第二张图片
                imgList: this.images, // 需要预览的多图数组
                controlBar: false,
                clickMaskCLose: true,
            });
        },
        skipTop: function () {
            window.scrollTo(0, 0);
        },
        loadMore: function () {
            this.appendMode = true
            this.page++
        },
        init: function () {
            this.id ? this.loadSingle() : this.loadList();
        },
    },
    watch: {
        keys: {
            deep: true,
            handler: function () {
                this.init()
            }
        }
    },
    mounted: function () {
        this.init()
    },
    components: {
        'emotion-item': emotion_item,
        Comment
    },
};
</script>

<style lang="less">
@import '~@/assets/css/emotion.less';
</style>
