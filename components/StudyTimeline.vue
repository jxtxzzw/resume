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

<template lang="pug">
  div
    Timeline(pending)
      TimelineItem
        p(class="keyPoint") 华东师范大学
        p(class="content") 自 2016 年 09 月至今
      TimelineItem
        p(class="title") 被 104华东师范大学 80计算机科学与技术 录取
        p(class="content") 2016 年 07 月 25 日
      TimelineItem
        p(class="keyPoint") 上海市市北中学
        p(class="content") 自 2013 年 09 月至 2016 年 06 月
      TimelineItem
        p(class="title") 零志愿被上海市市北中学录取
        p(class="content") 2013 年 01 月
      TimelineItem
        p(class="keyPoint") 上海田家炳中学
        p(class="content") 自 2011 年 09 月至 2013 年 06 月
</template>

<script>
export default {
  name: 'StudyTimeline'
}
</script>
