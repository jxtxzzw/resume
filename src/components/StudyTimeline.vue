<style scoped>
  .title{
    color: #5cb85c;
    font-size: 26px;
    font-weight: bold;
  }
  .content{
    font-size: 16px;
    padding-left: 7px;
  }

</style>

<template lang="pug">
  div
    Timeline(pending)
      TimelineItem
        p(class="title") 华东师范大学
        p(class="content") 2016.09 ~ 至今
      TimelineItem
       p(class="content") 被 104华东师范大学 80计算机科学与技术 录取
      TimelineItem
        p(class="title") 上海市市北中学
        p(class="content") 2013.09 ~ 2016.06
      TimelineItem
        p(class="title") 上海田家炳中学
        p(class="content") 2011.09 ~ 2013.06
</template>

<script>
import CET4 from '../data/CET4'
import CET6 from '../data/CET6'
import CEE from '../data/CEE'

export default {
  name: 'StudyTimeline',
  components: {CET4, CET6, CEE}
}
</script>
