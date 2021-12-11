<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <span class="u-item" href="/macro/#/">🌈 全新茶馆上线啦，新增若干子分类</span> -->
            <!-- <span class="u-item" href="/macro/#/">🌈 <span>即将上线</span> · 私人宏仓库</span> -->
            <!-- <span class="u-item" href="/macro/#/">✨ <span>即将上线</span> · 云端宏一键同步</span> -->
            <!-- <span class="u-item" href="/house/#/rank">⚽️ <span>即将上线</span> · 云端宏排行榜</span> -->
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-receiving"></i></router-link>
            <router-link to="/forum"><i class="el-icon-collection"></i></router-link>
            <router-link to="/joke"><i class="el-icon-cold-drink"></i></router-link>
            <router-link to="/emotion"><i class="el-icon-sugar"></i></router-link>
            <router-link to="/namespace"><i class="el-icon-postcard"></i></router-link>
            <router-link to="/collection"><i class="el-icon-paperclip"></i></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        subtype : function (){
            return this.$store.state.subtype
        },
        isIndex : function (){
            return !this.subtype
        }
    },
    methods: {
        isActive : function (subtype){
            return this.subtype == subtype
        }
    },
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
