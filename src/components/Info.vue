<template>
    <div class="m-info">
        <div class="m-info-router" v-if="isRouter">
            <!-- <router-link to="/"><i class="el-icon-receiving"></i></router-link> -->
            <router-link to="/forum"><i class="el-icon-collection"></i></router-link>
            <router-link to="/joke"><i class="el-icon-cold-drink"></i></router-link>
            <router-link to="/emotion"><i class="el-icon-sugar"></i></router-link>
            <router-link to="/namespace"><i class="el-icon-postcard"></i></router-link>
            <router-link to="/collection"><i class="el-icon-paperclip"></i></router-link>
            <!-- <a href="/exam"><i class="el-icon-document"></i></a> -->
        </div>
    </div>
</template>

<script>
import {getAppType} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed : {
        isRouter : function (){
            return getAppType() != 'exam'
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/info.less";
</style>
