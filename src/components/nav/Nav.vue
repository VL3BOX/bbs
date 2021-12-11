<template>
    <div>
        <list_nav v-if="mode == 'list'" class="m-nav"/>
        <single_nav v-else />
    </div>
</template>

<script>
import list_nav from "@/components/nav/list_nav.vue";
import single_nav from "@/components/nav/single_nav.vue";
export default {
    name: "Nav",
    props: [],
    components: {
        list_nav,
        single_nav
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