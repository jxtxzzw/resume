<template>
  <div>
    <Timeline>
      <TimelineItem v-for="item in study" :key="item.school" color="green">
        <Icon slot="dot" type="ios-trophy"></Icon>
        <p class="school">
          {{ item.school }}
        </p>
        <p class="date">
          <span>{{ item.date }}</span>
          <span>{{ $t('study.till') }}</span>
          <span>{{ item.end == null ? $t('study.now') : item.end }}</span>
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
export default {
  name: 'Study',
  data() {
    return {
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
