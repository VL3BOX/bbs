<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
        <!-- 文集+联合创作者 -->
        <Creators class="m-creators" :postId="id" :postType="post.post_type"/>
        <Collection class="m-collection" :id="post.post_collection" :defaultVisible="post.collection_collapse"/>
        <!-- 打赏 -->
        <Thx class="m-thx" slot="single-append" :postId="id" postType="bbs" :userId="user_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>
    </singlebox>
</template>

<script>
import Collection from '@jx3box/jx3box-common-ui/src/single/Collection.vue'
import Creators from '@jx3box/jx3box-common-ui/src/single/Creators.vue'
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "@/service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat.js";
import { getLink } from "@jx3box/jx3box-common/js/utils.js"
const types = {
    "1": "玩法心得",
    "2": "江湖回忆",
    "3": "同人影音",
    "4": "交流讨论",
};
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
            isSuperAdmin : User.isSuperAdmin(),

            showCollection: false
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
        collectionInfo: function (){
            return this.$store.state.collectionInfo;
        },
        collapseTitle: function (){
            return this.collectionInfo?.title
        },
        collectionList: function (){
            return this.collectionInfo?.posts
        }
    },
    methods: {
        handleShow: function (){
            this.showCollection = !this.showCollection;
        },
    },
    filters: {
        getLink: function (id){
            return getLink('collection', id);
        },
        showLink: function (item) {
            if (item.type == "custom") {
                return item.url;
            } else {
                return getLink(item.type, item.id);
            }
        },
    },
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
        Collection,
        Creators
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
