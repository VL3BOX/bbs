<template>
    <div class="v-emotion">
       <!-- 搜索 -->
        <div class="m-emotion-search" slot="search-before">
            <el-input placeholder="请输入搜索内容" v-model="search">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="m-emotion-content">
            
        </div>
        <!-- <el-alert title="即将登陆，敬请期待" type="warning" show-icon>
        </el-alert> -->
    </div>
</template>

<script>
import { getEmotions } from '@/service/emotions'
export default {
    name: "Emotion",
    props: [],
    data: function() {
        return {
            search: '',
            list: [],

            // pagination
            per: 10,
            page: 1
        };
    },
    computed: {
        params: function ({ search, per, page }){
            return {
                search,
                per,
                page,
            }
        }
    },
    methods: {
        loadList: function (){
            getEmotions(this.params).then(res => {
                this.list = res.data?.list || []
            })
        }
    },
    watch: {
        params: {
            immediate: true,
            deep: true,
            handler: function (){
                this.loadList()
            }
        }
    },
    created: function() {},
    components: {},
};
</script>

<style lang="less">
// @import '../assets/css/fn.less';
</style>
