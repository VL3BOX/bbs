<template>
    <div class="m-joke-item">
        <div class="content">
            <i v-if="isEditor" class="u-star-op" :class="{on:isMark}" @click="handleMark">★</i>
            <i v-else class="u-star" v-show="isMark">★</i>
            <span class="u-sentence" v-html="parse(joke.post_title)"></span>
        </div>
        <div class="misc">
            <div class="op">
                <el-link
                    type="primary"
                    class="copy-btn"
                    :disabled="disabled"
                    @click="handleCopy(joke.post_title)"
                >
                    <i class="el-icon-document-copy"></i>
                    {{ copyLabel }}
                </el-link>
                <router-link
                    v-if="mode !== 'single'"
                    class="el-link el-link--primary is-underline copy-btn"
                    :to="'/joke/' + joke.ID"
                >
                    <i class="el-icon-chat-dot-square"></i>评论
                </router-link>
                <!-- <a
                    v-if="isEditor"
                    class="el-link el-link--primary is-underline"
                    @click="handleMark"
                >
                    <i :class="isMark ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
                    {{ isMark ? '取消精选' : '设为精选' }}
                </a> -->
                <a
                    v-if="mode === 'single'"
                    class="u-edit el-link el-link--primary is-underline"
                    :href="editLink('joke',joke.ID)"
                    target="_blank"
                >
                    <i class="el-icon-edit-outline"></i> 编辑
                </a>
            </div>
            <div class="u-other">
                <div class="user">
                    <img
                        width="24"
                        height="24"
                        :src="(joke.author_info && joke.author_info.user_avatar) | showAvatar"
                    />
                    <a
                        :href="joke.post_author | authorLink"
                        target="_blank"
                        v-if="joke.post_author && joke.post_author!=1"
                    >{{ joke.author }}</a>
                    <span v-else>{{ joke.author || '匿名' }}</span>
                </div>
                <div class="u-time">
                    <span class="u-date">
                        <i class="el-icon-date"></i>&nbsp;
                        <time>{{ joke.post_date | dateFormat }}</time>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JX3_EMOTION from "@jx3box/jx3box-emotion";
import dateFormat from "@/utils/dateFormat";
import {
    showAvatar,
    authorLink,
    editLink,
} from "@jx3box/jx3box-common/js/utils";
import { setJokeMark } from "@/service/jokes";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "joke_item",
    props: ["joke", "mode"],
    data() {
        return {
            copyLabel: "点击复制",
            disabled: false,
            isMark: !!this.joke?.mark?.length,
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
        // isMark: function ({ joke }) {
        //     return !!joke?.mark?.length;
        // },
        isEditor: function () {
            return User.isEditor();
        },
    },
    methods: {
        parse(str) {
            const ins = new JX3_EMOTION(str);
            return ins.code;
        },
        handleCopy(str) {
            this.disabled = true;
            navigator.clipboard.writeText(str).then(() => {
                this.copyLabel = "已复制";

                setTimeout(() => {
                    this.copyLabel = "点击复制";
                    this.disabled = false;
                }, 3000);
            });
        },
        editLink,
        // 编辑精选
        handleMark() {
            let mark = this.isMark ? [] : ["recommended"];
            setJokeMark({ id: this.joke.ID, data: { mark } })
                .then(() => {
                    this.$notify({
                        title: "成功",
                        message: "设置成功",
                        type: "success",
                    });
                    this.isMark = !!mark.length;
                    this.$forceUpdate();
                    // this.$emit("update");
                })
                .catch((err) => {
                    this.$notify({
                        title: "成功",
                        message:
                            err?.message || "设置失败，请重试或者联系管理员",
                        type: "error",
                    });
                });
        },
    },
};
</script>
