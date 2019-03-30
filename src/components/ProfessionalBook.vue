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
            const text = row.status === 'todo' ? '待阅读' : row.status === 'done' ? '已阅读' : row.status === 'aborted' ? '已放弃' : '阅读中'
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
          publisher: row['publisher']
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
    }
  },
  async mounted () {
    this.$Message.info('')
    this.ProfessionalBookData = await getProfessionalBookData()
    this.sizer.push(this.ProfessionalBookData.length)
    this.changePage(this.pageNumber)
  }
}
</script>
