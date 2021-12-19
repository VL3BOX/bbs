<template>
    <div class="v-emotion" v-loading="loading">
        <!--单页-->
        <div class="m-emotion-single-container" v-if="id">
            <div class="m-emotion-goback">
                <el-button
                    class="u-back"
                    size="mini"
                    icon="el-icon-arrow-left"
                    @click="goBack"
                    >返回列表</el-button
                >
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
                    <template slot="append">
                        <el-switch
                            class="u-star"
                            v-model="star"
                            :inactive-value="0"
                            :active-value="1"
                            inactive-text="只看精选"
                        ></el-switch>
                        <el-switch
                            class="u-original"
                            v-model="original"
                            :inactive-value="0"
                            :active-value="1"
                            inactive-text="只看原创"
                        ></el-switch>
                    </template>
                </el-input>
            </div>
            <!-- 门派分类 -->
            <div class="m-emotion-types">
                <el-tabs v-model="type">
                    <el-tab-pane name="all" label="全部">
                        <span slot="label">
                            <i
                                class="u-icon el-icon-menu"
                                style="vertical-align: 0"
                            ></i
                            >全部
                        </span>
                    </el-tab-pane>
                    <el-tab-pane
                        v-for="(item, i) in schoolmap"
                        :key="i"
                        :name="i"
                    >
                        <div slot="label" style="min-width: 57px">
                            <img
                                class="u-icon"
                                :src="i | showSchoolIcon"
                                :alt="item"
                            />
                            {{ item }}
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
                    :list="list"
                    imgKey="src"
                    ref="waterfall"
                    :col-width="waterfall_options.colWidth"
                    :col="waterfall_options.col"
                >
                    <div
                        class="u-item waterfall-item"
                        :class="{ fadeIn: item.state == 'show' }"
                        slot-scope="item"
                    >
                        <emotion-item
                            :emotion="item.data"
                            :index="item.index"
                            @preview="handlePreview"
                            :key="
                                'emotion-' + item.data.type + '-' + item.data.id
                            "
                        ></emotion-item>
                    </div>
                </waterfall>
            </ul>
            <!-- 空 -->
            <el-alert
                v-else
                title="没有找到相关条目"
                type="info"
                show-icon
            ></el-alert>
            <el-button
                style="width: 100%"
                type="primary"
                @click="loadMore"
                v-show="page < pages"
                icon="el-icon-arrow-down"
                :disabled="loading"
                >加载更多</el-button
            >
            <!-- 分页 -->
            <!-- <el-pagination
                class="m-emotion-pagination"
                background
                :page-size="per"
                :hide-on-single-page="true"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @current-change="skipTop"
            ></el-pagination>-->
        </div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";
import waterfall from "vue-waterfall-rapid";

// 模块
import emotion_item from "@/components/emotion/emotion_item";
import emotion_post from "@/components/emotion/emotion_post";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";

// 分类
import schoolmap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

// 数据
import { getEmotions, getEmotion } from "@/service/emotion";
import { getLikes } from "@/service/next";

export default {
    name: "Emotion",
    components: {
        "emotion-post": emotion_post,
        "emotion-item": emotion_item,
        Comment,
        waterfall,
    },
    data: function () {
        return {
            loading: false,

            // types
            schoolmap,

            // pagination
            type: "all",
            star: 0,
            original: 0,
            search: "",
            per: 50,
            page: 1,
            pages: 1,
            total: 0,
            emotions: [], //当前页面列表
            list: [], //合并列表
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
                col: 5,
            },
        };
    },
    computed: {
        id: function () {
            return ~~this.$route.params.id;
        },
        params: function ({ search, per, page, star, original }) {
            return {
                per,
                page,
                type: this.type == "all" ? "" : this.type,
                search,
                star,
                original,
            };
        },
        keys: function () {
            return [
                this.id,

                this.search,
                this.type,
                this.star,
                this.original,

                this.page,
                this.per,
            ];
        },
        reset_keys: function () {
            return [this.search, this.type, this.star, this.original];
        },
        user_id: function () {
            return this.emotion?.user_id || 0;
        },
        images: function () {
            return this.list.map((item) => resolveImagePath(item.url));
        },
        // new_pics: function () {
        //     return this.emotions.map((item) => {
        //         item.url;
        //     });
        // },
    },
    filters: {
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
        },
    },
    methods: {
        loadList: function () {
            this.loading = true;
            return getEmotions(this.params)
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

                    this.loadLike();
                })
                .then(() => {
                    this.loading = true;

                    // let result = this.$refs.waterfall.repaints()
                    if(this.$refs.waterfall) {      // Waterfall is sometimes undefined, why???
                        this.$refs.waterfall.onRender = (res) => {
                            this.loading = false;
                            console.log("waterfall渲染完毕", res);
                        };
                        this.$nextTick(() => {
                                this.$refs.waterfall.repaints(this.page * this.per, 1);
                        });
                    }
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

        // 杂项
        goBack: function () {
            this.$router.push("/emotion");
        },
        skipTop: function () {
            window.scrollTo(0, 0);
        },

        // 瀑布流
        calcCol: function () {
            let w = window.innerWidth;
            let col = 0;
            if (w < 780) {
                col = 2;
            } else if (w > 1024) {
                col = parseInt((window.innerWidth - 330) / 260); //扣除侧边栏
            } else {
                col = parseInt(window.innerWidth / 260); //平板竖屏
            }
            return col;
        },
        // 重新计算列数
        resizeCalc: function () {
            const vm = this;
            let repaint = debounce(function () {
                vm.waterfall_options.col = vm.calcCol();
            }, 200);
            window.addEventListener("resize", repaint);
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

        // 初始化
        init: function () {
            if (this.id) {
                this.loadSingle();
            } else {
                this.waterfall_options.col = this.calcCol();
                this.loadList();
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
        // 分页重置
        reset_keys: {
            deep: true,
            handler: function () {
                this.appendMode = false;
                this.page = 1;
            },
        },
        // 类别重置
        search: function () {
            this.appendMode = false;
            this.type = "all";
        },
        // emotions: {
        //     deep: true,
        //     handler() {
        //         this.loadLike();
        //     },
        // },
    },
    mounted: function () {
        this.init();
    },
    created: function () {
        this.resizeCalc();
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
