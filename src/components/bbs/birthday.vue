<template>
    <div class="m-birthday m-jx3dat-rank-mini m-jx3dat-rank">
        <h3 class="c-sidebar-right-title">
            <img class="u-icon" svg-inline src="@/assets/img/cake.svg" />今日之星
            <span class="u-date">{{ today }}</span>
            <!-- <span class="u-more" @click="viewRank">查看更多 &raquo;</span> -->
        </h3>
        <div v-loading="loading">
            <ul class="u-list" v-if="list && list.length">
                <li v-for="(item, k) in list" :key="k">
                    <a class="u-link" :href="authorLink(item.uid)">
                        <!-- <span class="u-order" :class="highlight(k)">{{ k + 1 }}</span> -->
                        <Avatar class="u-avatar" :url="item.avatar" :size="14"> </Avatar>
                        <!-- <span class="u-tag" :class="item.client">{{ item.client === "std" ? "重制" : "缘起" }}</span> -->
                        <span class="u-name"> {{ item.username }} </span>
                    </a>
                </li>
            </ul>
            <el-alert v-else show-icon type="info" :closable="false" title="暂无今日之星"></el-alert>
        </div>
    </div>
</template>

<script>
import {getBirthdayList} from "@/service/next";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "birthday",
    data() {
        return {
            list: [],
            loading: false,
        }
    },
    computed: {
        today() {
            return new Date().toLocaleDateString()?.replace(/\//g, "-");
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            const params = {
                limit: 50
            }
            this.loading = true
            getBirthdayList(params).then(res => {
                this.list = res.data.data
            }).finally(() => {
                this.loading = false
            })
        },
        authorLink,
    }
}
</script>

<style lang="less">
</style>
