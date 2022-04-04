<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="introduction.nick_name"
      :sub-title="introduction.motto"
    >
      <template slot="footer">
        <a-divider> {{ $t('navigation.milestone') }} </a-divider>
        <a-tabs default-active-key="0">
          <a-tab-pane
            v-for="(platform, index) in distinctPlatform"
            :key="index"
            :tab="platform"
          >
            <div style="margin-top: 20px"></div>
            <a-timeline :pending="$t('milestone.pending')" :reverse="true">
              <a-timeline-item
                v-for="item in milestone.filter((x) => x.platform === platform)"
                :key="item.id"
              >
                <p class="time">
                  {{ item.date }}
                </p>
                <p class="content">
                  {{ item.milestone }}
                </p>
              </a-timeline-item>
            </a-timeline>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-page-header>
  </div>
</template>

<script>
import { introduction, milestone } from 'assets/reader'
export default {
  name: 'Introduction',
  data() {
    return {
      introduction,
      milestone,
      distinctPlatform: [],
    }
  },
  mounted() {
    this.milestone = milestone.map((item) => {
      if (!this.distinctPlatform.includes(item.platform)) {
        this.distinctPlatform.push(item.platform)
      }
      return item
    })
    this.distinctPlatform.sort((a, b) => {
      const A = this.milestone.filter((e) => e.platform === a).length
      const B = this.milestone.filter((e) => e.platform === b).length
      return B - A
    })
    this.milestone.sort((a, b) => {
      return new Date(a) - new Date(b)
    })
  },
  methods: {
    maskedContent(content) {
      return content == null ? this.$t('introduction.secret') : content
    },
  },
}
</script>

<style>
tr:last-child td {
  padding-bottom: 0;
}
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
