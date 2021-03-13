<template>
    <div class="m-namespace-item">
        <h5 class="u-title">
            <a :href="namespace.link" target="_blank"
                ><i class="el-icon-postcard"></i
                >{{ namespace.key || "未知" }}</a
            >
        </h5>
        <p class="u-desc">{{ namespace.desc || namespace.key || "未知" }}</p>
        <div class="u-misc">
            <span class="u-author">
                <i class="el-icon-user"></i
                ><a :href="namespace.uid | authorLink" target="_blank">
                    {{ namespace.user.nickname || "匿名" }}</a
                >
            </span>
            <time class="u-time"
                ><i class="el-icon-date"></i>
                {{ namespace.created | dataFormat }}</time
            >
        </div>
    </div>
</template>

<script>
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import { showDate } from "@jx3box/jx3box-common/js/moment";
export default {
    name: "namespaceItem",
    props: ["data"],
    data: function() {
        return {};
    },
    computed: {
        namespace: function() {
            return this.data;
        },
    },
    filters: {
        authorLink,
        dataFormat: function(val) {
            return (val && showDate(~~val * 1000)) || "-";
        },
    },
    methods: {},
    mounted: function() {},
};
</script>
<style scoped lang="less">
// @import '../assets/css/var.less';
</style>
