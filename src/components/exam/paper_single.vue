<template>
    <div></div>
</template>

<script>
export default {
   name : 'PaperSingle',
   props:[],
   components : {},
   data : function(){
       return {
           
           answers : {

           }
       }
   },
   computed:{
       id : function (){
           return this.$route.params.id
       }
   },
   watch:{},
   methods:{
       loadData : function (){
            // 题目数据加工//    拿到

            // 答案仓库初始化
            let answers = {}
            for(let item of questions){
                if(item.type == 'radio'){
                    answers[item.id] = ''
                }else if(item.type == 'checkbox'){
                    answers[item.id] = []
                }
            }

            this.questions = []
            this.answers = answers

       },
   },
   filters:{},
   created:function(){},
   mounted:function(){},
}
</script>