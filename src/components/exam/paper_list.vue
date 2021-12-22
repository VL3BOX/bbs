<template>
    <div class="v-paper-list">
        <!-- list -->
        <div class="m-list">
            <a class="m-list-item" v-for="item in data" :key="item.id" @click="takePaper(item.id)">
                <div class="u-title" :class="item.style">{{ item.title }}</div>
                <div class="u-tags">
                    <el-tag class="u-tag" v-for="tag in JSON.parse(item.tags).slice(0, 3)" :key="tag" size="small">
                        {{ tag }}
                    </el-tag>
                </div>
                <div class="u-desc" :class="item.style">
                    <img class="u-icon" svg-inline src="../../assets/img/logo.svg" />
                    <div class="u-text">{{ item.desc }}</div>
                </div>
                <div class="u-info">
                    <div>出卷人： {{ item.createUser }}</div>
                    <div class="u-star">
                        难度：
                        <el-rate v-model="item.hardStar" disabled text-color="#ff9900"></el-rate>
                    </div>
                </div>
            </a>
        </div>
        <!-- 翻页 -->
    </div>
</template>
<script>
export default {
    name: "PaperList",
    props: ["data"],
    components: {},
    data: function() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        takePaper(id) {
            this.$router.push({
                name: "paper",
                params: { id: id },
            });
        },
    },
    filters: {},
    created: function() {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../../assets/css/paper.less";
</style>
