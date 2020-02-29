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
    i-circle(:percent="reading/30*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{reading}}
        p Reading
      span
        i (0-30)
    i-circle(:percent="listening/30*100", dashboard )
      div(class="demo-Circle-custom")
       h1 {{listening}}
       p Listening
      span
        i (0-30)
    i-circle(:percent="speaking/30*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{speaking}}
        p Speaking
      span
        i (0-30)
    i-circle(:percent="writing/30*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{writing}}
        p Writing
      span
        i (0-30)
    i-circle(:percent="(parseInt(reading)+parseInt(listening)+parseInt(speaking)+parseInt(writing))/120*100", dashboard, stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1 {{(parseInt(reading)+parseInt(listening)+parseInt(speaking)+parseInt(writing))}}
        p Total
      span
        i (0-120)
</template>
<script>
export default {
  name: 'CET',
  props: ['reading', 'listening', 'speaking', 'writing']
}
</script>
