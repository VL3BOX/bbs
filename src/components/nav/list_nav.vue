<template>
    <div class="m-list-nav">
        <!-- <RightSideMsg>
            <em>综合交流反馈群</em> :
            <strong @click="onQQClick" class="u-link" :title="$t('点击复制')">
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg> -->

        <!-- <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5> -->

        <!-- <div class="m-ladder-carousel">
            <el-carousel class="m-carousel" autoplay indicator-position="none">
                <el-carousel-item v-for="(item, index) in slideList" :key="index">
                    <a class="u-link" :href="item.link">
                        <el-image class="u-cover" :src="item.img" :alt="item.title" fit="contain" />
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div> -->
        <Banner class="m-ladder-carousel"></Banner>

        <div class="m-nav-app">
            <h5 class="u-title">茶馆矩阵</h5>
            <a href="/bbs" :class="{ 'is-active': routeActive('bbs') }">
                <i class="el-icon-cold-drink"></i>
                <span>茶馆</span>
                <em>BBS</em>
            </a>
            <a href="/joke" :class="{ 'is-active': routeActive('joke') }">
                <i class="el-icon-cherry"></i>
                <span>骚话</span>
                <em>Joke</em>
            </a>
            <a href="/emotion" :class="{ 'is-active': routeActive('emotion') }">
                <i class="el-icon-sugar"></i>
                <span>趣图</span>
                <em>Emotion</em>
            </a>
            <a href="/collection" :class="{ 'is-active': routeActive('collection') }">
                <i class="el-icon-paperclip"></i>
                <span>小册</span>
                <em>Collection</em>
            </a>
            <a href="/namespace" :class="{ 'is-active': routeActive('namespace') }">
                <i class="el-icon-postcard"></i>
                <span>铭牌</span>
                <em>Namespace</em>
            </a>
        </div>
    </div>
</template>

<script>
import { getMenus } from "@/service/helper.js";
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { getAppType, getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { getConfigBanner } from "@/service/cms";
import Banner from "@/components/bbs/banner.vue";
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            // menu: [
            //     // {
            //     //     slug: "index",
            //     //     icon: "el-icon-receiving",
            //     //     name: "全部",
            //     // },
            //     // {
            //     //     slug: "bbs",
            //     //     icon: "el-icon-collection",
            //     //     name: "剑三茶馆",
            //     //     routeName: "bbs",
            //     // },
            //     // {
            //     //     slug: "joke",
            //     //     icon: "el-icon-cold-drink",
            //     //     name: "剑三骚话",
            //     //     isActive: this.isActive,
            //     //     routeName: "joke",
            //     // },
            //     // {
            //     //     slug: "emotion",
            //     //     icon: "el-icon-sugar",
            //     //     name: "剑三趣图",
            //     //     isActive: this.isActive,
            //     //     routeName: "emotion",
            //     // },
            //     // {
            //     //     slug: "exam",
            //     //     icon: "el-icon-document",
            //     //     name: "剑三考试",
            //     //     isActive: this.isActivePage
            //     // },
            //     // {
            //     //     slug: "collection",
            //     //     icon: "el-icon-paperclip",
            //     //     name: "剑三小册",
            //     //     isActive: this.isActivePage,
            //     //     routeName: "collection"
            //     // },
            //     // {
            //     //     slug: "namespace",
            //     //     icon: "el-icon-postcard",
            //     //     name: "剑三铭牌",
            //     //     desc: "剑网3.com",
            //     //     isActive: this.isActive,
            //     //     routeName: "namespace",
            //     // },
            //     // {
            //     //     slug: "exam",
            //     //     icon: "el-icon-document",
            //     //     name: "剑三题库",
            //     // },
            // ],
            tags: [],
            feedback,
            qq: "2471800",
            slideList: [],
        };
    },
    computed: {
        root: function () {
            return location.hostname == "localhost" ? "" : "/bbs";
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        getAppIcon,
        isActive: function (slug) {
            return slug == this.$route.name;
        },
        isActivePage: function (slug) {
            return getAppType() && getAppType() == slug;
        },
        onQQClick() {
            navigator.clipboard.writeText(this.qq).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: "内容：" + this.qq,
                    type: "success",
                });
            });
        },
        loadTags() {
            getMenus("bbs_links").then((res) => {
                // console.log(res.data.data.menu_group.menus);
                this.tags = res.data.data?.menu_group?.menus || [];
            });
        },
        loadMenu() {
            getConfigBanner({ client: this.client, status: 1, per: 10, type: "bbs", subtype: "sidebar" }).then(
                (res) => {
                    this.slideList = res.data.data.list;
                }
            );
        },
        routeActive(app) {
            return this.$route.name.includes(app);
        },
    },
    mounted: function () {
        this.loadTags();
        // this.loadMenu();
    },
    components: { Banner },
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
