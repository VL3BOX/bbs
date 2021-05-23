<template>
    <div class="joke-item">
        <div class="content">
            <div v-html="parse(joke.post_title)"></div>
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
                    v-if="mode != 'single'"
                    class="el-link el-link--primary is-underline"
                    :to="'/joke/' + joke.ID"
                >
                    <i class="el-icon-chat-dot-square"></i>评论
                </router-link>
            </div>
            <div class="other">
                <div class="user">
                    <img :src="(joke.author_info && joke.author_info.user_avatar) | showAvatar" />
                    <a
                        :href="joke.post_author | authorLink"
                        target="_blank"
                        v-if="joke.post_author && joke.post_author!=1"
                    >{{ joke.author }}</a>
                    <span v-else>{{ joke.author || '匿名' }}</span>
                </div>
                <div class="time">
                    <span class="u-date">
                        <i class="el-icon-date"></i>&emsp;
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
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "joke_item",
    props: ["joke", "mode"],
    data() {
        return {
            copyLabel: "点击复制",
            disabled: false,
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
    },
};
</script>

<style lang="less" scoped>
.joke-item {
    .content {
        min-height: 32px;
        // cursor: pointer;
    }

    .misc {
        .clearfix;
    }
    .op {
        .fl;
        .fz(14px,20px);

        .copy-btn {
            .mr(20px);
        }

        i {
            .mr(5px);
        }
    }
    .other {
        .fr;
        display: flex;
        font-size: 12px;
        color: #999;

        justify-content: space-between;

        .user {
            display: inline-flex;
            align-items: center;
            margin-right: 24px;

            img {
                margin-right: 8px;
            }
        }
        a:hover {
            color: @pink;
        }

        .time {
            display: inline-flex;
            align-items: center;
        }
    }
}
</style>