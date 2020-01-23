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

<template>
  <div>
    <Tabs type="card" :value="distinctPlatform[0]">
      <TabPane v-for="platform in distinctPlatform" :key="platform" :label="platform" :name="platform">
        <Timeline pending>
          <TimelineItem v-for="item in milestone" :key="item.id" v-if="item.platform === platform">
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
  import {getMilestoneData} from '../data/ResumeData'

  export default {
    name: 'Milestone',
    data () {
      return {
        milestone: [],
        distinctPlatform: []
      }
    },
    async mounted () {
      const milestone = await getMilestoneData()
      for (const item of milestone) {
        let contains = false
        for (const platform of this.distinctPlatform) {
          if (platform === item['platform']) {
            contains = true
            break
          }
        }
        if (!contains) {
          this.distinctPlatform.push(item['platform'])
        }
        this.milestone.push({
          id: item['id'],
          date: item['date'],
          platform: item['platform'],
          milestone: item['milestone']
        })
      }
    }
  }
</script>
