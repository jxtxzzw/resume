<template>
  <div>
    <Input
      v-model="keywords"
      search
      clearable
      :placeholder="$t('life.search')"
      :style="{ margin: '10px 0px 20px 0px' }"
      @on-change="onSearchChange"
    />
    <Modal
      v-model="modalVisible"
      footer-hide
      :width="75"
      @on-visible-change="modalVisibleOnChange"
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
          <span>{{ showDate(item) }}</span>
          <span v-if="item.till">
            <span v-if="item.date !== item.till">
              {{
                `${$t('life.till')} ${showDate(item, 'formatted_till', 'till')}`
              }}
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
import { showDate } from 'assets/util'
import * as lifeUtil from 'assets/lifeUtil'

export default {
  name: 'Life',
  data() {
    return {
      showDate,
      life,
      keywords: '',
      selected: null,
      rawData: [],
      showData: [],
      group: [],
      dsu: [],
      selecting: false,
      modalVisible: false,
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
        ? lifeUtil.showChart(this)
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
      this.selected = x
      this.selecting = true
      this.modalVisible = true
      this.showData = []
      this.showData = this.rawData.filter((e) => {
        return this.dsu_same(x, e.event)
      })
      this.renderChart()
    },
    unselect() {
      this.selected = null
      this.selecting = false
      this.modalVisible = false
      this.onSearchChange()
      this.renderChart()
    },
    modalVisibleOnChange(status) {
      if (status) {
        if (!this.oldChart.lifeTimeBar) {
          // 如果打开的时候没有特定图表，那么依然不显示（直接关掉）
          this.modalVisible = false
        }
      } else if (this.oldChart.lifeTimeBar) {
        // 只有是从图表中退出的才需要自动重置，如果本身没有显示图表的话就需要用户点击
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
    onSearchChange() {
      this.showData = []
      if (this.keywords) {
        this.showData = this.rawData.filter((e) => {
          if (e.event && e.event.includes(this.keywords)) {
            return true
          } else if (e.content && e.content.includes(this.keywords)) {
            return true
          } else if (e.date && e.date.includes(this.keywords)) {
            return true
          } else if (e.till && e.till.includes(this.keywords)) {
            return true
          }
          return false
        })
      } else {
        this.showData = [...this.rawData]
      }
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
