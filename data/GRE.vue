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
    i-circle(:percent="(verbal-130)/40*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{verbal}}
        p Verbal
      span
        i (130-170)
    i-circle(:percent="(quantitive-130)/40*100", dashboard )
      div(class="demo-Circle-custom")
       h1 {{quantitive}}
       p Quantitive
      span
        i (130-170)
    i-circle(:percent="(parseInt(verbal)+parseInt(quantitive)-260)/80*100", dashboard, stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1 {{(parseInt(verbal)+parseInt(quantitive))}}
        p Total
      span
        i (260-340)
    i-circle(:percent="writing/6*100", dashboard )
      div(class="demo-Circle-custom")
        h1 {{writing}}
        p Analytical Writing
      span
        i (0-6)
</template>
<script>
export default {
  name: 'CET',
  props: ['verbal', 'quantitive', 'writing']
}
</script>
