<template>
    <div></div>
</template>

<script>
export default {
    name: "CollectionRedirect",
    props: [],
    components: {},
    data: function() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function() {
        if (this.$route.name == "view") {
            let id = this.$route.params.id;
            location.href = `/bbs/#/collection/${id}`;
        } else {
            location.href = "/bbs/#/collection";
        }
    },
};
</script>
