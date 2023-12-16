<template>
    <a class="m-collection-item_v2" :href="`/collection/${data.id}`" target="_blank">
        <img class="u-image" :src="getCover(data.image)" />

        <div class="u-content">
            <div class="u-title" :title="data.title">{{ data.title }}</div>
            <div class="u-info" v-if="data.collection_user_info">
                <a :href="authorLink(data.user_id)" class="u-user" target="_blank">
                    <img class="u-avatar" :src="showAvatar(data.collection_user_info.user_avatar)" />
                    <span class="u-nickname" v-text="data.collection_user_info.display_name"></span>
                </a>
            </div>
        </div>
    </a>
</template>

<script>
import { showAvatar, getLink, resolveImagePath, authorLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "CollectionItemV2",
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        getCover: function (val) {
            return val ? resolveImagePath(val) : `${__imgPath}image/collection/default_cover.png`;
        },
        authorLink,
        showAvatar: function (url) {
            return showAvatar(url);
        },
    }
}
</script>

<style lang="less">
.m-collection-item_v2 {
    .mb(20px);
    width: 178px;

    .u-image {
        .w(100%);
        height: 226px;
        object-fit: cover;
        border-radius: 4px;
    }

    .u-title {
        max-width: 100%;
        .nobreak;
        .fz(13px,1.8);
        color:#888;
        font-style: italic;
    }

    .u-info{
        .mt(2px);
        .clearfix;
    }

    .u-user{
        .fl;
        .fz(12px);
        .mr(10px);
        color:#666;
        &:hover .u-nickname{
            color:@color-link;
            .underline(@color-link);
        }
    }
    .u-avatar{
        .y(-5px);
        .mr(5px);
        .size(20px);
        .r(100%);
    }
}
</style>
