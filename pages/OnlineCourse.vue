<template lang="pug">
div
  Table(:data="tableData", :columns="tableColumns", index, stripe, show-header)
  div(:style="{margin: '10px', overflow: 'hidden'}")
    div(:style="{float: 'right'}")
      Page(:total="gotData.length", :current="1", @on-change="changePage", show-total, show-sizer, :page-size="pageSize", :page-size-opts="sizer", @on-page-size-change="pageSizeChange")
</template>
<script>
import {getOnlineCourseData} from '../data/ResumeData'
import {OJ_TABLE_PAGE_SIZE} from '../data/Constant'

export default {
  name: 'OnlineCourse',
  data () {
    return {
      pageNumber: 1,
      sizer: [10],
      pageSize: OJ_TABLE_PAGE_SIZE,
      gotData: [],
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
          title: '课程名',
          key: 'name'
        },
        {
          title: '讲师',
          key: 'instructor'
        },
        {
          title: '平台',
          key: 'platform'
        },
        {
          title: '所属大学',
          key: 'university'
        },
        {
          title: '内容',
          key: 'content',
          render: (h, params) => {
            if (params.row.content.length > 0) {
              return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: '课程涵盖了 ' + params.row.content.length + ' 个主要内容',
                  placement: 'bottom'
                }
              }, [
                h('Tag', params.row.content.length),
                h('div', {
                  slot: 'content'
                }, [
                  h('ul', this.tableData[params.index].content.map(item => {
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
          title: '视频',
          key: 'video',
          render: (h, params) => {
            const row = params.row
            const color = row.video === 'todo' ? 'warning' : row.video === 'done' ? 'success' : row.video === 'aborted' ? 'error' : row.video === 'doing' ? 'primary' : 'disabled'
            const text = row.video === 'todo' ? '计划中' : row.video === 'done' ? '已完成' : row.video === 'aborted' ? '已放弃' : row.video === 'doing' ? '学习中' : '不适用'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '讲义',
          key: 'lecture',
          render: (h, params) => {
            const row = params.row
            const color = row.lecture === 'todo' ? 'warning' : row.lecture === 'done' ? 'success' : row.lecture === 'aborted' ? 'error' : row.lecture === 'doing' ? 'primary' : 'disabled'
            const text = row.lecture === 'todo' ? '计划中' : row.lecture === 'done' ? '已完成' : row.lecture === 'aborted' ? '已放弃' : row.lecture === 'doing' ? '学习中' : '不适用'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '作业',
          key: 'homework',
          render: (h, params) => {
            const row = params.row
            const color = row.homework === 'todo' ? 'warning' : row.homework === 'done' ? 'success' : row.homework === 'aborted' ? 'error' : row.homework === 'doing' ? 'primary' : 'disabled'
            const text = row.homework === 'todo' ? '计划中' : row.homework === 'done' ? '已完成' : row.homework === 'aborted' ? '已放弃' : row.homework === 'doing' ? '学习中' : '不适用'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        }
      ]
    }
  },
  methods: {
    generatePagedTableData (pageNumber) {
      let data = []
      let arr = this.gotData
      for (let index = (pageNumber - 1) * this.pageSize; index < pageNumber * this.pageSize; index++) {
        if (index === this.gotData.length) {
          break
        }
        const row = arr[index]
        data.push({
          name: row['name'],
          platform: row['platform'],
          instructor: row['instructor'],
          university: row['university'],
          video: row['video'],
          homework: row['homework'],
          lecture: row['lecture'],
          content: row['content']
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
    this.$Message.info('记录从 2019 年开始的计算机专业相关学习情况')
    this.gotData = await getOnlineCourseData()
    this.sizer.push(this.gotData.length)
    this.changePage(this.pageNumber)
  }
}
</script>
