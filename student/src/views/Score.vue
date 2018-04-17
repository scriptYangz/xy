<template>
  <div>
    <div class="your_scores_container">
      <header class="your_scores"><span class="score_num">你的成绩为：{{score}}分</span></header>
    </div>
  </div>
</template>

<script>
    export default {
        name: "score",
      data(){
          return {
            score:0,
          }
      }
    }
</script>
@import '/static/css/reset.css';
<style lang="less" rel="stylesheet">
  .your_scores_container{
    .your_scores{
      margin: 20px auto;
      text-align: center;
    }
  }
</style>
