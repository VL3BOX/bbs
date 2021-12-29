<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>综合交流反馈群</em> :
            <strong>
                <!-- <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a> -->
                <a href="https://jq.qq.com/?_wv=1027&k=5umZoT3B">2471800</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5>
        <div class="m-nav-group m-bbs-nav">
            <a v-for="(item, i) in menu" :href="root + '/#/' + item.slug" :key="i" :class="{ on: isActive(item.slug) }">
                <i :class="item.icon"></i>
                <b>{{ item.name }}</b>
                <span>{{ item.desc }}</span>
            </a>
            <a href="/exam" :class="{ on: isActivePage('exam') }">
                <i class="el-icon-document"></i>
                <b>剑三考试</b>
                <span>exam</span>
            </a>
        </div>

        <!-- <div class="m-nav-tags">
            <h5 class="u-title"><i class="el-icon-collection-tag"></i> 热门搜索</h5>
            <div class="u-list">
                <a :href="item.link" :target="item.meta_3" v-for="(item,i) in tags" :key="i" v-show="item.status">{{item.label}}</a>
            </div>
        </div> -->

        <!-- <router-link class="m-nav-feedback" to="/feedback">
            <img src="../assets/img/nav/hzn.png" alt="盒子娘">
            <b><i class="el-icon-message"></i> 反馈建议</b>
            <span>盒子娘的信箱 O(∩_∩)O </span>
        </router-link> -->
        <a class="m-nav-feedback" :href="feedback" target="_blank">
            <img src="../../assets/img/nav/hzn.png" alt="盒子娘" />
            <b><i class="el-icon-message"></i> 反馈建议</b>
            <span>admin@jx3box.com</span>
        </a>
    </div>
</template>

<script>
// import {getMenu} from '@/service/cms.js'
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { getAppType } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            menu: [
                {
                    slug: "index",
                    icon: "el-icon-receiving",
                    name: "全部",
                },
                {
                    slug: "forum",
                    icon: "el-icon-collection",
                    name: "剑三茶馆",
                },
                {
                    slug: "joke",
                    icon: "el-icon-cold-drink",
                    name: "剑三骚话",
                },
                {
                    slug: "emotion",
                    icon: "el-icon-sugar",
                    name: "剑三表情",
                },
                {
                    slug: "namespace",
                    icon: "el-icon-postcard",
                    name: "剑三铭牌",
                    desc: "剑网3.com",
                },
                {
                    slug: "collection",
                    icon: "el-icon-paperclip",
                    name: "剑三小册",
                },
                // {
                //     slug: "exam",
                //     icon: "el-icon-document",
                //     name: "剑三题库",
                // },
            ],
            tags: [],
            feedback,
        };
    },
    computed : {
        root : function (){
            return location.hostname == 'localhost' ? '' : '/bbs'  
        },
    },
    methods: {
        // loadTags : function (){
        //     getMenu('bbs').then((res) => {
        //         this.tags = res.data?.data?.val || []
        //     })
        // }
        isActive: function(slug) {
            return slug == this.$route.name;
        },
        isActivePage : function (slug){
            return getAppType() && getAppType() == slug
        }
    },
    mounted: function() {
        // this.loadTags()
    },
    components: {},
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
