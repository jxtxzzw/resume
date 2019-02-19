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
    i-circle(:percent="69", dashboard )
      div(class="demo-Circle-custom")
        h1 104
        p 语文
      span
        | 满分
        i 150
    i-circle(:percent="83", dashboard )
      div(class="demo-Circle-custom")
        h1 124
        p 数学
      span
        | 满分
        i 150
    i-circle(:percent="85", dashboard )
      div(class="demo-Circle-custom")
        h1 128
        p 英语
      span
        | 满分
        i 150
    i-circle(:percent="91", dashboard )
      div(class="demo-Circle-custom")
        h1 136
        p 化学
      span
        | 满分
        i 150
    i-circle(:percent="82", dashboard, stroke-color="#5cb85c" )
      div(class="demo-Circle-custom")
        h1 492
        p 总分
      span
        | 满分
        i 600
</template>
<script>
export default {
  name: 'CEE'
}
</script>
