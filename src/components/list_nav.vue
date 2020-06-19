<template>
    <div class="m-list-nav">

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-bbs-nav">
            <a v-for="(item,i) in menu" :href="typeLink(item.slug)" :key="i" :class="{on:item.slug == subtype}"><i :class="item.icon"></i><b>{{item.name}}</b><span>{{item.desc}}</span></a>
        </div>

        <!-- <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/furniture">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>家具图鉴</span>
                <i class="u-mark isnew">全新上线</i>
            </router-link>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            menu : [
                {
                    slug : '',
                    icon : 'el-icon-receiving',
                    name : '全部',
                    desc : 'All'
                },
                {
                    slug : 1,
                    icon : 'el-icon-collection',
                    name : '玩法心得',
                    desc : 'Experience'
                },
                {
                    slug : 2,
                    icon : 'el-icon-film',
                    name : '江湖回忆',
                    desc : 'Memory'
                },
                {
                    slug : 3,
                    icon : 'el-icon-video-camera',
                    name : '同人影音',
                    desc : 'Media'
                },
                {
                    slug : 4,
                    icon : 'el-icon-chat-line-round',
                    name : '交流讨论',
                    desc : 'Discuz'
                },
            ]
        };
    },
    computed: {
        subtype : function (){
            return this.$store.state.subtype || ''
        }
    },
    methods: {
        typeLink : function (subtype){
            return './?subtype=' + subtype
        }
    },
    mounted: function() {},
    components : {
        
    }
};
</script>
