<template>
    <div class="v-index">
        <joke />
        <!-- <emotion /> -->
        <list />
    </div>
</template>

<script>
// import emotion from "@/components/emotion/emotion_index.vue";
import list from "@/components/bbs/list_index.vue";
import joke from "@/components/joke/joke_index.vue";
export default {
    name: "Index",
    props: [],
    components: {
        list,
        joke,
        // emotion,
    },
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/bbs/index.less";
</style>