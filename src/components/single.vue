<template>
    <singlebox :post="post" :author="author" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
// import { getStat, postStat } from "../service/stat.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat.js";
const types = {
    "1": "玩法心得",
    "2": "江湖回忆",
    "3": "同人影音",
    "4": "交流讨论",
    "5": "反馈建议",
    "6": "公告资讯",
};

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            author: {},
            stat: {},
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
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
                    this.post = this.$store.state.post = res.data.data.post;
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.$store.state.status = true;
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
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
