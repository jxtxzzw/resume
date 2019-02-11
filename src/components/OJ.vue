<template lang="pug">
div
  Table(:data="tableData1", :columns="tableColumns1", index, stripe, show-header)
  div(:style="{margin: '10px', overflow: 'hidden'}")
    div(:style="{float: 'right'}")
      Page(:total="100", :current="1", @on-change="changePage")
</template>
<script>
import {getOJData} from '../data/ResumeData'

export default {
  name: 'OJ',
  data () {
    return {
      OJData: [],
      tableData1: this.mockTableData1(),
      tableColumns1: [
        {
          type: 'index'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = row.status === 'TODO' ? 'primary' : row.status === 'Accepted' ? 'success' : 'error'
            const text = row.status === 'TODO' ? 'TODO' : row.status === 'Accepted' ? 'Accepted' : 'Failed'

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
          key: 'database',
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
                h('ul', this.tableData1[params.index].ds.map(item => {
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
                h('ul', this.tableData1[params.index].args.map(item => {
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
    mockTableData1 () {
      let data = []
      let arr = this.OJData
      for (const index in arr) {
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
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
    }
  },
  async mounted () {
    await getOJData().then((response) => {
      this.OJData = response
      this.tableData1 = this.mockTableData1()
    })
  }
}
</script>
