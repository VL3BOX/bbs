<template>
    <div class="m-collection-list">
        <!-- 搜索 -->
        <div class="m-archive-search">
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: "CollectionList",
    props: [],
    components: {},
    data: function () {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 10, //每页条目
            search: "",
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>
