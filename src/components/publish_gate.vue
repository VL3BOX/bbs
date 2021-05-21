<template>
    <a :href="publish_link" class="u-publish el-button el-button--primary el-button--medium">
        <i class="el-icon-edit-outline"></i>
        <span>发布</span>
    </a>
</template>

<script>
import { publishLink, getAppType } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "publishGate",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        channel: function () {
            let routename = this.$route.name
            if(routename == 'index' || routename == 'forum'){
                routename = 'bbs'
            }
            return routename;
        },
        publish_link: function () {
            return publishLink(this.channel)
        },
    },
    methods: {},
    mounted: function () {},
    components: {},
};
</script>
