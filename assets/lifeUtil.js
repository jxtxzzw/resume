// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

import { dateFormat } from './util'

/** 通用常量 **/
const CONTAINER = 'life-chart'

const TIME_BAR = 'TIME_BAR'
const CALENDAR = 'CALENDAR'

const TODAY = new Date()

/** 通用辅助函数 **/
function chartHeight() {
  return (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.75
}

/** 总入口 **/
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

/** Time Bar 入口 **/
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

/** Calendar 辅助常量 **/
// G2 着色
const CALENDAR_COLOR_LIGHT = '#BAE7FF'
const CALENDAR_COLOR_MID = '#1890FF'
const CALENDAR_COLOR_DARK = '#0050B3'
const CALENDAR_COLORS = `${CALENDAR_COLOR_LIGHT}-${CALENDAR_COLOR_MID}-${CALENDAR_COLOR_DARK}`
const DEFAULT_LINE_WIDTH = 1
const BOARDER_LINE_WIDTH = DEFAULT_LINE_WIDTH * 2
const BOARDER_STROKE = '#404040'

// 计算日历图布局
const ROWS_PER_COL = 21
const RATIO = 3 // 如果比例过于不协调，就每次加 7 个格子
const STEP = 7

/** Calendar 辅助函数 **/
function dateInterval(begin, end = TODAY) {
  return (end - begin) / (86400 * 1000) // 计算有多少天
}

function sameYear(a, b) {
  return a.substring(0, 4) === b.substring(0, 4)
}

function sameMonth(a, b) {
  return a.substring(5, 7) === b.substring(5, 7)
}

/** Calendar 入口 **/
export function showLifeCalendar(that, showData) {
  const { Chart } = that.$g2
  const registerShape = that.$g2.registerShape

  // 专门有一个日期对象可以随便修改，避免反复 new Date()
  let mutableDate

  // 找到最小日期
  let minDateS = '9999-12-31'
  showData.forEach((obj) => {
    if (obj.date < minDateS) {
      minDateS = obj.date
    }
  })
  const minDate = new Date(minDateS)

  const intervals = dateInterval(minDate)

  // 避免太细的格子，所以如果按缺省 ROWS_PER_COL 会导致列数太多，就要调整
  const rowsPerCol =
    ROWS_PER_COL * ROWS_PER_COL * RATIO >= intervals
      ? ROWS_PER_COL
      : Math.ceil(Math.sqrt(intervals / RATIO) / STEP) * STEP

  // 初始化前缀和，同时缓存日期信息
  // 加 1 是因为 TODAY - TODAY == 0 但是数组长度是 1
  // 另一个 1 是因为最后要做 prefixSum[b + 1]--
  const prefixSum = []
  const dateStringCache = []
  const dateStringIndex = {}
  mutableDate = new Date(minDateS)
  for (let i = 0; i < intervals + 2; i++) {
    prefixSum.push(0)
    const dateString = dateFormat(mutableDate)
    dateStringCache.push(dateString)
    dateStringIndex[dateString] = i
    mutableDate.setDate(mutableDate.getDate() + 1)
  }
  showData.forEach((obj) => {
    prefixSum[dateStringIndex[obj.date] - dateStringIndex[minDateS]]++

    let end = obj.till
    if (end === null || end === undefined) {
      end = dateFormat(TODAY)
    }
    prefixSum[dateStringIndex[end] - dateStringIndex[minDateS] + 1]--
  })

  // 处理分割线
  const monthLineBottom = []
  const monthLineRight = []
  const yearLineBottom = []
  const yearLineRight = []
  for (let i = 0; i < intervals + 1; i++) {
    const thisDate = dateStringCache[i]

    if (i < intervals) {
      const bottomDate = dateStringCache[i + 1]
      monthLineBottom.push(!sameMonth(thisDate, bottomDate))
      yearLineBottom.push(!sameYear(thisDate, bottomDate))
    }

    if (i + rowsPerCol - 1 < intervals) {
      const rightDate = dateStringCache[i + rowsPerCol]
      monthLineRight.push(!sameMonth(thisDate, rightDate))
      yearLineRight.push(!sameYear(thisDate, rightDate))
    } else if (i < intervals) {
      const bottomDate = dateStringCache[i + 1]
      monthLineRight.push(!sameMonth(thisDate, bottomDate))
      yearLineRight.push(!sameYear(thisDate, bottomDate))
    }
  }

  // 如果跨年了就只画年的分界线，如果没有跨年就画月的分界线
  const shouldDrawYearLine =
    yearLineBottom.filter((e) => {
      return e
    }).length > 0 ||
    yearLineRight.filter((e) => {
      return e
    }).length > 0

  const data = []

  // 先强制记录一个 0，以避免所有天都是最小值的情况下，热力图都是最浅颜色的问题
  mutableDate = new Date(minDateS)
  mutableDate = new Date(mutableDate.setDate(mutableDate.getDate() - 1))
  const dummyDateS = dateFormat(mutableDate)
  data.push({
    date: dummyDateS,
    counts: 0,
    month: mutableDate.getMonth(),
    day: 0,
    week: 0,
    bottom: shouldDrawYearLine
      ? !sameYear(dummyDateS, minDateS)
      : !sameMonth(dummyDateS, minDateS),
    right: shouldDrawYearLine
      ? !sameYear(dummyDateS, dateStringCache[rowsPerCol])
      : !sameMonth(dummyDateS, dateStringCache[rowsPerCol]),
  })

  let sum = 0
  let day = 1
  for (let i = 0; i < intervals; i++) {
    const s = dateStringCache[i]
    sum += prefixSum[i]
    data.push({
      date: s,
      counts: sum,
      month: parseInt(s.substring(5, 7)) - 1, // Date.getMonth() 返回 0 - 11，所以取出日期变成数值以后要减去 1
      day: Math.floor(day % rowsPerCol),
      week: Math.floor(day / rowsPerCol),
      bottom: shouldDrawYearLine ? yearLineBottom[i] : monthLineBottom[i],
      right: shouldDrawYearLine ? yearLineRight[i] : monthLineRight[i],
    })
    day++
  }

  registerShape('polygon', 'boundary-polygon', {
    draw(cfg, container) {
      const group = container.addGroup()
      const attrs = {
        stroke: '#fff',
        lineWidth: DEFAULT_LINE_WIDTH,
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

      // 多边形添加右侧边框
      if (cfg.data.right) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[2].x, points[2].y],
              ['L', points[3].x, points[3].y],
            ]),
            lineWidth: BOARDER_LINE_WIDTH * 2,
            stroke: BOARDER_STROKE,
          },
        })
      }
      // 多边形添加底部边框
      if (cfg.data.bottom) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[1].x, points[1].y],
              ['L', points[2].x, points[2].y],
            ]),
            lineWidth: BOARDER_LINE_WIDTH * 2,
            stroke: BOARDER_STROKE,
          },
        })
      }

      return group
    },
  })

  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: CONTAINER,
    autoFit: true,
    height: chartHeight(),
  })

  // Step 2: 载入数据源
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
    .color('counts', CALENDAR_COLORS)
    .shape('boundary-polygon')

  // Step 4: 渲染图表
  chart.interaction('element-active')
  chart.render()

  return chart
}
