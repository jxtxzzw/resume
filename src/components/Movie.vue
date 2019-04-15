<template lang="pug">
  div
    Collapse(accordion)
      Panel( v-for="item in CollapsePanelData", :key="item.id", :name="item.name")
        Rate(disabled, v-model="item.rate")
        | {{ item.name }}
        Tag(v-if="item.status==='done'", color='success', :style="{margin: '0 10px 0 10px'}")
          | {{ item.date === null ? '已观看' : '已于' + item.date + '观看' }}
        Tag(v-if="item.status==='doing'", color='primary', :style="{margin: '0 10px 0 10px'}")
          | 观看中
        Tag(v-if="item.status==='todo'", color='error', :style="{margin: '0 10px 0 10px'}")
          | 计划中
        Tag(:color='getTagColor(item.type)', :style="{margin: '0 10px 0 10px'}") {{item.type}}
        p(slot="content") {{ item.comment }}
    div(:style="{margin: '10px', overflow: 'hidden'}")
      div(:style="{float: 'right'}")
        Page(:total="MovieData.length", :current="1", @on-change="changePage", show-total, :page-size="pageSize")
</template>
<script>
import {MOVIE_COLLAPSE_PANEL_PAGE_SIZE} from '../data/Constant'
import {getMovieData} from '../data/ResumeData'

export default {
  name: 'Movie',
  data () {
    return {
      pageSize: MOVIE_COLLAPSE_PANEL_PAGE_SIZE,
      MovieData: [],
      CollapsePanelData: []
    }
  },
  methods: {
    changePage (pageNumber) {
      this.CollapsePanelData = this.generatePagedCollapsePanelData(pageNumber)
    },
    generatePagedCollapsePanelData (pageNumber) {
      let data = []
      let arr = this.MovieData
      for (let index = (pageNumber - 1) * this.pageSize; index < pageNumber * this.pageSize; index++) {
        if (index === this.MovieData.length) {
          break
        }
        const row = arr[index]
        data.push(row)
      }
      return data
    },
    getTagColor (type) {
      let color = ''
      switch (type) {
        case '电影':
          color = 'green'
          break
        case '电视剧':
          color = 'blue'
          break
        case '动漫':
          color = 'pink'
          break
        case '音乐':
          color = 'volcano'
          break
        default:
          color = 'purple'
          break
      }
      return color
    }
  },
  async mounted () {
    this.$Message.info('记录 2019 年起的电影、电视剧、动漫观看情况，评分和评价仅代表个人意见')
    this.$Message.error({content: '本页面可能包含剧透内容，请小心阅读', duration: 5, closable: true})
    this.MovieData = await getMovieData()
    this.changePage(1)
  }
}
</script>
