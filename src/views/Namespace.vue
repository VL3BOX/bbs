<template>
    <div class="v-namespace" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-archive-search" slot="search-before">
            <el-input
                placeholder="请输入搜索内容"
                v-model="search"
                class="input-with-select"
            >
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <!-- tab切换 -->
        <el-tabs class="m-namespace-tab" v-model="type">
            <el-tab-pane label="全部" name=""> </el-tab-pane>
            <el-tab-pane
                v-for="item in types"
                :label="item.label"
                :key="item.value"
                :name="item.value"
            >
            </el-tab-pane>
        </el-tabs>
        <!-- 列表内容 -->
        <div class="m-namespace-list" v-if="list && list.length">
            <el-row :gutter="20">
                <el-col :span="12" v-for="(item, index) in list" :key="index">
                    <namespace-item :data="item"
                /></el-col>
            </el-row>
        </div>
        <!-- 无数据 -->
        <div class="m-namespace-null" v-else>
            <el-alert title="没有相关条目" type="info" show-icon> </el-alert>
        </div>
        <!-- 分页 -->
        <div class="m-namespace-pages">
            <el-pagination
                background
                layout="total, prev, pager, next,jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :total="total"
                :current-page.sync="page"
            >
            </el-pagination>
        </div>
  </div>
</template>

<script>
import namespaceItem from "@/components/namespace_item";
import Namespace_item from "../components/namespace_item.vue";
import { getNamespaceList } from "@/service/namespace.js";

export default {
    name: "Namespace",
    props: [],
    data: function() {
        return {
            type: "",
            types: [
                { label: "玩家", value: "player" },
                { label: "团队", value: "team" },
                { label: "系统", value: "system" },
                { label: "自定义", value: "custom" },
            ],
            list: [],
            per: 24,
            total: 1,
            page: 1,
            search: "",
            loading : false
        };
    },
    computed: {
        params: function() {
            return {
                // user_id
                key: this.search,
                source_type: this.type,
                // source_id
                page: this.page,
                limit: this.per,
            };
        },
    },
    methods: {
        loadNamespaceList: function() {
            this.loading = true
            getNamespaceList(this.params).then((res) => {
                this.list = res.data.data.data || [];
                this.total = res.data.data.total;
            }).finally(() => {
                this.loading = false
            })
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function(newVal) {
                this.loadNamespaceList();
            },
        },
    },
    filters: {},
    created: function() {
        this.loadNamespaceList();
    },
    components: {
        "namespace-item": namespaceItem,
    },
};
</script>

<style lang="less">
@import "../assets/css/namespace.less";
</style>
