<template>
    <div class="m-joke-item">
        <div class="u-content" @click="handleContent" :class="mode === 'single' ? 'on' : ''">
            <i class="u-star" :class="joke.star ? 'on' : ''" v-if="joke.star" title="精选">★</i>
            <span class="u-sentence" v-html="parse(joke.content)"></span>
        </div>
        <div class="u-misc">
            <div class="u-op">
                <span class="u-user">
                    <img width="24" height="24" :src="user_avatar | showAvatar" />
                    <a
                        :href="joke.user_id | authorLink"
                        target="_blank"
                        v-if="joke.user_id"
                    >{{ user_name }}</a>
                    <span v-else>{{ joke.author || '匿名' }}</span>
                </span>
                <el-link
                    type="primary"
                    class="u-copy"
                    :disabled="disabled"
                    @click="handleCopy(joke.content)"
                >
                    <i class="el-icon-document-copy"></i> 复制
                </el-link>

                <a
                    v-if="mode === 'single' && (isAuthor || isEditor)"
                    class="u-edit el-link el-link--primary is-underline"
                    :href="editLink('joke',joke.id)"
                    target="_blank"
                >
                    <i class="el-icon-edit-outline"></i> 编辑
                </a>

                <a
                    class="u-like"
                    :class="{ on:isLike}"
                    title="赞"
                    @click="addLike"
                    v-if="isListPage"
                >
                    <i class="like-icon">{{isLike ? '♥' : '♡'}}</i>Like
                    <span class="like-count" v-if="count">{{ count }}</span>
                </a>

                <template v-if="isEditor">
                    <span class="u-op-star el-link el-link--primary is-underline" @click="handleStar">
                        <i :class="isStar ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
                        {{ isStar ? '取消精选' : '设为精选' }}
                    </span>
                    <span
                        class="u-delete el-link el-link--primary is-underline"
                        @click="handleDelete"
                    >
                        <i class="el-icon-delete"></i> 删除
                    </span>
                </template>
            </div>
            <div class="u-other">
                <span class="u-date">
                    <i class="el-icon-date"></i>&nbsp;
                    <time>{{ joke.created_at | dateFormat }}</time>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import JX3_EMOTION from "@jx3box/jx3box-emotion";
import {dateFormat} from "@/utils/dateFormat";
import {
    showAvatar,
    authorLink,
    editLink,
} from "@jx3box/jx3box-common/js/utils";
import { starJoke, removeJoke, unstarJoke } from "@/service/joke";
import User from "@jx3box/jx3box-common/js/user";
import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
    name: "joke_item",
    props: ["joke", "mode"],
    data() {
        return {
            disabled: false,

            // 加星
            isStar: this.joke.star,

            // 点赞
            count: 0,
            isLike: false,
        };
    },
    filters: {
        dateFormat: function (val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function (val) {
            return showAvatar(val, 24);
        },
        authorLink,
    },
    computed: {
        isListPage: function () {
            return this.mode !== "single";
        },
        isEditor: function () {
            return User.isEditor();
        },
        user_avatar: function () {
            return this.joke?.user_info?.user_avatar;
        },
        user_name: function () {
            return this.joke?.user_info?.display_name;
        },
        isAuthor: function () {
            const user = User.getInfo()
            return user.uid === this.joke.user_id
        }
    },
    methods: {
        parse(str) {
            const ins = new JX3_EMOTION(str);
            return ins.code;
        },
        // 复制
        handleCopy(str) {
            this.disabled = true;
            navigator.clipboard.writeText(str).then(() => {
                this.copyLabel = "已复制";

                setTimeout(() => {
                    this.copyLabel = "复制";
                    this.disabled = false;
                }, 3000);
            });
        },
        // 编辑
        editLink,
        // 点赞
        addLike: function () {
            if (this.isLike) return;

            this.count++;
            if (!this.isLike) {
                postStat("joke", this.joke?.id, "likes");
            }
            this.isLike = true;
        },
        // 精选
        handleStar() {
            if (!this.isStar) {
                starJoke(this.joke.id).then(() => {
                    this.$notify({
                        title: "成功",
                        message: "加精成功",
                        type: "success",
                    });
                    this.isStar = true;
                    this.joke.star = true
                    this.$forceUpdate();
                    // this.$emit("update");
                });
            } else {
                this.unStar()
            }
        },
        unStar: function (){
            unstarJoke(this.joke.id).then(() => {
                this.$notify({
                    title: "成功",
                    message: "取消加精成功",
                    type: "success",
                });
                this.isStar = false;
                this.joke.star = false
                this.$forceUpdate();
            })
        },

        // 删除
        handleDelete() {
            this.$confirm("此操作将会删除该表情，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                removeJoke(this.joke.id).then(() => {
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
        handleContent: function () {
            this.$router.push(`/joke/${this.joke.id}`);
        },
    },
};
</script>
