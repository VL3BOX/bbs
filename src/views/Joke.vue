<template>
    <div class="v-joke" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-joke-search" slot="search-before">
            <el-input
                placeholder="请输入搜索内容"
                v-model="search"
            >
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <el-row class="v-joke-list" :gutter="20">
            <el-col :span="24" v-for="(joke, index) in jokes" :key="index" class="item">
                <div class="v-joke-list-item">
                    <joke-item :joke="joke" />
                </div>
            </el-col>
        </el-row>

        <el-pagination
            class="v-joke-pagination"
            background
            :page-size="per"
            :hide-on-single-page="true"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import emotion from "@jx3box/jx3box-data/data/jokes/default.json";
import { getJokes } from '@/service/jokes'
import joke_item from '../components/joke_item'

export default {
    name: "Joke",
    components: {
        'joke-item': joke_item
    },
    data: function() {
        return {
            loading: true,
            sortedEmotions: [],
            search: '',
            per: 10,
            page: 1,
            total: 1,
            jokes: []
        };
    },
    watch: {
        'params': {
            handler() {
                this.loadData()
            },
            deep: true
        }
    },
    computed: {
        params({ search, page, per }) {
            const obj = {
                per,
                page,
                order: 'update'
            }

            if (search) Object.assign(obj, { search })

            return obj
        }
    },
    methods: {
        
        // 表情排序
        sortEmotion() {
            const keys = Object.keys(emotion)
            keys.sort((item1, item2) => {
                return item1.localeCompare(item2)
            })
            keys.forEach(key => {
                const obj = {
                    key,
                    value: emotion[key]
                }
                this.sortedEmotions.push(obj)
            })
        },
        loadData() {
            this.loading = true
            getJokes(this.params).then(res => {
                console.log(res)
                this.jokes = res.data.data.list
                this.total = res.data.data.total
            }).catch(error => {}).finally(() => {
                this.loading = false
            })
        }
    },
    created: function() {
        this.sortEmotion()
        this.loadData()
    },
};
</script>

<style lang="less" scoped>
.v-joke-list {
    margin-top: 14px;

    .item {
        &:not(:last-of-type) {
            margin-bottom: 20px;
        }
    }

    &-item {
        background: #f5f7fa;
        padding: 15px 15px 10px 15px;
        border-radius: 4px;
    }

    .joke-bottom {
        display: flex;
        align-content: baseline;

        .user {
            display: flex;
        }
    }
}
.v-joke-pagination {
    margin-top: 10px;
}
</style>
