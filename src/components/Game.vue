<template lang="pug">
  div
    Collapse(accordion)
      Panel( v-for="item in CollapsePanelData", :name="item.name")
        Rate(disabled, v-model="item.rate")
        | {{ item.name }}
        Tooltip(v-if="item.play === true", content="已通关")
          Icon(:style="{margin: ' 0 10px 0 10px'}", type="ios-game-controller-b", size="30", color="#5cb85c")
        Tooltip(v-if="item.cloud === true", content="云玩家（观看通关视频）")
          Icon(:style="{margin: ' 0 10px 0 10px'}", type="ios-cloud-done", size="30", color="#2d8cf0")
        Tag(v-if="item.status==='done'", color='success', :style="{margin: '0 10px 0 10px'}")
          | {{ item.date === null ? '已通关' : '已于' + item.date + '通关' }}
        Tag(v-if="item.status==='doing'", color='primary', :style="{margin: '0 10px 0 10px'}")
          | 游戏中……
        Tag(v-if="item.status==='todo'", color='error', :style="{margin: '0 10px 0 10px'}")
          | 待玩
        Tag(v-for="leb in item.label", :color='randomColor()') {{leb}}
        p(slot="content") {{ item.comment }}
    div(:style="{margin: '10px', overflow: 'hidden'}")
      div(:style="{float: 'right'}")
        Page(:total="GameData.length", :current="1", @on-change="changePage", show-total, :page-size="pageSize")
</template>
<script>
import {getGameData} from '../data/ResumeData'
import {GAME_COLLAPSE_PANEL_PAGE_SIZE} from '../data/Constant'

export default {
  name: 'Game',
  data () {
    return {
      pageSize: GAME_COLLAPSE_PANEL_PAGE_SIZE,
      GameData: [],
      CollapsePanelData: []
    }
  },
  methods: {
    changePage (pageNumber) {
      this.CollapsePanelData = this.generatePagedCollapsePanelData(pageNumber)
    },
    generatePagedCollapsePanelData (pageNumber) {
      let data = []
      let arr = this.GameData
      for (let index = (pageNumber - 1) * this.pageSize; index < pageNumber * this.pageSize; index++) {
        if (index === this.GameData.length) {
          break
        }
        const row = arr[index]
        data.push({
          name: row['name'],
          rate: row['rate'],
          status: row['status'],
          date: row['date'],
          cloud: row['cloud'],
          play: row['play'],
          label: row['label'],
          comment: row['comment']
        })
      }
      return data
    },
    randomColor () {
      const color = ['magenta', 'blue', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
      const r = Math.floor(Math.random() * color.length)
      return color[r]
    }
  },
  async mounted () {
    this.GameData = await getGameData()
    this.changePage(1)
  }
}
</script>
