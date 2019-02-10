<template lang="pug">
div
  Table(:data="tableData1", :columns="tableColumns1", index, stripe, show-header)
  div(:style="{margin: '10px', overflow: 'hidden'}")
    div(:style="{float: 'right'}")
      Page(:total="100", :current="1", @on-change="changePage")
</template>
<script>
export default {
  name: 'OJ',
  data () {
    return {
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
            const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error'
            const text = row.status === 1 ? 'TODO' : row.status === 2 ? 'Accepted' : 'Failed'

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
                title: '用到了 ' + params.row.portrayal.length + ' 个典型的数据结构',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.portrayal.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData1[params.index].portrayal.map(item => {
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
                title: '用到了 ' + params.row.portrayal.length + ' 个典型的算法',
                placement: 'bottom'
              }
            }, [
              h('Tag', params.row.people.length),
              h('div', {
                slot: 'content'
              }, [
                h('ul', this.tableData1[params.index].people.map(item => {
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
      for (let i = 0; i < 10; i++) {
        data.push({
          oj: 'EOJ',
          problem: Math.floor(Math.random() * 3000 + 1),
          name: 'A+B Problem',
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ['并查集'],
          people: ['深度搜索']
        })
      }
      return data
    },
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
    }
  }
}
</script>
