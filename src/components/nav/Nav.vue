<template>
    <div>
        <list_nav v-if="mode == 'list'" class="m-nav" />
        <single_nav v-if="mode == 'single'" />
    </div>
</template>

<script>
import list_nav from "@/components/nav/list_nav.vue";
import single_nav from "@/components/nav/single_nav.vue";
import { single_types } from "../../../setting.json";
export default {
    name: "Nav",
    props: [],
    components: {
        list_nav,
        single_nav,
    },
    data: function () {
        return {};
    },
    computed: {
        isLikeSinglePage: function () {
            return !!this.$route.params.id;
        },
        type: function () {
            return this.$route.name;
        },
        isLikeSingleType: function () {
            return single_types.includes(this.type);
        },
        mode: function () {
            return this.isLikeSinglePage && this.isLikeSingleType
                ? "single"
                : "list";
        },
    },
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>