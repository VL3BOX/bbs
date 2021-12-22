<template>
  <div class="v-paper">



      
    <el-pagination
      class="m-exam-pagination"
      background
      :page-size="per"
      :hide-on-single-page="true"
      :current-page.sync="page"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="skipTop"
    ></el-pagination>
  </div>
</template>