<template>
  <div>
    <Table
      :border="showBorder"
      :stripe="showStripe"
      :show-header="showHeader"
      :height="fixedHeader ? 250 : ''"
      :size="tableSize"
      :data="media"
      :columns="gameColumns"
    ></Table>
  </div>
</template>

<script>
import { media } from 'assets/reader'
import ExpandRow from '@/components/ExpandRow'
import { randomLabelColor } from 'assets/util'
export default {
  name: 'Media',
  data() {
    return {
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: false,
      fixedHeader: false,
      tableSize: 'default',
      media,
      randomLabelColor,
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
              name: params.row.name,
              comment: params.row.comment,
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
        title: this.$t('media.type'),
        key: 'type',
        render: (h, params) => {
          return h(
            'Tag',
            {
              props: {
                type: 'border',
                color: randomLabelColor(params.row.type),
              },
              style: {
                margin: '0 10px 0 10px',
              },
            },
            [this.$t(`media.${params.row.type}`)]
          )
        },
      })
      columns.push({
        title: this.$t('media.name'),
        key: 'name',
      })
      columns.push({
        title: this.$t('media.status'),
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
            message = this.$t('media.doing')
          } else if (params.row.status === 'todo') {
            message = this.$t('media.todo')
          } else if (params.row.status === 'done') {
            if (params.row.date === null) {
              message = this.$t('media.done')
            } else {
              message = this.$t('media.done_at', { date: params.row.date })
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
        title: this.$t('media.date'),
        key: 'date',
        sortable: true,
      })
      columns.push({
        title: this.$t('media.rate'),
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
            label: `${this.$t('media.rate')} ≥ 3`,
            value: 1,
          },
          {
            label: `${this.$t('media.rate')} ≤ 3`,
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
    this.$Message.info(this.$t('media.message'))
    this.$Message.error({
      content: this.$t('media.warning'),
      duration: 5,
      closable: true,
    })
  },
}
</script>
