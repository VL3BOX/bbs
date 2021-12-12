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
                :adminBoxcoinEnable="true"
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
                    <el-switch
                        slot="append"
                        v-model="star"
                        :inactive-value="0"
                        :active-value="1"
                        inactive-text="只看精选"
                    ></el-switch>
                </el-input>
            </div>
            <!-- 门派分类 -->
            <div class="m-emotion-types">
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

            <!--快速发布-->
            <emotion-post></emotion-post>

            <ul class="m-emotion-list" v-if="list && list.length">
                <waterfall
                    :autoResize="waterfall_options.autoResize"
                    :moveTransitionDuration="0.4"
                    :fillBox="waterfall_options.fillBox"
                    :col-width="waterfall_options.colWidth"
                    :list="list"
                    imgKey="src"
                    ref="waterfall"
                >
                    <div
                        class="u-item waterfall-item"
                        :class="{fadeIn:item.state == 'show'}"
                        slot-scope="item"
                    >
                        <emotion-item
                            :emotion="item.data"
                            :index="item.index"
                            @preview="handlePreview"
                        ></emotion-item>
                    </div>
                </waterfall>
            </ul>
            <!-- 空 -->
            <el-alert v-else title="没有找到相关条目" type="info" show-icon></el-alert>
            <el-button
                style="width: 100%;"
                type="primary"
                @click="loadMore"
                v-show="page < pages"
            >加载更多</el-button>
            <!-- 分页 -->
            <el-pagination
                class="m-emotion-pagination"
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
// 模块
import emotion_item from "@/components/emotion/emotion_item";
import emotion_post from "@/components/emotion/emotion_post";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import waterfall from "vue-waterfall-rapid";

// 分类
import schoolmap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

// 数据
import { getEmotions, getEmotion } from "@/service/emotion";
import { getLikes } from "@/service/next";

export default {
    name: "Emotion",
    components: {
        'emotion-post': emotion_post,
        "emotion-item": emotion_item,
        Comment,
        waterfall,
    },
    data: function () {
        return {
            loading: false,
            schoolmap,

            // pagination
            type: 'all',
            star: 0,
            search: "",
            per: 24,
            page: 1,
            pages: 1,
            total: 0,
            emotions: [], //当前页面列表
            list: [
                // {
                //     id: 1,
                //     user_id: 8719,
                //     desc: "花间 流离循环一图流.jpg",
                //     url:
                //         "https://oss.jx3box.com/upload/post/2021/12/11/8719_224036.jpg",
                //     status: 1,
                //     star: 0,
                //     original: 1,
                //     author: "",
                //     created_at: "2021-12-10T16:01:31.000Z",
                //     updated_at: "2021-12-12T11:55:31.000Z",
                //     deleted_at: null,
                //     user_info: {
                //         display_name: "醉栩",
                //         user_avatar:
                //             "https://oss.jx3box.com/upload/avatar/2021/4/9/1172849.jpg",
                //     },
                // },
                // {
                //     id: 2,
                //     user_id: 8,
                //     desc: "平胸奶花",
                //     url:
                //         "https://oss.jx3box.com/upload/post/2021/12/11/8_9134220.jpg",
                //     status: 1,
                //     star: 1,
                //     original: 0,
                //     author: "",
                //     created_at: "2021-12-11T05:13:55.000Z",
                //     updated_at: "2021-12-12T07:58:07.000Z",
                //     deleted_at: null,
                //     user_info: {
                //         display_name: "浮烟",
                //         user_avatar: "https://oss.jx3box.com/2019/09/logo.png",
                //     },
                // },
                // {
                //     id: 3,
                //     user_id: 8,
                //     desc: "雷域大泽外卖",
                //     url:
                //         "https://oss.jx3box.com/upload/post/2021/12/11/8_6141742.jpg",
                //     status: 1,
                //     star: 1,
                //     original: 0,
                //     author: "",
                //     created_at: "2021-12-11T05:13:55.000Z",
                //     updated_at: "2021-12-12T07:56:23.000Z",
                //     deleted_at: null,
                //     user_info: {
                //         display_name: "浮烟",
                //         user_avatar: "https://oss.jx3box.com/2019/09/logo.png",
                //     },
                // },
            ], //合并列表
            appendMode: false,

            emotion: "",

            // 瀑布流
            waterfall_options: {
                //是否根据容器尺寸自动计算重绘
                autoResize: true,
                //是否始终填满容器
                fillBox: false,
                //列宽-有指定列数则此属性失效
                colWidth: 260,
                //列数
                // col: 5,
            },
        };
    },
    computed: {
        id: function () {
            return ~~this.$route.params.id;
        },
        params: function ({ search, per, page, star }) {
            return {
                per,
                page,
                type: this.type == "all" ? "" : this.type,
                search,
                star,
            };
        },
        keys: function () {
            return [
                this.search,
                this.page,
                this.per,
                this.type,
                this.id,
                this.star,
                this.type
            ];
        },
        user_id: function () {
            return this.emotion?.user_id || 0;
        },
        images: function () {
            return this.list.map((item) => item.url);
        },
    },
    filters: {
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
        },
    },
    methods: {
        loadList: function () {
            this.loading = true;
            getEmotions(this.params)
                .then((res) => {
                    if (this.appendMode) {
                        this.list = this.list.concat(
                            res.data?.data?.list || []
                        );
                        this.emotions = res.data?.data?.list || [];
                    } else {
                        this.list = this.emotions = res.data?.data?.list || [];
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;

                    this.loadLike()
                })
                .then(() => {
                    let result = this.$refs.waterfall.repaints()
                    // this.$refs.waterfall.onRender = (res) => {
                    //     console.log("渲染完毕", res);
                    // };
                })
                .finally(() => {
                    this.loading = false;
                });
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
        loadMore: function () {
            this.appendMode = true;
            this.page++;
        },
        init: function () {
            this.id ? this.loadSingle() : this.loadList();
        },

        // 图片预览
        handlePreview: function (i) {
            this.$hevueImgPreview({
                multiple: true, // 开启多图预览模式
                nowImgIndex: i, // 多图预览，默认展示第二张图片
                imgList: this.images, // 需要预览的多图数组
                controlBar: false,
                clickMaskCLose: true,
            });
        },

        // 杂项
        goBack: function () {
            this.$router.push("/emotion");
        },
        skipTop: function () {
            window.scrollTo(0, 0);
        },

        // 批量获取点赞
        loadLike: function () {
            if (this.emotions && this.emotions.length) {
                let id = this.emotions.map((d) => "emotion-" + d.id);
                id = id.join(",");
                const params = {
                    post_type: "emotion",
                    post_action: "likes",
                    id: id,
                };
                getLikes(params).then((res) => {
                    const likes = res.data.data;
                    if (Object.keys(likes).length) {
                        this.emotions.forEach((d) => {
                            this.$set(
                                d,
                                "count",
                                likes?.["emotion-" + d.id]?.likes
                            );
                        });
                    }
                });
            }
        },
    },
    watch: {
        keys: {
            deep: true,
            handler: function () {
                this.init();
            },
        },
        // emotions: {
        //     deep: true,
        //     handler() {
        //         this.loadLike();
        //     },
        // },
    },
    mounted: function () {
        this.init()
    },
    filters: {
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/emotion.less";
</style>
