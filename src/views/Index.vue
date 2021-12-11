<template>
    <div class="v-index">
        <joke />
        <list />
    </div>
</template>

<script>
import list from "@/components/bbs/list_index.vue";
import joke from "@/components/joke/joke_index.vue";
export default {
    name: "Index",
    props: [],
    components: {
        list,
        joke,
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
@import "../assets/css/index.less";
</style>