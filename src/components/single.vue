<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
        <!-- TODO:测试 -->
        <Thx slot="single-append" :postId="id" postType="bbs" :userId="user_id" v-if="isSuperAdmin"/>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "@/service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat.js";
const types = {
    "1": "玩法心得",
    "2": "江湖回忆",
    "3": "同人影音",
    "4": "交流讨论",
    "5": "反馈建议",
    "6": "公告资讯",
};
import Thx from '@jx3box/jx3box-common-ui/src/Thx.vue'
import User from '@jx3box/jx3box-common/js/user'
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            author: {},
            stat: {},
            isSuperAdmin : User.isSuperAdmin()
        };
    },
    computed: {
        id: function() {
            return this.$store.state.id;
        },
        user_id : function (){
            return _.get(this.post, "post_author") || 0
        },
        post_subtype: function() {
            let subtype = _.get(this.post, "post_subtype");
            if (subtype) {
                return types[subtype];
            } else {
                return "";
            }
        },
    },
    methods: {},
    filters: {},
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.user_id = this.post.post_author;
                    document.title = this.post.post_title
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat('bbs',this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat('bbs',this.id);
        }
    },
    components: {
        singlebox,
        Thx
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
