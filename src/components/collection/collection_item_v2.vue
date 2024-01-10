<template>
    <a :href="`/collection/${data.id}`" target="_blank" class="m-collection-item_v2" @mousemove="handleMove">
        <div class="u-image" ref="bookRef">
            <el-image class="u-img u-cover" :src="resolveImagePath(data.image)" fit="cover">
                <img slot="error" :src="`${imgPath}cover-${randomNumber}.png`" />
            </el-image>
            <img class="u-img u-mark" ref="mark" :src="`${imgPath}light.svg`" />
            <img class="u-img u-box" :src="`${imgPath}box.svg`" />
        </div>

        <div class="u-content">
            <div class="u-title" :title="data.title">{{ data.title }}</div>
            <div class="u-info" v-if="data.collection_user_info">
                <a :href="authorLink(data.user_id)" class="u-user" target="_blank">
                    <img class="u-avatar" :src="showAvatar(data.collection_user_info.user_avatar)" />
                    <span class="u-nickname" v-text="data.collection_user_info.display_name"></span>
                </a>
            </div>
            <div class="u-time">
                <el-button type="text" icon="el-icon-date">{{ showDate(data.created * 1000) }}</el-button>
                <el-button type="text" icon="el-icon-refresh">{{ showDate(data.updated * 1000) }}</el-button>
            </div>
        </div>
    </a>
</template>

<script>
import { showAvatar, resolveImagePath, authorLink } from "@jx3box/jx3box-common/js/utils";
import { showDate } from "@jx3box/jx3box-common/js/moment";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "CollectionItemV2",
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        imgPath() {
            return `${__imgPath}topic/bbs/`;
        },
        randomNumber() {
            return Math.floor(Math.random() * 4) + 1;
        },
    },
    methods: {
        resolveImagePath,
        authorLink,
        showAvatar,
        showDate,
        handleMove(event) {
            let x = event.clientX / 100;
            let y = event.clientY / 50;
            this.$refs.mark.style.transform = `translate(${x}px, ${y}px)`;
        },
    },
};
</script>

<style lang="less">
.m-collection-item_v2 {
    .flex;
    .mb(20px);
    .size(380px, 500px);
    flex-direction: column;
    background-color: #fff;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    .u-content {
        .db;
        .w(100%);
        .flex;
        flex-direction: column;
        align-items: center;
    }
    .u-image {
        .pointer;
        .db;
        .pr;
        .clip;
        .size(210px, 310px);
        transition: transform 0.5s, box-shadow 0.5s, top 0.5s;
        backface-visibility: hidden;

        .u-img {
            .pa;
            .lt(0);
            .full;
            object-fit: contain;
            border-radius: 4px;
            transition: transform 0.5s, box-shadow 0.5s;
            &.u-mark {
                .none;
                .lt(0);
                .size(210px, 300px);
                pointer-events: none;
            }
            &.u-cover {
                .size(186px, 266px);
                .lt(15px, 10px);
                background-color: #24292e;
            }
        }
    }

    .u-title {
        .nobreak;
        .bold;
        .db;
        .x;
        .w(100%);
        .fz(24px, 1.8);
        color: #000;
    }

    .u-info {
        .flex;
        .mt(5px);
        .clearfix;
        flex-direction: column;
    }

    .u-user {
        .flex;
        .fz(20px);
        .auto(x);
        gap: 5px;
        align-items: center;
        color: #666;
    }
    .u-avatar {
        .size(24px);
        .r(100%);
    }

    &:hover {
        background-color: #f5f5f5;
        .u-image {
            transform: rotate(-15deg) translateY(-20px);
            box-shadow: 0 60px 30px rgba(36, 41, 46, 0.3);
            top: -20px;
            .u-mark {
                .db;
            }
        }
        .u-title {
            color: rgba(42, 130, 228, 1);
        }
    }
    .el-button--text,
    .el-button--text:focus,
    .el-button--text:hover {
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
    }
}
</style>
