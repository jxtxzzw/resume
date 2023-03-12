<template>
  <div>
    <div id="coding-chart" style="width: auto"></div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :height="fixedHeader ? 250 : ''"
      :size="tableSize"
      :data="pagedData"
      :columns="codingColumns"
      :loading="loading"
    />
    <div :style="{ margin: '10px', overflow: 'hidden' }">
      <div :style="{ float: 'right' }">
        <Page
          :total="filteredData.length"
          :current="pageNumber"
          show-total
          show-elevator
          :page-size="pageSize"
          transfer
          @on-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { coding } from 'assets/reader'
import * as codingUtil from '../assets/codingUtil'

export default {
  name: 'Coding',
  data() {
    return {
      showData: undefined,
      pageNumber: 1,
      pageSize: 20,
      loading: true,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: false,
      fixedHeader: false,
      tableSize: 'default',
      pagedData: [],
      filteredData: [],
      coding,
      oldChart: {
        codingChart: undefined,
      },
    }
  },
  computed: {
    total() {
      return this.coding.length
    },
    defined() {
      return this.coding.filter((e) => {
        return !!e.language && e.language !== 'UNKNOWN'
      }).length
    },
    codingColumns() {
      const columns = []
      if (this.showIndex) {
        columns.push({
          type: 'index',
          width: 60,
          align: 'center',
        })
      }
      columns.push({
        title: this.$t('coding.platform'),
        key: 'platform',
        filters: this.platformFilter,
        filterMultiple: true,
        async filterRemote(value, row) {
          await this.prepareFilteredData(value, row)
        },
      })
      columns.push({
        title: this.$t('coding.problem'),
        key: 'problem',
      })
      columns.push({
        title: this.$t('coding.title'),
        key: 'title',
      })
      columns.push({
        title: this.$t('coding.status'),
        key: 'status',
        render: (h, params) => {
          let color = ''
          if (params.row.status === 'todo') {
            color = 'primary'
          } else if (params.row.status === 'attempted') {
            color = 'error'
          } else if (params.row.status === 'accepted') {
            color = 'success'
          }
          let message = ''
          if (params.row.status === 'todo') {
            message = this.$t('coding.todo')
          } else if (params.row.status === 'attempted') {
            message = this.$t('coding.attempted')
          } else if (params.row.status === 'accepted') {
            message = this.$t('coding.accepted')
          }
          const code = params.row.code
          const statusTag = h(
            'Tag',
            {
              props: {
                type: 'dot',
                color,
              },
            },
            message
          )
          if (code == null) {
            return statusTag
          } else {
            return h(
              'Poptip',
              {
                props: {
                  trigger: 'hover',
                  title: this.$t('coding.code_pop', {
                    name: params.row.title,
                  }),
                  placement: 'bottom',
                  transfer: true,
                },
              },
              [
                statusTag,
                h(
                  'div',
                  {
                    slot: 'content',
                    style: {
                      width: '800px',
                    },
                  },
                  [
                    h('codemirror', {
                      class: 'codemirror',
                      ref: 'cmEditor',
                      props: {
                        value: code,
                        options: {
                          tabSize: 4,
                          styleActiveLine: true,
                          lineNumbers: true,
                          line: true,
                          mode: params.row.mode,
                          readOnly: true,
                          theme: 'idea',
                        },
                      },
                    }),
                  ]
                ),
              ]
            )
          }
        },
      })
      columns.push({
        title: this.$t('coding.ds'),
        key: 'ds',
        render: (h, params) => {
          const dsArray =
            params.row.ds == null
              ? []
              : params.row.ds.split(',').filter((x) => x.length > 0)
          if (dsArray.length > 0) {
            return h(
              'Poptip',
              {
                props: {
                  trigger: 'hover',
                  title: this.$t('coding.ds_pop', { num: dsArray.length }),
                  placement: 'bottom',
                  transfer: true,
                },
              },
              [
                h('Tag', dsArray.length),
                h(
                  'div',
                  {
                    slot: 'content',
                  },
                  [
                    h(
                      'ul',
                      dsArray.map((item) =>
                        h(
                          'li',
                          {
                            style: {
                              textAlign: 'center',
                              padding: '4px',
                            },
                          },
                          item
                        )
                      )
                    ),
                  ]
                ),
              ]
            )
          }
          return h('span')
        },
      })
      columns.push({
        title: this.$t('coding.algs'),
        key: 'algs',
        render: (h, params) => {
          const algsArray =
            params.row.algs == null
              ? []
              : params.row.algs.split(',').filter((x) => x.length > 0)
          if (algsArray.length > 0) {
            return h(
              'Poptip',
              {
                props: {
                  trigger: 'hover',
                  title: this.$t('coding.algs_pop', { num: algsArray.length }),
                  placement: 'bottom',
                  transfer: true,
                },
              },
              [
                h('Tag', algsArray.length),
                h(
                  'div',
                  {
                    slot: 'content',
                  },
                  [
                    h(
                      'ul',
                      algsArray.map((item) =>
                        h(
                          'li',
                          {
                            style: {
                              textAlign: 'center',
                              padding: '4px',
                            },
                          },
                          item
                        )
                      )
                    ),
                  ]
                ),
              ]
            )
          }
          return h('span')
        },
      })
      return columns
    },
    platformFilter() {
      const distinctPlatform = new Set(coding.map((item) => item.platform))
      const filter = []
      for (const p of distinctPlatform) {
        filter.push({
          label: p,
          value: p,
        })
      }
      return filter
    },
  },
  async mounted() {
    this.$Message.info(this.$t('coding.message'))
    this.filteredData = [...this.coding]
    this.pageNumber = 1
    await this.changePage(this.pageNumber)
    this.renderChart()
  },
  methods: {
    renderChart() {
      if (this.oldChart.codingChart) {
        this.oldChart.codingChart.destroy()
      }
      this.oldChart.codingChart = codingUtil.showChart(this)
    },
    async changePage(pageNumber) {
      this.loading = true
      this.pageNumber = pageNumber
      this.pagedData = await this.preparePagedData(this.pageNumber)
      this.loading = false
    },
    async prepareFilteredData(value, row) {
      if (value.length === 0) {
        this.filteredData = [...this.coding]
      } else {
        this.filteredData = this.coding.filter((e) => value.includes(e[row]))
      }
      this.pageNumber = 1
      await this.changePage(this.pageNumber)
    },
    async preparePagedData(pageNumber) {
      let reses = []
      let codes = []
      const modes = []
      const data = []
      const arr = this.filteredData
      for (
        let i = (pageNumber - 1) * this.pageSize;
        i < pageNumber * this.pageSize;
        i += 1
      ) {
        if (i === this.filteredData.length) {
          break
        }
        const platform = arr[i].platform
        const problem = arr[i].problem
        const language = arr[i].language
        reses.push(
          fetch(
            `${
              require('@/assets/data/setting.json').src.coding
            }${platform}/${problem}.${language}`
          )
        )
        modes.push(this.getMode(arr[i].language))
        data.push(arr[i])
      }
      reses = await Promise.all(reses)
      for (const res of reses) {
        if (res.ok) {
          codes.push(res.text())
        } else {
          codes.push(null)
        }
      }
      codes = await Promise.all(codes)
      for (let i = 0; i < data.length; i += 1) {
        data[i].code = codes[i]
        data[i].mode = modes[i]
      }
      return data
    },
    getMode(language) {
      let mode = ''
      if (language == null) {
        return mode
      }
      switch (language.toLowerCase()) {
        case 'c':
        case 'c++':
        case 'cc':
        case 'cpp':
          mode = 'text/x-c++src'
          break
        case 'java':
        case 'kotlin':
        case 'kt':
          mode = 'text/x-java'
          break
        case 'python':
        case 'py':
          mode = 'text/x-python'
          break
        case 'javascript':
        case 'js':
        case 'typescript':
        case 'ts':
          mode = 'text/javascript'
          break
        case 'sql':
          mode = 'text/x-sql'
          break
        case 'ml':
        case 'sml':
        case 'ocaml':
          mode = 'text/x-ocaml'
          break
        case 'go':
          mode = 'text/x-go'
          break
        case 'ruby':
        case 'rb':
          mode = 'text/x-ruby'
          break
        case 'racket':
        case 'rkt':
          mode = 'text/x-clojure'
          break
        case 'vue':
          mode = 'text/x-vue'
          break
        default:
          break
      }
      return mode
    },
  },
}
</script>
