<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>综合交流反馈群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <!-- <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a> -->
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg>

        <!-- <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5> -->
        <div class="m-nav-group m-bbs-nav">
            <router-link
                v-for="(item, i) in menu"
                :to="{ name: item.routeName }"
                :key="i"
                :class="{ on: item.isActive ? item.isActive(item.slug) : isActive(item.slug) }"
                class="u-item"
            >
                <i :class="item.icon"></i>
                <b>{{ item.name }}</b>
                <span>{{ item.desc }}</span>
            </router-link>
        </div>

        <div class="m-nav-tags" v-if="tags && tags.length">
            <h5 class="u-title"><i class="el-icon-collection-tag"></i> 热门搜索</h5>
            <div class="u-list">
                <a :href="item.link" target="_blank" v-for="(item, i) in tags" :key="i">{{ item.label }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import { getMenus } from "@/service/helper.js";
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { getAppType } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            menu: [
                // {
                //     slug: "index",
                //     icon: "el-icon-receiving",
                //     name: "全部",
                // },
                {
                    slug: "bbs",
                    icon: "el-icon-collection",
                    name: "剑三茶馆",
                    routeName: "bbs",
                },
                {
                    slug: "joke",
                    icon: "el-icon-cold-drink",
                    name: "剑三骚话",
                    isActive: this.isActive,
                    routeName: "joke",
                },
                {
                    slug: "emotion",
                    icon: "el-icon-sugar",
                    name: "剑三趣图",
                    isActive: this.isActive,
                    routeName: "emotion",
                },
                // {
                //     slug: "exam",
                //     icon: "el-icon-document",
                //     name: "剑三考试",
                //     isActive: this.isActivePage
                // },
                {
                    slug: "collection",
                    icon: "el-icon-paperclip",
                    name: "剑三小册",
                    isActive: this.isActivePage,
                    routeName: "collection"
                },
                {
                    slug: "namespace",
                    icon: "el-icon-postcard",
                    name: "剑三铭牌",
                    desc: "剑网3.com",
                    isActive: this.isActive,
                    routeName: "namespace",
                },
                // {
                //     slug: "exam",
                //     icon: "el-icon-document",
                //     name: "剑三题库",
                // },
            ],
            tags: [],
            feedback,
            qq: "2471800",
        };
    },
    computed: {
        root: function () {
            return location.hostname == "localhost" ? "" : "/bbs";
        },
    },
    methods: {
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
    },
    mounted: function () {
        this.loadTags();
    },
    components: {},
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
