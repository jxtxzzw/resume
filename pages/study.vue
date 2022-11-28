<template>
  <div>
    <Timeline>
      <TimelineItem v-for="item in study" :key="item.date" color="green">
        <Icon slot="dot" type="ios-trophy"></Icon>
        <p class="school">
          {{ item.school }}
        </p>
        <p class="date">
          <span>{{ showDate(item) }}</span>
          <span>{{ $t('study.till') }}</span>
          <span>{{
            item.end == null
              ? $t('study.now')
              : showDate(item, 'formatted_end', 'end')
          }}</span>
        </p>
        <div v-if="item.content">
          <p v-for="c in item.content.split('\n')" :key="c" class="content">
            {{ c }}
          </p>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
import { study } from 'assets/reader'
import { showDate } from 'assets/util'

export default {
  name: 'Study',
  data() {
    return {
      showDate,
      study,
    }
  },
}
</script>

<style scoped>
.school {
  color: #2d8cf0;
  font-size: 16px;
  font-weight: bold;
}

.date {
  padding-left: 12px;
  margin-top: 6px;
  font-weight: bold;
}

.content {
  color: #b6c3d7;
  padding-left: 12px;
  margin-top: 6px;
  font-size: 12px;
}
</style>
