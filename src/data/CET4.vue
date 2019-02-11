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
    i-circle(:percent="100", stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1(:style="{color: '#5cb85c'}") 四级
    i-circle(:percent="90", dashboard )
      div(class="demo-Circle-custom")
       h1 225
       p 听力
      span
        | 满分
        i 248.5
    i-circle(:percent="83", dashboard )
      div(class="demo-Circle-custom")
        h1 206
        p 阅读
      span
        | 满分
        i 248.5
    i-circle(:percent="86", dashboard )
      div(class="demo-Circle-custom")
        h1 183
        p 写作和翻译
      span
        | 满分
        i 213
    i-circle(:percent="86", dashboard, stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1 614
        p 总分
      span
        | 满分
        i 710
</template>
<script>
export default {
  name: 'CET4'
}
</script>
