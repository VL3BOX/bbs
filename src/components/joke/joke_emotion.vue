<template>
    <el-popover
        popper-class="m-joke-popover"
        placement="top"
        width="500"
        :offset="-200"
        v-model="showPop"
    >
        <Emotion
            class="m-publish-joke-emotion"
            @selected="handleEmotionSelect"
        />

        <span
            slot="reference"
            class="u-joke-popover-icon"
            style="cursor: pointer"
            title="选择表情"
            >😀</span
        >
    </el-popover>
</template>

<script>
import Emotion from "@jx3box/jx3box-emotion/src/Emotion.vue";
export default {
    name: "joke_post",
    components: {
        Emotion,
    },
    data() {
        return {
            showPop: false,
        };
    },
    methods: {
        handleEmotionSelect(key) {
            this.$emit("emotion", key);
            this.showPop = false
        },
    },
};
</script>

<style lang="less">
.m-joke-popover {
    .m-publish-joke-emotion {
        margin: 0;
    }
}
</style>

