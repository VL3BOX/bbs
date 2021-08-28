<template>
    <singlebox :post="post" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
        <div class="u-collection">
            <div class="u-collection-title" @click="handleShow" :class="{ on: showCollection }">
                <span>该小册已关联</span>
                <a @click.stop href="">《{{ collapseTitle }}》</a>
            </div>
            <transition name="fade">
                <div v-if="showCollection">
                    <ul
                        v-if="collectionList && collectionList.length"
                        class="u-list u-collection-content"
                        :style="{ display: showCollection ? 'block' : 'none' }"
                    >
                        <li v-for="(item, i) in collectionList" :key="i">
                            <a v-if="item" :href="item | showLink" target="_blank">
                                <i class="el-icon-link"></i>
                                {{ item.title }}
                            </a>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
        <Thx class="m-thx" slot="single-append" :postId="id" postType="bbs" :userId="user_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "@/service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat.js";
import bus from "@/store/bus.js";
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
            this.showCollection = !this.showCollection
        }
    },
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
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
