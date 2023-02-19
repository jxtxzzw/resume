<template>
  <div>
    <Alert show-icon>
      <template slot="desc">
        <p>
          {{
            $t('media.summary_count', {
              count_total: getSummary['count_total'],
              count_done: getSummary['count_done'],
              count_doing: getSummary['count_doing'],
              count_todo: getSummary['count_todo'],
            })
          }}
        </p>
        <p>
          {{
            $t('media.summary_type', {
              type_music: getSummary['type_music'],
              type_tv: getSummary['type_tv'],
              type_movie: getSummary['type_movie'],
              type_documentary: getSummary['type_documentary'],
              type_lecture: getSummary['type_lecture'],
              type_anime: getSummary['type_anime'],
              type_show: getSummary['type_show'],
            })
          }}
        </p>
        <p>
          {{
            $t('media.summary_rating', {
              rating_5: getSummary['rating_5'],
            })
          }}
        </p>
      </template>
    </Alert>
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
import { randomLabelColor } from 'assets/util'
import ExpandRow from '@/components/ExpandRow'
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
    getSummary() {
      return {
        count_total: media.length,
        count_done: media.filter((e) => {
          return e.status === 'done'
        }).length,
        count_doing: media.filter((e) => {
          return e.status === 'doing'
        }).length,
        count_todo: media.filter((e) => {
          return e.status === 'todo'
        }).length,
        rating_5: media.filter((e) => {
          return e.rate === 5 || e.rate === '5'
        }).length,
        type_music: media.filter((e) => {
          return e.type === 'music'
        }).length,
        type_tv: media.filter((e) => {
          return e.type === 'tv'
        }).length,
        type_anime: media.filter((e) => {
          return e.type === 'anime'
        }).length,
        type_movie: media.filter((e) => {
          return e.type === 'movie'
        }).length,
        type_documentary: media.filter((e) => {
          return e.type === 'documentary'
        }).length,
        type_lecture: media.filter((e) => {
          return e.type === 'lecture'
        }).length,
        type_show: media.filter((e) => {
          return e.type === 'show'
        }).length,
      }
    },
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
