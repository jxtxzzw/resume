<template lang="pug">
  div
    Timeline(pending)
      TimelineItem
        p(class="keyPoint") 微软
        p(class="title") C+AI Summer Intern 于上海紫竹高新技术开发区
        p(class="content") 自 2019 年 07 月 01 日至 2019 年 09 月 30 日
</template>

<script>
export default {
  name: 'CareerTimeline'
}
</script>

<style scoped>
  .keyPoint{
    color: #2d8cf0;
    font-size: 16px;
    font-weight: bold;
  }
  .title{
    color: #2db7f5;
    font-size: 16px;
    font-weight: bold;
  }
  .content{
    padding-left: 12px;
  }
</style>
