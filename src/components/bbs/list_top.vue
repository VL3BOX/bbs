<template>
    <div class="m-bbs-top">
        <div class="m-bbs-top__header">

        </div>
        <div class="m-bbs-top__content">
            <div class="m-bbs-top__item" v-for="item in data" :key="item.id">
                <span class="u-type" :style="itemTypeStyle(item)">{{ itemType(item, 'label') }}</span>
                <a class="u-title" :class="{'is-bold': itemType(item, 'color')}" :href="postLink(item.ID)" target="_blank">{{ item.post_title }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import { getPosts } from "@/service/post";
import notice_types from "@/assets/data/notice_types.json";
export default {
    data() {
        return {
            data: []
        }
    },
    mounted() {
        this.getNotice();
    },
    methods: {
        getNotice() {
            const query = {
                per: 3,
                page: 1,
                sticky: 1,
                type: 'notice'
            }
            getPosts(query).then(res => {
                this.data = res.data.data.list;
            })
        },
        itemType({ post_subtype }, key) {
            return notice_types[post_subtype][key];
        },
        itemTypeStyle(item) {
            return {
                backgroundColor: this.itemType(item, 'color'),
            }
        },
        postLink(val) {
            return location.origin + `/notice/` + val;
        },
    }
}
</script>

<style lang="less">
@import "~@/assets/css/bbs/top.less";
</style>
