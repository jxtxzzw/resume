<template>
  <div>
    <Modal
      v-model="selecting"
      footer-hide
      :width="75"
      @on-visible-change="chartVisible"
    >
      <div id="life-chart" style="width: auto"></div>
    </Modal>
    <Timeline>
      <TimelineItem v-for="item in showData" :key="item.event" color="green">
        <Icon slot="dot" type="ios-trophy"></Icon>
        <p :id="item.event" class="event">
          {{ item.event }}
          <template v-if="selecting">
            <a class="related" @click="unselect">
              {{ $t('life.unselect') }}
            </a>
          </template>
          <template v-else>
            <a
              v-if="item.previous"
              class="related"
              :href="getAnchor(item.previous)"
            >
              {{ $t('life.previous') }}
            </a>
            <a class="related" @click="select(item.event)">
              {{ $t('life.related') }}
            </a>
          </template>
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
import * as lifeUtil from 'assets/lifeUtil'

export default {
  name: 'Life',
  data() {
    return {
      life,
      rawData: [],
      showData: [],
      group: [],
      dsu: [],
      selecting: false,
      oldChart: {
        lifeTimeBar: undefined,
      },
    }
  },
  mounted() {
    this.rawData = [...life]
    this.showData = [...life]
    this.grouping()
    this.renderChart()
  },
  methods: {
    renderChart() {
      if (this.oldChart.lifeTimeBar) {
        this.oldChart.lifeTimeBar.destroy()
      }
      this.oldChart.lifeTimeBar = this.selecting
        ? lifeUtil.showChart(this, this.showData)
        : undefined
    },
    dsu_init(xs) {
      this.dsu = []
      for (const x of xs) {
        this.dsu[x] = x
      }
    },
    dsu_find(x) {
      return this.dsu[x] === x ? x : this.dsu_find(this.dsu[x])
    },
    dsu_union(x, y) {
      this.dsu[this.dsu_find(x)] = this.dsu_find(y)
    },
    dsu_same(x, y) {
      return this.dsu_find(x) === this.dsu_find(y)
    },
    grouping() {
      const xs = this.rawData.map((e) => {
        return e.event
      })
      this.dsu_init(xs)
      for (const x of this.rawData) {
        if (x.previous) {
          this.dsu_union(x.event, x.previous)
        }
      }
    },
    select(x) {
      this.selecting = true
      this.showData = []
      this.showData = this.rawData.filter((e) => {
        return this.dsu_same(x, e.event)
      })
      this.renderChart()
    },
    unselect() {
      this.selecting = false
      this.showData = []
      this.showData = [...this.rawData]
      this.renderChart()
    },
    chartVisible(status) {
      if (!status) {
        this.unselect()
      }
      window.dispatchEvent(new Event('resize'))
    },
    getAnchor(href) {
      let anchorHref = `${document.location.origin}${document.location.pathname}`
      if (anchorHref[anchorHref.length - 1] === '/') {
        anchorHref = anchorHref.substring(0, anchorHref.length - 1)
      }
      anchorHref += `#${href}`
      return anchorHref
    },
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

.related {
  color: #8fb2f6;
  padding-left: 9px;
  font-size: 9px;
}
</style>
