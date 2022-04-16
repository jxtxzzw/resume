<template>
  <div>
    <Timeline>
      <TimelineItem v-for="item in life" :key="item.event" color="green">
        <Icon slot="dot" type="ios-trophy"></Icon>
        <p class="event">
          {{ item.event }}
        </p>
        <p class="date">
          <span>{{ item.date }}</span>
          <span v-if="item.till">
            <span v-if="item.date !== item.till">
              {{ `${$t('life.till')} ${item.till}` }}
            </span>
          </span>
          <span v-else>
            {{ `${$t('life.till')} ${$t('life.now')}` }}
          </span>
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
import { life } from 'assets/reader'
export default {
  name: 'Life',
  data() {
    return {
      life,
    }
  },
}
</script>

<style scoped>
.event {
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
