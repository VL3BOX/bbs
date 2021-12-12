<template>
    <div class="m-emotion-item" :class="{single: mode === 'single'}">
        <template v-if="mode === 'single'">
            <img class="m-single-img" :src="emotionUrl(emotion.url)" alt="" @click="preview">
            <div>{{ emotion.desc }}</div>
            <!--<a
                v-if="mode === 'single'"
                class="u-edit el-link el-link&#45;&#45;primary is-underline"
                :href="editLink('emotion', emotion.id)"
                target="_blank"
            >
                <i class="el-icon-edit-outline"></i>
            </a>-->
            <el-radio-group v-model="imgType" size="small" class="u-image-type">
                <el-radio-button label="png">PNG</el-radio-button>
                <el-radio-button label="gif">GIF</el-radio-button>
            </el-radio-group>
        </template>
        <template v-else>
            <div class="u-emotion">
                <i class="u-img" @click="preview">
                    <i class="u-original" v-if="emotion.original">原创</i>
                    <img class="u-pic u-emotion-pic" :src="emotion.url" alt="">
                </i>
            </div>
            <div class="u-desc" >
                <span
                    class="u-edit el-link el-link--primary is-underline"
                    @click="handleContent"
                    title="编辑"
                >
                    {{ emotion.desc }}
                </span>
            </div>
            <div class="u-op">
                <span class="u-user">
                    <img alt="avatar" width="24" height="24" :src="user_avatar | showAvatar"/>
                    <a
                        :href="emotion.user_id | authorLink"
                        target="_blank"
                        v-if="emotion.user_id"
                    >{{ user_name }}</a>
                    <span v-else>{{ emotion.author || '匿名' }}</span>
                </span>
                <span>
                    <a
                        class="u-like"
                        :class="{on: isLike}"
                        title="赞"
                        @click="addLike"
                        v-if="isListPage"
                    >
                        <i class="like-icon">{{isLike ? '♥' : '♡'}}</i>Like
                        <span class="like-count" v-if="count">{{ count }}</span>
                    </a>
                </span>
            </div>
        </template>
        <div class="u-op u-editor">
            <template v-if="isEditor">
                <span class="el-link el-link--primary is-underline" @click="handleStar">
                    <i :class="isStar ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
                    {{ isStar ? '取消精选' : '设为精选' }}
                </span>
                <!-- <span
                    class="el-link el-link--primary is-underline u-delete"
                    @click="handleDelete"
                >
                    <i class="el-icon-delete"></i> 删除
                </span> -->
            </template>
        </div>
    </div>
</template>

<script>
import {
    showAvatar,
    authorLink,
    editLink,
} from "@jx3box/jx3box-common/js/utils";
import {postStat} from "@jx3box/jx3box-common/js/stat";
import User from "@jx3box/jx3box-common/js/user";
import {starEmotion, unstarEmotion, removeEmotion} from "@/service/emotion";
export default {
    props: ['mode', 'emotion', 'index'],
    name: "emotion_item",
    data() {
        return {
            count: 0,
            isLike: false,
            isStar: this.emotion.star,

            imgType: 'png'
        }
    },
    computed: {
        user_avatar: function () {
            return this.emotion?.user_info?.user_avatar;
        },
        user_name: function () {
            return this.emotion?.user_info?.display_name;
        },
        isEditor: function () {
            return User.isEditor();
        },
        isListPage: function () {
            return this.mode != "single";
        },
    },
    watch: {
        emotion: {
            deep: true,
            immediate: true,
            handler(val) {
                this.count = val.count || 0
            }
        }
    },
    filters: {
        showAvatar: function (val) {
            return showAvatar(val, 24);
        },
        authorLink,
    },
    methods: {
        emotionUrl: function (val) {
            return this.imgType === 'png' ? this.emotion.url : ''
        },
        editLink,
        preview() {
            if (this.mode === 'single') {
                this.$hevueImgPreview({
                    url: this.emotion.url,
                    controlBar: false,
                    clickMaskCLose: true,
                })
            } else {
                this.$emit('preview', this.index)
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
                this.unStar()
            }
        },
        unStar: function (){
            unstarEmotion(this.emotion.id).then(() => {
                this.$notify({
                    title: "成功",
                    message: "取消加精成功",
                    type: "success",
                });
                this.isStar = false;
                this.$forceUpdate();
            })
        },
        handleContent: function () {
            this.$router.push(`/emotion/${this.emotion.id}`);
        },
        handleDelete: function (){
            this.$confirm("此操作将会删除该骚话，是否继续？", "提示", {
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
        }
    }
}
</script>

<style scoped>

</style>