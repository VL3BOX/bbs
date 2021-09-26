<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>综合交流反馈群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=5umZoT3B" v-else>2471800</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <!-- <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/notice" :class="{ on: type == 'notice' }">
                <i class="el-icon-bell"></i>
                <b>公告</b>
            </router-link>
        </div> -->
        <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/namespace" :class="{ on: type == 'namespace' }">
                <i class="el-icon-postcard"></i>
                <b>铭牌</b>
                <span class="u-desc">剑网3.com</span>
            </router-link>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <router-link class="u-type" to="/joke" :class="{ on: type == 'joke' }">
                <i class="el-icon-cold-drink"></i>
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
            <router-link class="u-type" to="/forum" :class="{ on: type == 'forum' || type === 'feedback' }">
                <i class="el-icon-receiving"></i>
                <b>论坛</b>
                <!-- <span class="u-desc">BBS</span> -->
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
        </div> -->
        <router-link class="m-nav-feedback" to="/feedback">
            <img src="../assets/img/nav/hzn.png" alt="盒子娘">
            <b><i class="el-icon-message"></i> 反馈建议</b>
            <span>盒子娘的信箱 O(∩_∩)O </span>
        </router-link>
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
                // {
                //     slug: 5,
                //     icon: "el-icon-goblet-square-full",
                //     name: "反馈建议",
                //     desc: "Idea",
                // },
                /* {
                    slug: 6,
                    icon: "el-icon-news",
                    name: "公告资讯",
                    desc: "Notice",
                }, */
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