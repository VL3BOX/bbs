<template>
    <div class="m-collection">
        <List v-if="mode == 'list'" />
        <Single />
    </div>
</template>

<script>
import List from "@/components/collection/collection_list.vue";
import Single from "@/components/collection/collection_single.vue";
export default {
    name: "Collection",
    props: [],
    components: {
        List,
        Single,
    },
    data: function () {
        return {};
    },
    computed: {
        mode: function () {
            return this.$route.params.id ? "single" : "list";
        },
    },
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/collection.less";
</style>