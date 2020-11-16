<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :height="fixedHeader ? 250 : ''"
      :size="tableSize"
      :data="game"
      :columns="gameColumns"
    ></Table>
  </div>
</template>

<script>
import { game } from 'assets/reader'
import ExpandRow from '@/components/ExpandRow'
export default {
  name: 'Game',
  data() {
    return {
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: false,
      fixedHeader: false,
      tableSize: 'default',
      game,
    }
  },
  computed: {
    gameColumns() {
      const columns = []
      columns.push({
        type: 'expand',
        width: 50,
        render: (h, params) => {
          return h(ExpandRow, {
            props: {
              row: params.row,
            },
          })
        },
      })
      if (this.showIndex) {
        columns.push({
          type: 'index',
          width: 60,
          align: 'center',
        })
      }
      columns.push({
        title: this.$t('game.name'),
        key: 'name',
      })
      columns.push({
        title: this.$t('game.status'),
        key: 'status',
        render: (h, params) => {
          let color = ''
          if (params.row.status === 'doing') {
            color = 'primary'
          } else if (params.row.status === 'todo') {
            color = 'error'
          } else if (params.row.status === 'disabled') {
            color = 'disabled'
          } else if (params.row.status === 'done') {
            color = 'success'
          }
          let message = ''
          if (params.row.status === 'doing') {
            message = this.$t('game.doing')
          } else if (params.row.status === 'todo') {
            message = this.$t('game.todo')
          } else if (params.row.status === 'disabled') {
            message = this.$t('game.disabled')
          } else if (params.row.status === 'done') {
            if (params.row.date === null) {
              message = this.$t('game.done')
            } else {
              message = this.$t('game.done_at', { date: params.row.date })
            }
          }
          return h(
            'Tag',
            {
              props: {
                color,
              },
              style: {
                margin: '0 10px 0 10px',
              },
            },
            message
          )
        },
      })
      columns.push({
        title: this.$t('game.date'),
        key: 'date',
        sortable: true,
      })
      columns.push({
        title: this.$t('game.rate'),
        key: 'rate',
        sortable: true,
        render: (h, params) => {
          return h('Rate', {
            props: {
              disabled: true,
              value: parseInt(params.row.rate),
            },
          })
        },
        sortMethod: (a, b, type) => {
          if (type === 'asc') {
            return parseInt(a) - parseInt(b)
          } else if (type === 'desc') {
            return parseInt(b) - parseInt(a)
          }
        },
        filters: [
          {
            label: `${this.$t('game.rate')} ≥ 3`,
            value: 1,
          },
          {
            label: `${this.$t('game.rate')} ≤ 3`,
            value: 2,
          },
        ],
        filterMultiple: false,
        filterMethod(value, row) {
          if (value === 1) {
            return parseInt(row.rate) >= 3
          } else if (value === 2) {
            return parseInt(row.rate) <= 3
          }
        },
      })
      columns.push({
        title: this.$t('game.play'),
        key: 'play',
        width: 110,
        render: (h, params) => {
          if (parseInt(params.row.play) === 1) {
            return h(
              'Tooltip',
              {
                props: {
                  content: this.$t('game.play'),
                },
              },
              [
                h('Icon', {
                  props: {
                    type: 'ios-game-controller-b',
                    size: '30',
                    color: '#5cb85c',
                  },
                  style: {
                    margin: ' 0 10px 0 10px',
                  },
                }),
              ]
            )
          } else {
            return h('span')
          }
        },
      })
      columns.push({
        title: this.$t('game.cloud'),
        key: 'cloud',
        width: 110,
        render: (h, params) => {
          if (parseInt(params.row.cloud) === 1) {
            return h(
              'Tooltip',
              {
                props: {
                  content: this.$t('game.cloud'),
                },
              },
              [
                h('Icon', {
                  props: {
                    type: 'ios-cloud-done',
                    size: '30',
                    color: '#2d8cf0',
                  },
                  style: {
                    margin: ' 0 10px 0 10px',
                  },
                }),
              ]
            )
          } else {
            return h('span')
          }
        },
      })
      columns.push({
        title: this.$t('game.collection'),
        key: 'collection',
        width: 110,
        render: (h, params) => {
          if (parseInt(params.row.collection) === 1) {
            return h(
              'Tooltip',
              {
                props: {
                  content: this.$t('game.collection'),
                },
              },
              [
                h('Icon', {
                  props: {
                    type: 'md-unlock',
                    size: '30',
                    color: '#FAB1B3',
                  },
                  style: {
                    margin: ' 0 10px 0 10px',
                  },
                }),
              ]
            )
          } else {
            return h('span')
          }
        },
      })
      columns.push({
        title: this.$t('game.achievement'),
        key: 'achievement',
        width: 110,
        render: (h, params) => {
          if (parseInt(params.row.achievement) === 1) {
            return h(
              'Tooltip',
              {
                props: {
                  content: this.$t('game.achievement'),
                },
              },
              [
                h('Icon', {
                  props: {
                    type: 'md-trophy',
                    size: '30',
                    color: '#F5A623',
                  },
                  style: {
                    margin: ' 0 10px 0 10px',
                  },
                }),
              ]
            )
          } else {
            return h('span')
          }
        },
      })
      columns.push({
        title: this.$t('game.time'),
        key: 'time',
        width: 110,
        sortable: true,
        sortMethod: (a, b, type) => {
          if (type === 'asc') {
            return parseInt(a) - parseInt(b)
          } else if (type === 'desc') {
            return parseInt(b) - parseInt(a)
          }
        },
      })
      return columns
    },
  },
  mounted() {
    this.$i18n.locale = this.$store.getters['language/getLanguage']
    this.$Message.info(this.$t('game.message'))
    this.$Message.error({
      content: this.$t('game.warning'),
      duration: 5,
      closable: true,
    })
  },
}
</script>
