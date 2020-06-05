<template>
  <div>
    <Timeline pending>
      <TimelineItem>
        <p class="keyPoint">
          {{ $t("message.career.microsoft2019") }}
        </p>
        <p class="title">
          {{ $t("message.career.microsoft2019_title") }}
        </p>
        <p class="content">
          {{ $t("message.career.microsoft2019_time") }}
        </p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  name: 'Career',
};
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
