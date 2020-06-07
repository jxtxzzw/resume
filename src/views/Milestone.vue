<template>
  <div>
    <Tabs type="card" :animated=false :value="distinctPlatform[0]">
      <TabPane
        v-for="platform in distinctPlatform"
        :key="platform"
        :label="platform"
        :name="platform">
        <Timeline pending>
          <TimelineItem
            v-for="item in milestone.filter((x) => x.platform === platform)"
            :key="item.id">
            <p class="keyPoint">
              {{ item.milestone }}
            </p>
            <p class="content">
              {{ item.date }}
            </p>
          </TimelineItem>
        </Timeline>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getMilestoneData } from '../api/data';

export default {
  name: 'Milestone',
  data() {
    return {
      milestone: [],
      distinctPlatform: [],
    };
  },
  async mounted() {
    const milestone = await getMilestoneData();
    this.milestone = milestone.map((item) => {
      if (this.distinctPlatform.filter((platform) => platform === item.platform).length === 0) {
        this.distinctPlatform.push(item.platform);
      }
      return item;
    });
  },
};
</script>
<style scoped>
  .keyPoint{
    color: #2d8cf0;
    font-size: 16px;
    font-weight: bold;
  }
  .content{
    padding-left: 12px;
  }
</style>
