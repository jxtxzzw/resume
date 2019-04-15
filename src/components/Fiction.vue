<template lang="pug">
  div
    Collapse(accordion)
      Panel(v-for="item in CollapsePanelData", :key="item.id", :name="item.title")
        Rate(disabled, v-model="item.rate")
        | {{ item.title }}
        Tag(v-if="item.status==='done'", color='success', :style="{margin: '0 10px 0 10px'}")
          | {{ item.date === null ? '已阅读' : '已于' + item.date + '阅读' }}
        Tag(v-if="item.status==='doing'", color='primary', :style="{margin: '0 10px 0 10px'}")
          | 阅读中
        Tag(v-if="item.status==='todo'", color='error', :style="{margin: '0 10px 0 10px'}")
          | 计划中
        Tag(v-for="leb in item.label", :key="leb.id", :color='randomColor()') {{leb}}
        p(slot="content") {{ item.comment }}
    div(:style="{margin: '10px', overflow: 'hidden'}")
      div(:style="{float: 'right'}")
        Page(:total="FictionData.length", :current="1", @on-change="changePage", show-total, :page-size="pageSize")
</template>
<script>
import {getFictionData} from '../data/ResumeData'
import {FICTION_COLLAPSE_PANEL_PAGE_SIZE} from '../data/Constant'

export default {
  name: 'Fiction',
  data () {
    return {
      pageSize: FICTION_COLLAPSE_PANEL_PAGE_SIZE,
      FictionData: [],
      CollapsePanelData: []
    }
  },
  methods: {
    changePage (pageNumber) {
      this.CollapsePanelData = this.generatePagedCollapsePanelData(pageNumber)
    },
    generatePagedCollapsePanelData (pageNumber) {
      let data = []
      let arr = this.FictionData
      for (let index = (pageNumber - 1) * this.pageSize; index < pageNumber * this.pageSize; index++) {
        if (index === this.FictionData.length) {
          break
        }
        const row = arr[index]
        data.push(row)
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
    this.$Message.info('记录 2019 年起我读过的书籍，评分和评价仅代表个人意见')
    this.$Message.error({content: '本页面可能包含剧透内容，请小心阅读', duration: 5, closable: true})
    this.FictionData = await getFictionData()
    this.changePage(1)
  }
}
</script>
