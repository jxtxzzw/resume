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
import GamePlatformDefaultIcon from '@/components/IconSVG/GamePlatformDefaultIcon'
import GamePlatformAndroidIcon from '@/components/IconSVG/GamePlatformAndroidIcon'
import GamePlatformIOSIcon from '@/components/IconSVG/GamePlatformIOSIcon'
import GamePlatformPCIcon from '@/components/IconSVG/GamePlatformPCIcon'
import GamePlatformNSIcon from '@/components/IconSVG/GamePlatformNSIcon'
import GamePlatformPSIcon from '@/components/IconSVG/GamePlatformPSIcon'
import GamePlatformXboxIcon from '@/components/IconSVG/GamePlatformXboxIcon'
import GamePlatformOriginIcon from '@/components/IconSVG/GamePlatformOriginIcon'
import GamePlatformSteamIcon from '@/components/IconSVG/GamePlatformSteamIcon'
import GamePlatformBattleNetIcon from '@/components/IconSVG/GamePlatformBattleNetIcon'
import GamePlatformUPlayIcon from '@/components/IconSVG/GamePlatformUPlayIcon'
import GamePlatformEpicIcon from '@/components/IconSVG/GamePlatformEpicIcon'
import GamePlatformWiiUIcon from '@/components/IconSVG/GamePlatformWiiUIcon'

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
              name: params.row.name,
              comment: params.row.comment,
              label: params.row.label,
            },
          })
        },
      })
      if (this.showIndex) {
        columns.push({
          type: 'index',
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
            color = 'warning'
          } else if (params.row.status === 'disabled') {
            color = '#808695'
          } else if (params.row.status === 'done') {
            color = 'success'
          } else if (params.row.status === 'aborted') {
            color = 'error'
          } else if (params.row.status === 'returning') {
            color = '#2db7f5'
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
          } else if (params.row.status === 'aborted') {
            message = this.$t('game.aborted')
          } else if (params.row.status === 'returning') {
            message = this.$t('game.returning')
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
        render: (h, params) => {
          if (params.row.play) {
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
        render: (h, params) => {
          if (params.row.cloud) {
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
        title: this.$t('game.platform'),
        key: 'platform',
        render: (h, params) => {
          const platform = params.row.platform
          let platformIcon
          let platformTip
          switch (platform) {
            case 'Android':
              platformIcon = h(GamePlatformAndroidIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'iOS':
              platformIcon = h(GamePlatformIOSIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'PC':
              platformIcon = h(GamePlatformPCIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'NS':
              platformIcon = h(GamePlatformNSIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'PS':
              platformIcon = h(GamePlatformPSIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'Xbox':
              platformIcon = h(GamePlatformXboxIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'Steam':
              platformIcon = h(GamePlatformSteamIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'BattleNet':
              platformIcon = h(GamePlatformBattleNetIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'Origin':
              platformIcon = h(GamePlatformOriginIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'UPlay':
              platformIcon = h(GamePlatformUPlayIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'Epic':
              platformIcon = h(GamePlatformEpicIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            case 'WiiU':
              platformIcon = h(GamePlatformWiiUIcon)
              platformTip = this.$t(`game.${platform}`)
              break
            default:
              platformIcon = h(GamePlatformDefaultIcon)
              platformTip = this.$t('game.default')
          }
          return h(
            'Tooltip',
            {
              props: {
                content: platformTip,
              },
            },
            [platformIcon]
          )
        },
      })
      columns.push({
        title: this.$t('game.collection'),
        key: 'collection',
        render: (h, params) => {
          if (params.row.collection) {
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
        render: (h, params) => {
          if (params.row.achievement) {
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
        sortable: true,
        sortMethod: (a, b, type) => {
          if (a === null) {
            a = 0.0
          }
          if (b === null) {
            b = 0.0
          }
          if (type === 'asc') {
            return parseFloat(a) - parseFloat(b)
          } else if (type === 'desc') {
            return parseFloat(b) - parseFloat(a)
          }
        },
      })
      return columns
    },
  },
  mounted() {
    this.$Message.info(this.$t('game.message'))
    this.$Message.error({
      content: this.$t('game.warning'),
      duration: 5,
      closable: true,
    })
  },
}
</script>
