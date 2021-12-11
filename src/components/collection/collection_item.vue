<template>
    <div class="m-collection-item">
        <router-link
            class="u-image"
            :to="{ name: 'view', params: { collection_id: collection.id } }"
        >
            <img :src="collection.image | getCover" />
        </router-link>
        <div class="u-content">
            <router-link
                class="u-title"
                :to="{ name: 'view', params: { collection_id: collection.id } }"
            >
                <!-- <i class="el-icon-collection"></i> -->
                {{ collection.title }}</router-link
            >
            <div class="u-info">
                <a
                    :href="collection.user_id | author_url"
                    class="u-user"
                    target="_blank"
                >
                    <img
                        class="u-avatar"
                        :src="get_thumbnail(collection.user_avatar, 20, true)"
                    />
                    <span
                        class="u-nickname"
                        v-text="collection.user_nickname"
                    ></span>
                </a>
                <ul
                    class="u-tags"
                    v-if="collection.tags && collection.tags.length"
                >
                    <li
                        v-for="(tag, key) in collection.tags"
                        :key="key"
                        v-text="tag"
                        class="u-tag"
                    ></li>
                </ul>
            </div>
            <!-- <div
                class="u-excerpt"
                v-html="collection.excerpt"
                v-if="collection.excerpt"
            ></div> -->
            <div class="u-posts">
                <!-- <i class="el-icon-notebook-2"></i> -->
                <!-- <span class="u-posts-title">小册文章：</span> -->
                <el-row :gutter="20">
                    <el-col
                        :span="6"
                        v-for="(post, key) in collection.posts.slice(0, 8)"
                        :key="key"
                        ><a
                            class="u-post"
                            :href="
                                post.type === 'custom'
                                    ? post.url
                                    : get_link(post.type, post.id)
                            "
                            target="_blank"
                            ><i class="el-icon-notebook-2"></i
                            >{{ post.title }}</a
                        ></el-col
                    >
                </el-row>
            </div>
            <div class="u-meta">
                <span class="u-updated"
                    ><i class="el-icon-refresh"></i> 最后更新于{{
                        date_format(collection.updated)
                    }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
import date_format from "../filters/DateFormat";
import {
    getThumbnail,
    getLink,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "CollectionSingle",
    props: ["collection", "collectionId"],
    methods: {
        date_format,
        get_thumbnail: getThumbnail,
        get_link: getLink,
    },
    filters: {
        getCover: function(val) {
            return val
                ? resolveImagePath(val)
                : `${__imgPath}image/collection/default_cover.png`;
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/components/collection.less";
</style>
