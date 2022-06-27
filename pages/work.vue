<template>
  <div>
    <Timeline>
      <TimelineItem v-for="item in work" :key="item.date" color="green">
        <Icon slot="dot" type="ios-trophy"></Icon>
        <p>
          <span class="company"> {{ item.company }} </span>
        </p>
        <p class="date">
          <span>{{ item.date }}</span>
          <span>{{ $t('work.till') }}</span>
          <span>{{ item.end == null ? $t('work.now') : item.end }}</span>
        </p>
        <p v-for="c in item.location.split('\n')" :key="c" class="date">
          {{ c }}
        </p>
        <p>
          <span class="position"> {{ item.position }} </span>
          <span class="department"> {{ item.department }} </span>
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
import { work } from 'assets/reader'
export default {
  name: 'Work',
  data() {
    return {
      work,
    }
  },
}
</script>

<style scoped>
.company {
  color: #2d8cf0;
  font-size: 16px;
  font-weight: bold;
}

.position {
  color: #ff8120;
  font-size: 16px;
  font-weight: bold;
}

.department {
  color: #2a34f6;
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
