<template>
    <div class="m-list-nav">

        <RightSideMsg>
            <em>休闲玩法交流群</em> :
            <strong><a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw">658035079</a></strong>
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-bbs-nav">
            <a v-for="(item,i) in menu" :href="typeLink(item.slug)" :key="i" :class="{on:item.slug == subtype}"><i :class="item.icon"></i><b>{{item.name}}</b><span>{{item.desc}}</span></a>
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group m-bbs-nav">
            <a href="/wiki" target="_blank">
                <i class="el-icon-reading"></i>
                <b>剑三百科</b>
                <span>Wiki</span>
            </a>
            <a href="/emotion" target="_blank">
                <i class="el-icon-picture-outline-round"></i>
                <b>沙雕表情</b>
                <span>Picture</span>
            </a>
            <a href="/exam" target="_blank">
                <i class="el-icon-tickets"></i>
                <b>趣味题库</b>
                <span>Exam</span>
            </a>
        </div>
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
                {
                    slug : 5,
                    icon : 'el-icon-goblet-square-full',
                    name : '反馈建议',
                    desc : 'Idea'
                }
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
