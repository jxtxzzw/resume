<style scoped lang="less">
  .demo-Circle-custom{
    & h1{
      color: #3f414d;
      font-size: 28px;
      font-weight: normal;
    }
    & p{
      color: #657180;
      font-size: 14px;
      margin: 10px 0 15px;
    }
    & span{
      display: block;
      padding-top: 15px;
      color: #657180;
      font-size: 14px;
      &:before{
        content: '';
        display: block;
        width: 50px;
        height: 1px;
        margin: 0 auto;
        background: #e0e3e6;
        position: relative;
        top: -15px;
      };
    }
    & span i{
      font-style: normal;
      color: #3f414d;
    }
  }
</style>
<template lang="pug">
  div
    i-circle(:percent="listening/248.5*100", dashboard )
      div(class="demo-Circle-custom")
       h1 {{listening}}
       p 听力
      span
        | 满分
        i 248.5
    i-circle(:percent="reading/248.5*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{reading}}
        p 阅读
      span
        | 满分
        i 248.5
    i-circle(:percent="writingAndTranslation/213*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{writingAndTranslation}}
        p 写作和翻译
      span
        | 满分
        i 213
    i-circle(:percent="(parseInt(listening)+parseInt(reading)+parseInt(writingAndTranslation))/710*100", dashboard, stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1 {{parseInt(listening)+parseInt(reading)+parseInt(writingAndTranslation)}}
        p 总分
      span
        | 满分
        i 710
</template>
<script>
export default {
  name: 'CET',
  props: ['listening', 'reading', 'writingAndTranslation']
}
</script>
