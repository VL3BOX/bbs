<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>休闲玩法交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw" v-else>658035079</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/namespace" :class="{ on: type == 'namespace' }">
                <i class="el-icon-postcard"></i>
                <b>铭牌</b>
                <span class="u-desc">剑网3.com</span>
            </router-link>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/joke" :class="{ on: type == 'joke' }">
                <i class="el-icon-chat-line-round"></i>
                <b>骚话</b>
            </router-link>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/emotion" :class="{ on: type == 'emotion' }">
                <i class="el-icon-picture-outline"></i>
                <b>表情</b>
            </router-link>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/forum" :class="{ on: type == 'forum' }">
                <i class="el-icon-receiving"></i>
                <b>论坛</b>
                <span class="u-desc">BBS</span>
            </router-link>
            <div class="u-sublist">
                <router-link
                    class="u-subtype"
                    v-for="(item, i) in menu"
                    :to="typeLink(item.slug)"
                    :key="i"
                    :class="{ on: item.slug == subtype }"
                >
                    <b>{{ item.name }}</b>
                </router-link>
            </div>
        </div>
        <!-- <div class="m-nav-group m-bbs-nav">
            <a
                class="u-type"
                href="/bbs#/live"
                :class="{ on: type == 'live' }"
            >
                <i class="el-icon-video-camera"></i>
                <b>直播</b>
            </a>
        </div>-->
        <!-- <div class="m-nav-group m-bbs-nav">
            <span class="u-type">
                <i class="el-icon-receiving"></i>
                <b>休闲</b>
            </span>
            <div class="u-sublist">
                <a href="/share" class="u-subtype" target="_blank"
                    ><b>捏脸分享</b></a
                >
                <a
                    href="https://jx3.xoyo.com/zt/2020/09/24/blueprint/#/"
                    class="u-subtype"
                    target="_blank"
                    ><b>家园蓝图</b></a
                >
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            menu: [
                {
                    slug: 1,
                    icon: "el-icon-collection",
                    name: "玩法心得",
                    desc: "Experience",
                },
                {
                    slug: 2,
                    icon: "el-icon-film",
                    name: "江湖回忆",
                    desc: "Memory",
                },
                {
                    slug: 3,
                    icon: "el-icon-video-camera",
                    name: "同人影音",
                    desc: "Media",
                },
                {
                    slug: 4,
                    icon: "el-icon-chat-line-round",
                    name: "交流讨论",
                    desc: "Discuz",
                },
                {
                    slug: 5,
                    icon: "el-icon-goblet-square-full",
                    name: "反馈建议",
                    desc: "Idea",
                },
                {
                    slug: 6,
                    icon: "el-icon-news",
                    name: "公告资讯",
                    desc: "Notice",
                },
            ],
        };
    },
    computed: {
        subtype: function () {
            // return this.$store.state.subtype || "";
            return this.$route.params.subtype || "";
        },
        type: function () {
            return this.$route.name;
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        typeLink: function (subtype) {
            return `/forum/${subtype}`;
        },
    },
    mounted: function () {},
    components: {},
};
</script>
<style lang="less">
@import "../assets/css/nav.less";
</style>