// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

import { dateFormat } from './util'

const CONTAINER = 'life-chart'

const TIME_BAR = 'TIME_BAR'
const CALENDAR = 'CALENDAR'

const ROWS_PER_COL = 21

const TODAY = new Date()

export function chartHeight() {
  return (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.75
}

export function showChart(that, showData) {
  if (showData[0].chart) {
    if (showData[0].chart === TIME_BAR) {
      return showLifeTimeBar(that, showData)
    } else if (showData[0].chart === CALENDAR) {
      return showLifeCalendar(that, showData)
    }
  }
  return undefined
}

export function showLifeTimeBar(that, showData) {
  const { Chart } = that.$g2

  showData.forEach((obj) => {
    let start = obj.date
    let end = obj.till
    if (end === null || end === undefined) {
      end = TODAY
    }
    if (start === end) {
      start = `${start} 00:00:00`
      end = `${end} 23:59:59`
    }
    obj.range = [start, end]
  })

  const chart = new Chart({
    container: CONTAINER,
    autoFit: true,
    height: chartHeight(),
  })

  chart.data(showData)

  chart.coordinate().transpose().scale(1, -1)

  chart.scale('range', {
    type: 'time',
  })

  chart.tooltip({
    showMarkers: false,
    title: (title, datum) => datum.content,
  })
  chart.interaction('element-active')
  chart
    .interval()
    .position('event*range')
    .color('event')
    .animate({
      appear: {
        animation: 'scale-in-x',
      },
    })

  chart.render()

  return chart
}

function dateInterval(begin, end = TODAY) {
  return (end - begin) / (86400 * 1000) // 计算有多少天
}

export function showLifeCalendar(that, showData) {
  const { Chart } = that.$g2
  const registerShape = that.$g2.registerShape

  let minDateS = '9999-12-31'
  showData.forEach((obj) => {
    const s = dateFormat(new Date(obj.date))
    if (s < minDateS) {
      minDateS = s
    }
  })
  const minDate = new Date(minDateS)

  const intervals = dateInterval(minDate)

  // 初始化前缀和
  // 加 1 是因为 TODAY - TODAY == 0 但是数组长度是 1
  // 另一个 1 是因为最后要做 prefixSum[b + 1]--
  const prefixSum = []
  for (let i = 0; i < intervals + 2; i++) {
    prefixSum.push(0)
  }
  showData.forEach((obj) => {
    const start = new Date(obj.date)
    prefixSum[dateInterval(minDate, start)]++

    let end = obj.till
    if (end === null || end === undefined) {
      end = TODAY
    } else {
      end = new Date(end)
    }
    prefixSum[dateInterval(minDate, end) + 1]--
  })

  // 避免太细的格子，所以如果按缺省 ROWS_PER_COL 会导致列数太多，就要调整
  const RATIO = 3 // 如果比例过于不协调，就每次加 7 个格子
  const STEP = 7
  const rowsPerCol =
    ROWS_PER_COL * ROWS_PER_COL * RATIO >= intervals
      ? ROWS_PER_COL
      : Math.ceil(Math.sqrt(intervals / RATIO) / STEP) * STEP

  const data = []

  let cursor
  // 先强制记录一个 0，以避免所有天都是最小值的情况下，热力图都是最浅颜色的问题
  cursor = new Date(minDateS)
  cursor = new Date(cursor.setDate(cursor.getDate() - 1))
  data.push({
    date: dateFormat(cursor),
    counts: 0,
    month: cursor.getMonth(),
    day: 0,
    week: 0,
  })

  let sum = 0
  let day = 1
  cursor = new Date(minDateS)
  for (let i = 0; i < intervals; i++) {
    const s = dateFormat(cursor)
    sum += prefixSum[i]
    data.push({
      date: s,
      counts: sum,
      month: cursor.getMonth(),
      day: Math.floor(day % rowsPerCol),
      week: Math.floor(day / rowsPerCol),
    })
    day++
    cursor = new Date(cursor.setDate(cursor.getDate() + 1))
  }

  registerShape('polygon', 'boundary-polygon', {
    draw(cfg, container) {
      const group = container.addGroup()
      const attrs = {
        stroke: '#fff',
        lineWidth: 1,
        fill: cfg.color,
      }
      const points = cfg.points
      const path = [
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y],
        ['L', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
        ['Z'],
      ]
      attrs.path = this.parsePath(path)
      group.addShape('path', {
        attrs,
      })
      return group
    },
  })

  // Step 1: 创建 Chart 对象
  // Step 2: 载入数据源
  const chart = new Chart({
    container: CONTAINER,
    autoFit: true,
    height: chartHeight(),
  })

  chart.data(data)

  // Step 3：创建图形语法，绘制柱状图
  chart.scale({
    day: {
      type: 'cat',
    },
    week: {
      type: 'cat',
    },
    commits: {
      sync: true,
    },
    date: {
      type: 'cat',
    },
  })
  chart.axis('week', {
    position: 'top',
    tickLine: null,
    line: null,
    label: {
      offset: 12,
      style: {
        fontSize: 12,
        fill: '#666',
        textBaseline: 'top',
      },
      formatter: (val) => {
        return ''
      },
    },
  })
  chart.axis('day', {
    grid: null,
    label: {
      offset: 12,
      style: {
        fontSize: 12,
        fill: '#666',
        textBaseline: 'top',
      },
      formatter: (val) => {
        return ''
      },
    },
  })
  chart.legend(false)
  chart.tooltip({
    title: 'date',
    showMarkers: false,
  })
  chart.coordinate().reflect('y')
  chart
    .polygon()
    .position('week*day*date')
    .color('counts', '#BAE7FF-#1890FF-#0050B3')
    .shape('boundary-polygon')

  // Step 4: 渲染图表
  chart.interaction('element-active')
  chart.render()

  return chart
}
