<template>
  <div>
    <Tabs type="card" :animated="false" :value="distinctPlatform[0]">
      <TabPane
        v-for="platform in distinctPlatform"
        :key="platform"
        :label="platform"
        :name="platform"
      >
        <Timeline pending>
          <TimelineItem
            v-for="item in milestone.filter((x) => x.platform === platform)"
            :key="item.platform"
            color="green"
          >
            <Icon slot="dot" type="ios-trophy"></Icon>
            <p class="time">
              {{ item.date }}
            </p>
            <p class="content">
              {{ item.milestone }}
            </p>
          </TimelineItem>
          <TimelineItem> {{ $t('milestone.pending') }} </TimelineItem>
        </Timeline>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { milestone } from 'assets/reader'

export default {
  name: 'Milestone',
  data() {
    return {
      milestone,
      distinctPlatform: [],
    }
  },
  mounted() {
    this.$i18n.locale = this.$store.getters['language/getLanguage']
    this.milestone = milestone.map((item) => {
      if (!this.distinctPlatform.includes(item.platform)) {
        this.distinctPlatform.push(item.platform)
      }
      return item
    })
    this.milestone.sort((a, b) => {
      return new Date(a) - new Date(b)
    })
  },
}
</script>
<style scoped>
.time {
  color: #2d8cf0;
  font-size: 16px;
  font-weight: bold;
}
.content {
  padding-left: 12px;
  font-size: 14px;
  font-weight: bold;
}
</style>
