<template>
    <div class="m-emotion-item" :class="mode == 'single' ? 'single' : 'list' ">
        <div class="u-emotion">
            <i class="u-img" @click="preview">
                <img
                    class="u-pic u-emotion-pic waterfall-img"
                    :src="showEmotion(emotion.url)"
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
                v-if="mode != 'single'"
                class="u-desc"
                :to="{ name: 'emotion', params: { id: emotion.id } }"
            >
                <i class="el-icon-link"></i>
                {{ emotion.desc | showListDesc }}
            </router-link>
            <span class="u-desc" v-else>{{ emotion.desc }}</span>
        </div>
        <div class="u-user">
            <img class="u-user-avatar" :src="user_avatar | showAvatar" />
            <a
                class="u-user-name"
                :href="emotion.user_id | authorLink"
                target="_blank"
                v-if="emotion.user_id"
            >{{ emotion | showUserName }}</a>
            <span class="u-user-name" v-else>
                {{
                emotion.author || "匿名"
                }}
            </span>
            <time class="u-time">{{ emotion.updated_at | showTime }}</time>
            <a class="u-like" :class="{ on: isLike }" title="赞" @click="addLike" v-if="isListPage">
                <i class="like-icon">{{ isLike ? "♥" : "♡" }}</i>
                <span class="like-text">Like</span>
                <span class="like-count" v-if="count">{{ count }}</span>
            </a>
        </div>
        <div class="u-op u-editor" v-if="isEditor">
            <span class="el-link el-link--primary is-underline" @click="handleStar">
                <i :class="isStar ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
                {{ isStar ? "取消精选" : "设为精选" }}
            </span>
            <span class="el-link el-link--primary is-underline u-delete" @click="handleDelete">
                <i class="el-icon-delete"></i> 删除
            </span>
            <a class="el-link el-link--primary is-underline" :href="editLink('emotion',emotion.id)">
                <i class="el-icon-edit-outline"></i> 编辑
            </a>
        </div>
        <div class="u-op" v-if="mode == 'single' && isAuthor && !isEditor">
            <a class="el-link el-link--primary is-underline" :href="editLink('emotion',emotion.id)">
                <i class="el-icon-edit-outline"></i> 编辑
            </a>
        </div>

        <!-- <div class="u-extend" v-if="mode == 'single'">
            <el-radio-group v-model="ext" size="small" v-if="types.length">
                <el-radio-button
                    :label="item"
                    v-for="item in types"
                    :key="item"
                >{{item.toUpperCase()}}</el-radio-button>
            </el-radio-group>
            <div class="u-tip"></div>
        </div>-->
    </div>
</template>

<script>
import {
    showAvatar,
    authorLink,
    editLink,
    getThumbnail,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
import { getRelativeTime } from "@/utils/dateFormat.js";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import User from "@jx3box/jx3box-common/js/user";
import { starEmotion, unstarEmotion, removeEmotion } from "@/service/emotion";
export default {
    props: ["mode", "emotion", "index"],
    name: "emotion_item",
    data() {
        return {
            count: 0,
            isLike: false,
            isStar: this.emotion.star,

            ext: "gif",
            types: [],
        };
    },
    computed: {
        user_avatar: function () {
            return this.emotion?.user_info?.user_avatar;
        },
        isEditor: function () {
            return User.isEditor();
        },
        isListPage: function () {
            return this.mode != "single";
        },
        isAuthor : function (){
            return this.emotion.user_id == User.getInfo().uid
        }
    },
    watch: {
        emotion: {
            deep: true,
            immediate: true,
            handler(val) {
                this.count = val.count || 0;
            },
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
        showUserName: function (emotion) {
            return emotion?.user_info?.display_name.slice(0, 12) || "匿名";
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
        // 删除
        handleDelete: function () {
            this.$confirm("此操作将会删除该表情，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                removeEmotion(this.emotion.id).then(() => {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                    });
                    if (this.mode === "single") {
                        this.$router.go(-1);
                    } else {
                        this.$emit("update");
                    }
                });
            });
        },

        // 图片格式
        checkImageExt: function () {
            let ext = this.emotion?.url?.split(".").pop().toLowerCase();
            if (ext && ext != "gif") {
                this.types.push(ext, "gif");
                this.ext = ext;
            }
        },
        checkIsGif: function (url) {
            return url?.split(".").pop().toLowerCase() == "gif";
        },
        showEmotion: function (url) {
            if (this.mode == "single") {
                return resolveImagePath(url);
            } else {
                if (this.checkIsGif(url)) {
                    return resolveImagePath(url);
                } else {
                    return getThumbnail(url, "emotion_thumbnail");
                }
            }
        },
    },
};
</script>

<style scoped>
</style>