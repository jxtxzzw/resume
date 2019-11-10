<template lang="pug">
div
  Table(:data="tableData", :columns="tableColumns", index, stripe, show-header)
  div(:style="{margin: '10px', overflow: 'hidden'}")
    div(:style="{float: 'right'}")
      Page(:total="ProfessionalBookData.length", :current="1", @on-change="changePage", show-total, show-sizer, :page-size="pageSize", :page-size-opts="sizer", @on-page-size-change="pageSizeChange")
</template>
<script>
import {getProfessionalBookData} from '../data/ResumeData'
import {OJ_TABLE_PAGE_SIZE} from '../data/Constant'

export default {
  name: 'ProfessionalBook',
  data () {
    return {
      pageNumber: 1,
      sizer: [10],
      pageSize: OJ_TABLE_PAGE_SIZE,
      ProfessionalBookData: [],
      tableData: [],
      tableColumns: [
        {
          title: '#',
          key: 'idx',
          render: (h, params) => {
            return h('span', params.index + 1 + (this.pageNumber - 1) * this.pageSize)
          }
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = row.status === 'todo' ? 'warning' : row.status === 'done' ? 'success' : row.status === 'aborted' ? 'error' : 'primary'
            const text = row.status === 'todo' ? '计划中' : row.status === 'done' ? '已阅读' : row.status === 'aborted' ? '已放弃' : '阅读中'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '书名',
          key: 'title'
        },
        {
          title: '版本',
          key: 'version'
        },
        {
          title: '作者',
          key: 'author'
        },
        {
          title: '出版社',
          key: 'publisher'
        },
        {
          title: '标签',
          key: 'label',
          render: (h, params) => {
            const label = params.row.label
            const ret = []
            for (const x of label) {
              const color = this.randomColor()
              ret.push(h('Tag', {
                props: {
                  type: 'border',
                  color: color
                }
              }, x))
            }
            return ret
          }
        }
      ]
    }
  },
  methods: {
    generatePagedTableData (pageNumber) {
      let data = []
      let arr = this.ProfessionalBookData
      for (let index = (pageNumber - 1) * this.pageSize; index < pageNumber * this.pageSize; index++) {
        if (index === this.ProfessionalBookData.length) {
          break
        }
        const row = arr[index]
        data.push({
          title: row['title'],
          version: row['version'],
          author: row['author'],
          status: row['status'],
          publisher: row['publisher'],
          label: row['label']
        })
      }
      return data
    },
    changePage (pageNumber) {
      this.pageNumber = pageNumber
      this.tableData = this.generatePagedTableData(this.pageNumber)
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.changePage(this.pageNumber)
    },
    randomColor () {
      const color = ['magenta', 'blue', 'volcano', 'orange', 'gold', 'yellow', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
      const r = Math.floor(Math.random() * color.length)
      return color[r]
    }
  },
  async mounted () {
    this.$Message.info('记录从 2019 年起我读过的计算机专业技能相关的书籍')
    this.ProfessionalBookData = await getProfessionalBookData()
    this.sizer.push(this.ProfessionalBookData.length)
    this.changePage(this.pageNumber)
  }
}
</script>
