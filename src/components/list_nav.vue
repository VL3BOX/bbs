<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>综合交流反馈群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=5umZoT3B" v-else>2471800</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5>
        <div class="m-nav-group m-tool-nav">
            <router-link
                v-for="(item,i) in menu"
                :to="'/' + item.slug"
                :key="i"
            >
                <i :class="item.icon"></i>
                <b>{{item.name}}</b>
                <span>{{item.desc}}</span>
            </router-link>
        </div>

        <div class="m-nav-tags">
            <h5 class="u-title"><i class="el-icon-collection-tag"></i> 热门搜索</h5>
            <div class="u-list">
                <a :href="item.link" target="_blank" v-for="(item,i) in tags" :key="i">{{item.label}}</a>
            </div>
        </div>

        <router-link class="m-nav-feedback" to="/feedback">
            <img src="../assets/img/nav/hzn.png" alt="盒子娘">
            <b><i class="el-icon-message"></i> 反馈建议</b>
            <span>盒子娘的信箱 O(∩_∩)O </span>
        </router-link>
    </div>
</template>

<script>
import {getMenu} from '@/service/cms.js'
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            menu: [
                {
                    slug: '',
                    icon: "el-icon-receiving",
                    name: "全部",
                },
                {
                    slug: 'forum',
                    icon: "el-icon-discover",
                    name: "茶馆交流",
                },
                {
                    slug: 'joke',
                    icon: "el-icon-cold-drink",
                    name: "剑三骚话",
                },
                {
                    slug: 'emotion',
                    icon: "el-icon-sugar",
                    name: "剑三表情",
                },
                {
                    slug: 'namespace',
                    icon: "el-icon-postcard",
                    name: "剑三铭牌",
                    desc: "剑网3.com",
                },
            ],
            tags : []
        };
    },
    computed: {
        type: function () {
            return this.$route.name;
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        loadTags : function (){
            getMenu('bbs').then((res) => {
                this.tags = res.data?.data?.val || []
            })
        }
    },
    mounted: function () {},
    components: {},
};
</script>
<style lang="less">
@import "../assets/css/nav.less";
</style>