<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :height="fixedHeader ? 250 : ''"
      :size="tableSize"
      :data="fiction"
      :columns="gameColumns"
    ></Table>
  </div>
</template>

<script>
import { fiction } from 'assets/reader'
import ExpandRow from '@/components/ExpandRow'

export default {
  name: 'Fiction',
  data() {
    return {
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: false,
      fixedHeader: false,
      tableSize: 'default',
      fiction,
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
              name: params.row.title,
              comment: params.row.comment,
              label: params.row.label,
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
        title: this.$t('fiction.title'),
        key: 'title',
      })
      columns.push({
        title: this.$t('fiction.status'),
        key: 'status',
        render: (h, params) => {
          let color = ''
          if (params.row.status === 'doing') {
            color = 'primary'
          } else if (params.row.status === 'todo') {
            color = 'error'
          } else if (params.row.status === 'done') {
            color = 'success'
          }
          let message = ''
          if (params.row.status === 'doing') {
            message = this.$t('fiction.doing')
          } else if (params.row.status === 'todo') {
            message = this.$t('fiction.todo')
          } else if (params.row.status === 'done') {
            if (params.row.date === null) {
              message = this.$t('fiction.done')
            } else {
              message = this.$t('fiction.done_at', { date: params.row.date })
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
        title: this.$t('fiction.date'),
        key: 'date',
        sortable: true,
      })
      columns.push({
        title: this.$t('fiction.rate'),
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
      return columns
    },
  },
  mounted() {
    this.$Message.info(this.$t('fiction.message'))
    this.$Message.error({
      content: this.$t('fiction.warning'),
      duration: 5,
      closable: true,
    })
  },
}
</script>
