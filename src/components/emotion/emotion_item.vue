<template>
    <div class="m-emotion-item" :class="{single: mode === 'single'}">
        <!-- 单页项目 -->
        <template v-if="mode === 'single'">
            <img class="m-single-img" :src="emotion.url" alt @click="preview" />
            <div>{{ emotion.desc }}</div>
            <!--<a
                v-if="mode === 'single'"
                class="u-edit el-link el-link&#45;&#45;primary is-underline"
                :href="editLink('emotion', emotion.id)"
                target="_blank"
            >
                <i class="el-icon-edit-outline"></i>
            </a>-->
            <!-- <span
                    class="u-edit el-link el-link--primary is-underline"
                    @click="handleContent"
                    title="编辑"
            >{{ emotion.desc }}</span>-->
        </template>
        <!-- 列表页项目 -->
        <template v-else>
            <div class="u-emotion">
                <i class="u-img" @click="preview">
                    <img
                        class="u-pic u-emotion-pic waterfall-img"
                        :src="emotion.url | showThumbnail"
                        :alt="emotion.desc"
                    />
                </i>
            </div>
            <div class="u-meta">
                <i class="u-star" v-if="emotion.star">
                    <i class="el-icon-star-off"></i>精选
                </i>
                <i class="u-original" v-if="emotion.original">原创</i>
                <router-link
                    class="u-desc"
                    :to="{name:'emotion',params:{id:emotion.id}}"
                >{{emotion.desc | showListDesc}}</router-link>
            </div>
            <div class="u-user">
                <img class="u-user-avatar" :alt="user_name" :src="user_avatar | showAvatar" />
                <a
                    class="u-user-name"
                    :href="emotion.user_id | authorLink"
                    target="_blank"
                    v-if="emotion.user_id"
                >{{ user_name }}</a>
                <span class="u-user-name" v-else>{{ emotion.author}}</span>
                <time class="u-time">
                    <i class="el-icon-date"></i>
                    {{ emotion.updated_at | showTime}}
                </time>
            </div>
            <div class="u-op">
                <i class="u-op-hot" title="点赞" @click="addLike">♥</i>
                <i
                    @click="handleStar"
                    v-if="isEditor"
                    class="u-op-star"
                    :class="{on: isStar}"
                    :title="isStar ? '取消加精' : '设为精选'"
                >★</i>
            </div>
        </template>
    </div>
</template>

<script>
import {
    showAvatar,
    authorLink,
    editLink,
    getThumbnail,
} from "@jx3box/jx3box-common/js/utils";
import { getRelativeTime } from "@/utils/dateFormat.js";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import User from "@jx3box/jx3box-common/js/user";
import { starEmotion, unstarEmotion } from "@/service/emotion";
export default {
    props: ["mode", "emotion", "index"],
    name: "emotion_item",
    data() {
        return {
            isLike: false,
            isStar: this.emotion.star,
        };
    },
    computed: {
        user_avatar: function () {
            return this.emotion?.user_info?.user_avatar;
        },
        user_name: function () {
            return this.emotion?.user_info?.display_name || "匿名";
        },
        isEditor: function () {
            return User.isEditor();
        },
    },
    filters: {
        showAvatar: function (val) {
            return showAvatar(val, 24);
        },
        authorLink,
        showThumbnail: function (url) {
            return getThumbnail(url, "emotion_thumbnail");
        },
        showListDesc: function (str) {
            return str ? str.slice(0, 120) : "未命名";
        },
        showTime: function (gmt) {
            return getRelativeTime(new Date(gmt));
        },
    },
    methods: {
        editLink,
        preview() {
            if (this.mode === "single") {
                this.$hevueImgPreview({
                    url: this.emotion.url,
                    controlBar: false,
                    clickMaskCLose: true,
                });
            } else {
                this.$emit("preview", this.index);
            }
        },
        // 点赞
        addLike: function () {
            if (this.isLike) return;

            this.count++;
            if (!this.isLike) {
                postStat("emotion", this.emotion?.id, "likes");
            }
            this.isLike = true;
        },
        // 精选
        handleStar() {
            if (!this.isStar) {
                starEmotion(this.emotion.id).then(() => {
                    this.$notify({
                        title: "成功",
                        message: "加精成功",
                        type: "success",
                    });
                    this.isStar = true;
                    this.$forceUpdate();
                });
            } else {
                this.unStar();
            }
        },
        unStar: function () {
            unstarEmotion(this.emotion.id).then(() => {
                this.$notify({
                    title: "成功",
                    message: "取消加精成功",
                    type: "success",
                });
                this.isStar = false;
                this.$forceUpdate();
            });
        },
        handleContent: function () {
            this.$router.push(`/emotion/${this.emotion.id}`);
        },
    },
};
</script>

<style scoped>
</style>