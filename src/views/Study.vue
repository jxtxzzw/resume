<template>
  <div>
    <Timeline pending>
      <TimelineItem>
        <p class="keyPoint">
          {{ $t('message.study.ecnu') }}
        </p>
        <p class="content">
          {{ $t('message.study.ecnu_time') }}
        </p>
      </TimelineItem>
      <TimelineItem>
        <p class="keyPoint">
          {{ $t('message.study.ecnu_ad') }}
        </p>
        <p class="content">
          {{ $t('message.study.ecnu_ad_time') }}
        </p>
      </TimelineItem>
      <TimelineItem>
        <p class="keyPoint">
          {{ $t('message.study.shibei') }}
        </p>
        <p class="content">
          {{ $t('message.study.shibei_time') }}
        </p>
      </TimelineItem>
      <TimelineItem>
        <p class="keyPoint">
          {{ $t('message.study.shibei_ad') }}
        </p>
        <p class="content">
          {{ $t('message.study.shibei_ad_time') }}
        </p>
      </TimelineItem>
      <TimelineItem>
        <p class="keyPoint">
          {{ $t('message.study.tianjiabing') }}
        </p>
        <p class="content">
          {{ $t('message.study.tianjiabing_time') }}
        </p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  name: 'Study',
};
</script>

<style scoped>
  .keyPoint {
    color: #2d8cf0;
    font-size: 16px;
    font-weight: bold;
  }

  .content {
    padding-left: 12px;
  }
</style>
