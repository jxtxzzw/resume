<template lang="pug">
div
  Table(:data="tableData", :columns="tableColumns", index, stripe, show-header)
  div(:style="{margin: '10px', overflow: 'hidden'}")
    div(:style="{float: 'right'}")
      Page(:total="OJData.length", :current="1", @on-change="changePage", show-total, show-sizer, :page-size="pageSize", :page-size-opts="sizer", @on-page-size-change="pageSizeChange")
</template>
<script>
import {getOJData} from '../data/ResumeData'
import {OJ_TABLE_PAGE_SIZE, ACCEPTED_CODING_DIR} from '../data/Constant'

export default {
  name: 'OJ',
  data () {
    return {
      pageNumber: 1,
      sizer: [10],
      pageSize: OJ_TABLE_PAGE_SIZE,
      OJData: [],
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
          // filters: [
          //   {
          //     label: 'Accepted',
          //     value: 'Accepted'
          //   },
          //   {
          //     label: 'Attempted',
          //     value: 'Attempted'
          //   },
          //   {
          //     label: 'TODO',
          //     value: 'TODO'
          //   }
          // ],
          // filterMultiple: false,
          // filterMethod (value, row) {
          //   console.log(row.status)
          //   return row.status === value
          // },
          render: (h, params) => {
            const row = params.row
            const color = row.status === 'TODO' ? 'primary' : row.status === 'Accepted' ? 'success' : 'error'
            const text = row.status === 'TODO' ? 'TODO' : row.status === 'Accepted' ? 'Accepted' : 'Attempted'
            const hyperlink = ACCEPTED_CODING_DIR + params.row.oj + '-' + params.row.name + '.svg'

            return h('Poptip', {
              props: {
                trigger: 'hover',
                title: params.row.oj + '-' + params.row.name,
                placement: 'bottom'
              }
            }, [
              h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text),
              h('div', {
                slot: 'content'
              },
              [
                h('a', {
                  domProps: {
                    href: hyperlink,
                    target: 'blank'
                  }
                }, [
                  h('img', {
                    domProps: {
                      src: hyperlink,
                      width: '400',
                      height: '400',
                    }
                  })
                ])
              ]
              )
            ])
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
            if (params.row.ds.length > 0) {
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
          }
        },
        {
          title: '算法',
          key: 'args',
          render: (h, params) => {
            if (params.row.args.length > 0) {
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
        }
      ]
    }
  },
  methods: {
    generatePagedTableData (pageNumber) {
      let data = []
      let arr = this.OJData
      // for (let index = 0; index < this.OJData.length; index++) {
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
      this.pageNumber = pageNumber
      this.tableData = this.generatePagedTableData(this.pageNumber)
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.changePage(this.pageNumber)
    }
  },
  async mounted () {
    this.$Message.info('记录Online Judge的刷题记录，从大学开始，包括各大主流OJ和MOOC平台，不包括各种程序设计竞赛的题')
    this.OJData = await getOJData()
    // await getOJData().then((response) => {
    //   this.OJData = response
    //   this.changePage(1)
    // })
    this.sizer.push(this.OJData.length)
    // this.pageSize = this.OJData.length
    this.changePage(this.pageNumber)
  }
}
</script>
