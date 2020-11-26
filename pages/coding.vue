<template>
  <div>
    <div v-if="loading">
      <Spin size="large" fix>
        {{ $t('coding.loading') }}
        <Progress
          :percent="progressPercent"
          :stroke-color="['#108ee9', '#87d068']"
        />
      </Spin>
    </div>
    <Table
      v-else
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :height="fixedHeader ? 250 : ''"
      :size="tableSize"
      :data="coding"
      :columns="codingColumns"
    ></Table>
  </div>
</template>

<script>
import { coding } from 'assets/reader'
export default {
  name: 'Coding',
  data() {
    return {
      loading: true,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: false,
      fixedHeader: false,
      tableSize: 'default',
      codes: {},
      progressPercent: 0,
      coding,
    }
  },
  computed: {
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
        filterMethod(value, row) {
          return value === row.platform
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
        filters: [
          {
            label: this.$t('coding.attempted'),
            value: 'attempted',
          },
          {
            label: this.$t('coding.todo'),
            value: 'todo',
          },
          {
            label: this.$t('coding.accepted'),
            value: 'accepted',
          },
        ],
        filterMultiple: true,
        filterMethod(value, row) {
          return value === row.status
        },
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
          const code = this.getCode(params.row.platform, params.row.problem)
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
                          mode: this.getMode(params.row.language),
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
    this.$i18n.locale = this.$store.getters['language/getLanguage']
    this.$Message.info(this.$t('coding.message'))
    await this.allCodes()
  },
  methods: {
    async allCodes() {
      const total = coding.length
      let count = 0
      for (const item of coding) {
        const platform = item.platform
        const problem = item.problem
        const language = item.language
        let code = null
        try {
          const res = await fetch(
            `${
              require('@/assets/data/setting.json').src.coding
            }${platform}/${problem}.${language}`
          )
          if (res.ok) {
            code = await res.text()
          }
        } catch (e) {
          code = null
        }
        const key = '' + platform + problem
        this.codes[key] = code
        count = count + 1
        this.progressPercent = (count / total) * 100
      }
      this.loading = false
    },
    getCode(platform, problem) {
      const key = '' + platform + problem
      return this.codes[key]
    },
    getMode(language) {
      let mode = ''
      switch (language.toLowerCase()) {
        case 'c':
        case 'c++':
          mode = 'text/x-c++src'
          break
        case 'java':
        case 'kotlin':
          mode = 'text/x-java'
          break
        case 'python':
          mode = 'text/x-python'
          break
        case 'javascript':
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
        default:
          break
      }
      return mode
    },
  },
}
</script>
