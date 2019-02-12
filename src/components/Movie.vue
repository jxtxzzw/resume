<template lang="pug">
  div
    Collapse(accordion)
      Panel( v-for="item in CollapsePanelData", :name="item.name")
        Rate(disabled, v-model="item.rate")
        | {{ item.name }}
        p(slot="content") {{ item.comment }}
    div(:style="{margin: '10px', overflow: 'hidden'}")
      div(:style="{float: 'right'}")
        Page(:total="MovieData.length", :current="1", @on-change="changePage", show-total, :page-size="pageSize")
</template>
<script>
import {MOVIE_COLLAPSE_PANEL_PAGE_SIZE} from '../data/Constant'
export default {
  name: 'Movie',
  data () {
    return {
      pageSize: MOVIE_COLLAPSE_PANEL_PAGE_SIZE,
      MovieData: [{name: '123', rate: 4, comment: 'comment'}, {name: '456', rate: 3, comment: 'comment22222222'}],
      CollapsePanelData: [],
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
        data.push({
          name: row['name'],
          rate: row['rate'],
          comment: row['comment']
        })
      }
      return data
    }
  },
  mounted () {
    // TODO
    this.changePage(1)
  }
}
</script>
