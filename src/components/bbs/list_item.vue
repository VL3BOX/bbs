<template>
    <li class="u-item">
        <!-- Banner -->
        <a class="u-banner" :href="item.ID | postLink" :target="target" v-reporter="{
                data: {
                    href: reporterLink(item.ID),
                },
                caller,
            }"><img :src="getBanner(item.post_banner, item.post_subtype)" :key="item.ID"/></a>

        <!-- 标题 -->
        <h2 class="u-post" :class="{ isSticky: item.sticky }">
            <!-- 图标 -->
            <img class="u-icon" svg-inline src="../../assets/img/list/post.svg" />

            <!-- 资料片 -->
            <span class="u-label u-zlp" v-if="item.post_subtype">{{ showSubtype(item.post_subtype) }}</span>

            <!-- 标题文字 -->
            <a class="u-title" :style="item.color | showHighlight" :href="item.ID | postLink" :target="target" v-reporter="{
                data: {
                    href: reporterLink(item.ID),
                },
                caller,
            }">{{ item.post_title || "无标题" }}</a>

            <!-- 角标 -->
            <span class="u-marks" v-if="item.mark && item.mark.length">
                <i v-for="mark in item.mark" class="u-mark" :key="mark">{{ mark | showMark }}</i>
            </span>
        </h2>

        <!-- 字段 -->
        <!-- <div class="u-content u-desc">
            {{ item.post_excerpt || item.post_title || "这个作者很懒,什么都没有留下" }}
        </div> -->
        <!-- 字段 -->
        <div class="u-content u-desc">
            <!-- {{ item.post_excerpt || item.post_title || "这个作者很懒,什么都没有留下" }} -->
            <div class="u-metalist u-collection">
                <strong>小册</strong>
                <em>
                    <template v-if="~~item.post_collection">
                        <a :href="`/collection/${item.post_collection}`" target="_blank"
                            >《{{ item.collection_info && item.collection_info.title }}》</a
                        >
                    </template>
                    <template v-else>-</template>
                </em>
            </div>
            <div class="u-metalist u-topics">
                <strong>主题</strong>
                <em>
                    <template v-if="item.topics && item.topics.length">
                        <a class="u-topic" :href="`/bbs?tag=${topic}`" v-for="topic in item.topics" :key="topic">{{
                            topic
                        }}</a>
                    </template>
                    <template v-else>-</template>
                </em>
            </div>
        </div>

        <!-- 作者 -->
        <div class="u-misc">
            <img class="u-author-avatar" :src="item.author_info | showAvatar" :alt="item.author_info | showNickname" />
            <a class="u-author-name" :href="item.post_author | authorLink" target="_blank">{{ item.author_info | showNickname }}</a>
            <span class="u-date">
                Updated on
                <time v-if="order == 'update'">{{ item.post_modified | dateFormat }}</time>
                <time v-else>{{ item.post_date | dateFormat }}</time>
            </span>
        </div>
    </li>
</template>

<script>
import { appKey } from "@/../setting.json";
import { showAvatar, authorLink, showBanner, buildTarget } from "@jx3box/jx3box-common/js/utils";
import { __ossMirror, __imgPath, __cdn } from "@jx3box/jx3box-common/data/jx3box";
import { cms as mark_map } from "@jx3box/jx3box-common/data/mark.json";
import {showDate} from '@jx3box/jx3box-common/js/moment.js'
import _bbsSubtypes from "@/assets/data/bbs_subtypes.json";
import { random} from "lodash"
export default {
    name: "ListItem",
    props: ['item','order', 'caller'],
    components: {},
    data: function() {
        return {
            target : buildTarget(),

            start: 1,
            end: 39,
        };
    },
    computed: {
        client() {
            return this.item?.client;
        },
    },
    watch: {},
    methods: {
        getBanner: function(val, subtype) {
            if (val) {
                return showBanner(val);
            } else {
                // 从1-39中随机选一个
                const randomNum = random(this.start, this.end)
                // return __imgPath + `image/banner/${appKey}${subtype}` + ".png";
                return __cdn + `design/random_cover/${randomNum}.jpg`
            }
        },
        reporterLink: function (val) {
            const prefix = this.client === 'std' ? 'www' : 'origin'
            return`${prefix}:/${appKey}/` + val;
        },
        showSubtype: function (val){
            return _bbsSubtypes[val]?.label || ""
        }
    },
    filters: {
        authorLink,
        postLink: function(val) {
            return location.origin + `/${appKey}/` + val;
        },
        showHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val] || val;
        },
        showAvatar: function(userinfo) {
            return showAvatar(userinfo?.user_avatar);
        },
        showNickname : function (userinfo){
            return userinfo?.display_name || '匿名'
        },
        dateFormat : function (gmt){
            return showDate(new Date(gmt))
        },

    },
    created: function() {},
    mounted: function() {},
};
</script>
