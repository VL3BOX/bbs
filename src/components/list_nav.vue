<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>休闲玩法交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw"
                    >658035079</a
                ></strong
            >
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-bbs-nav">
            <a
                class="u-type"
                target="_blank"
            >
                <i class="el-icon-postcard"></i>
                <b>铭牌</b>
                <span class="u-desc">剑网3.com</span>
            </a>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <a
                class="u-type"
                href="/bbs"
                target="_blank"
                :class="{ on: subtype == '' }"
            >
                <i class="el-icon-receiving"></i>
                <b>论坛</b>
                <span class="u-desc">BBS</span>
            </a>
            <div class="u-sublist">
                <a
                    class="u-subtype"
                    v-for="(item, i) in menu"
                    :href="typeLink(item.slug)"
                    :key="i"
                    :class="{ on: item.slug == subtype }"
                    >&raquo; <b>{{ item.name }}</b></a
                >
            </div>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <a
                class="u-type"
                target="_blank"
            >
                <i class="el-icon-chat-line-round"></i>
                <b>骚话</b>
            </a>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <a
                class="u-type"
                target="_blank"
            >
                <i class="el-icon-picture-outline"></i>
                <b>表情</b>
            </a>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <a
                class="u-type"
                target="_blank"
            >
                <i class="el-icon-video-camera"></i>
                <b>直播</b>
            </a>
        </div>
        <div class="m-nav-group m-bbs-nav">
            <span
                class="u-type"
            >
                <i class="el-icon-receiving"></i>
                <b>休闲</b>
            </span>
            <div class="u-sublist">
                <a href="/share" class="u-subtype" target="_blank">&raquo; <b>捏脸分享</b></a>
                <a href="https://jx3.xoyo.com/zt/2020/09/24/blueprint/#/" class="u-subtype" target="_blank">&raquo; <b>家园蓝图</b></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
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
            ],
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype || "";
        },
    },
    methods: {
        typeLink: function(subtype) {
            return "./?subtype=" + subtype;
        },
    },
    mounted: function() {},
    components: {},
};
</script>
