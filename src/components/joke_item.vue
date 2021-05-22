<template>
    <div class="joke-item">
        <div class="content">
            <div v-html="parse(joke.post_title)"></div>
        </div>
        <div class="other">
            <div class="user">
                <img :src="joke.author_info.user_avatar" width="24" height="24" alt="avatar">
                <span>{{ joke.author_info.display_name }}</span>
            </div>
            <div class="time">
                <el-link type="primary"
                    class="copy-btn" 
                    :disabled="disabled" 
                    @click="handleCopy(joke.post_title)"
                >{{ copyLabel }}</el-link>
                <span class="u-date">
                    <i class="el-icon-date"></i>&emsp;
                    <time>{{ joke.post_date | dateFormat }}</time>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import  JX3_EMOTION from '@jx3box/jx3box-emotion'
import dateFormat from "@/utils/dateFormat"
export default {
    name: 'joke_item',
    props: ['joke'],
    data() {
        return {
            copyLabel: '点击复制',
            disabled: false
        }
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    methods: {
        parse(str) {
            const ins = new JX3_EMOTION(str)
            return ins.code
        },
        handleCopy(str) {
            this.disabled = true
            navigator.clipboard.writeText(str).then(() => {
                this.copyLabel = '已复制'

                setTimeout(() => {
                    this.copyLabel = '点击复制'
                    this.disabled = false
                }, 3000)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.joke-item {
    .content {
        min-height: 32px;
        // cursor: pointer;
    }

    .other {
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

        .time {
            display: inline-flex;
            align-items: center;
            .copy-btn {
                margin-right: 8px;
            }
        }
    }
}
</style>