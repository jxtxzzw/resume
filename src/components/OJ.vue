<template lang="pug">
div
  Table(:data="tableData", :columns="tableColumns", index, stripe, show-header)
  div(:style="{margin: '10px', overflow: 'hidden'}")
    div(:style="{float: 'right'}")
      Page(:total="OJData.length", :current="1", @on-change="changePage", show-total, :page-size="pageSize")
</template>
<script>
import {getOJData} from '../data/ResumeData'
import {OJ_TABLE_PAGE_SIZE} from '../data/Constant'

export default {
  name: 'OJ',
  data () {
    return {
      pageSize: OJ_TABLE_PAGE_SIZE,
      OJData: [],
      tableData: [],
      tableColumns: [
        {
          type: 'index'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = row.status === 'TODO' ? 'primary' : row.status === 'Accepted' ? 'success' : 'error'
            const text = row.status === 'TODO' ? 'TODO' : row.status === 'Accepted' ? 'Accepted' : 'Attempted'

            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: 'OJ名称',
          key: 'oj'
        },
        {
          title: '题目编号',
          key: 'problem'
        },
        {
          title: '题目名称',
          key: 'name'
        },
        {
          title: '数据结构',
          key: 'ds',
          render: (h, params) => {
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: '用到了 ' + params.row.ds.length + ' 个典型的数据结构',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.ds.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData[params.index].ds.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item)
                }))
              ])
            ])
          }
        },
        {
          title: '算法',
          key: 'args',
          render: (h, params) => {
            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: '用到了 ' + params.row.args.length + ' 个典型的算法',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.args.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData[params.index].args.map(item => {
                  return h('li', {
                    style: {
                      textAlign: 'center',
                      padding: '4px'
                    }
                  }, item)
                }))
              ])
            ])
          }
        }
      ]
    }
  },
  methods: {
    generatePagedTableData (pageNumber) {
      let data = []
      let arr = this.OJData
      for (let index = (pageNumber - 1) * this.pageSize; index < pageNumber * this.pageSize; index++) {
        if (index === this.OJData.length) {
          break
        }
        const row = arr[index]
        data.push({
          oj: row['oj'],
          problem: row['problem'],
          name: row['name'],
          status: row['status'],
          ds: row['ds'],
          args: row['args']
        })
      }
      return data
    },
    changePage (pageNumber) {
      this.tableData = this.generatePagedTableData(pageNumber)
    }
  },
  async mounted () {
    await getOJData().then((response) => {
      this.OJData = response
      this.tableData = this.generatePagedTableData(1)
    })
  }
}
</script>
