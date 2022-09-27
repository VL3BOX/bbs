<template>
    <div class="m-info">
        <div class="m-info-router" v-if="isRouter">
            <a href="/bbs"><i class="el-icon-collection"></i></a>
            <a href="/joke"><i class="el-icon-cold-drink"></i></a>
            <a href="/emotion"><i class="el-icon-sugar"></i></a>
            <a href="/namespace"><i class="el-icon-postcard"></i></a>
            <a href="/collection"><i class="el-icon-paperclip"></i></a>
            <a href="/exam"><i class="el-icon-document"></i></a>
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
