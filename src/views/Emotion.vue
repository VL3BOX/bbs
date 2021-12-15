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

            <ul class="m-emotion-list" id="m-emotion-waterfall">
                <!-- <waterfall
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
                            :key="'emotion-' + item.data.type + '-' + item.data.id "
                        ></emotion-item>
                    </div>
                </waterfall>-->
                <!-- <waterfall :col="waterfall2.col" :gutterWidth="20" :data="list">
                    <template>
                        <div class="u-item" v-for="(item, index) in list" :key="'emotion-' + item.type + '-' + item.id ">
                            <emotion-item
                                :emotion="item"
                                :index="index"
                                @preview="handlePreview"
                            ></emotion-item>
                        </div>
                    </template>
                </waterfall>-->
                <div
                    class="u-item u-emotion-waterfall-item"
                    v-for="(item, index) in list"
                    :key="'emotion-' + item.type + '-' + item.id "
                >
                    <emotion-item :emotion="item" :index="index" @preview="handlePreview"></emotion-item>
                </div>
            </ul>
            <!-- 空 -->
            <!-- <el-alert title="没有找到相关条目" type="info" show-icon></el-alert> -->
            <el-button
                style="width: 100%;"
                type="primary"
                @click="loadMore"
                v-show="page < pages"
                icon="el-icon-arrow-down"
                :disabled="loading"
            >加载更多</el-button>
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
// import waterfall from '@/utils/waterfall'
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

// 模块
import emotion_item from "@/components/emotion/emotion_item";
import emotion_post from "@/components/emotion/emotion_post";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

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
            waterfall_box: "#m-emotion-waterfall",
            waterfall_item: ".u-emotion-waterfall-item",
            waterfall_ins: null,
            waterfall_empty: true,
            // waterfall_options: {
            //     //是否根据容器尺寸自动计算重绘
            //     autoResize: true,
            //     //是否始终填满容器
            //     fillBox: false,
            //     //列宽-有指定列数则此属性失效
            //     colWidth: 260,
            //     //列数
            //     // col: 5,
            // },
            // waterfall2: {
            //     col: 2,
            // },
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
            return this.list.map((item) => item.url);
        },
        new_pics: function () {
            return this.emotions.map((item) => {
                item.url;
            });
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
                    // this.$refs.waterfall.onRender = (res) => {
                    //     this.loading = false
                    //     console.log("waterfall渲染完毕", res);
                    // };
                    // waterfall('.m-emotion-list');
                    // this.loadPictures().then((imgs) => {
                    //     this.repaintWaterfall();
                    //     this.loading = false;
                    // });

                    imagesLoaded(
                        document.querySelector(".u-emotion-pic"),
                        () => {
                            this.installWaterfall()
                            // this.waterfall_empty
                            //     ? this.installWaterfall()
                            //     : this.repaintWaterfall();
                        }
                    );
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

        // 列数
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
        // 监听图片加载
        // loadPictures: function () {
        // let mulitImg = this.new_pics;
        // let promiseAll = [], img = [], imgTotal = mulitImg.length;
        // for(let i = 0 ; i < imgTotal ; i++){
        //     promiseAll[i] = new Promise((resolve, reject)=>{
        //         img[i] = new Image()
        //         img[i].src = mulitImg[i]
        //         img[i].onload = function(){
        //             //第i张加载完成
        //             resolve(img[i])
        //         }
        //     })
        // }
        // return Promise.all(promiseAll)
        // },
        // 初始化瀑布流
        installWaterfall: function () {
            console.log('1')
            this.waterfall_ins = new Masonry(this.waterfall_box, {
                itemSelector: this.waterfall_item,
                columnWidth: 260,
                // gutter: 20,
                percentPosition: false, //使用百分比宽度的响应式布局
                horizontalOrder: true, //对项目进行布局以保持水平的从左到右的顺序,定义了此条件，照片一般会按照从左到右顺序排列，但也不是绝对的。
                originLeft: true, //设置布局方式为从左到右，此项是默认值，可以不填写，如果你设置值为false，则会从右到左排序
                originTop: true, //设置布局方式为从上到下，此项是默认值，可以不填写，如果你设置值为false，则会从下到上排序
                transitionDuration: "0.8s", //更改位置或外观时的过渡持续时间,默认是0.4s
                resize: true, //调整窗口大小时自动调整元素大小和位置，此项不推荐关闭
                initLayout: true, //默认为true，在初始化时候启用布局，如果设置为在初始化时禁用布局，可以在初始布局之前使用方法或添加事件，执行玩自定义方法后，在使用$grid.masonry()方法来初始化
            });
            this.waterfall_empty = false;
        },
        // 重绘瀑布流
        repaintWaterfall: function () {
            console.log('2')
            const ins = this.waterfall_ins;
            ins.reloadItems();
        },
        // 初始化
        init: function () {
            this.id ? this.loadSingle() : this.loadList();
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
                this.page = 1;
            },
        },
        // 类别重置
        search: function () {
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
        // this.waterfall2.col = this.calcCol();
        this.init();
    },
    created: function () {
        // const vm = this;
        // let repaint = debounce(function () {
        //     vm.waterfall2.col = vm.calcCol();
        // }, 200);
        // window.addEventListener("resize", repaint);
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
