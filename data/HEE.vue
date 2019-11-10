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
    i-circle(:percent="90", dashboard )
      div(class="demo-Circle-custom")
        h1 135
        p 语文
      span
        | 满分
        i 150
    i-circle(:percent="97", dashboard )
      div(class="demo-Circle-custom")
        h1 145
        p 数学
      span
        | 满分
        i 150
    i-circle(:percent="96", dashboard )
      div(class="demo-Circle-custom")
        h1 143.5
        p 英语
      span
        | 满分
        i 150
    i-circle(:percent="94", dashboard )
      div(class="demo-Circle-custom")
        h1 85
        p 物理
      span
        | 满分
        i 90
    i-circle(:percent="93", dashboard )
      div(class="demo-Circle-custom")
        h1 56
        p 化学
      span
        | 满分
        i 60
    i-circle(:percent="93", dashboard )
      div(class="demo-Circle-custom")
        h1 28
        p 体育
      span
        | 满分
        i 30
    i-circle(:percent="94", dashboard, stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1 592.5
        p 总分
      span
        | 满分
        i 630
</template>
<script>
export default {
  name: 'HEE'
}
</script>
