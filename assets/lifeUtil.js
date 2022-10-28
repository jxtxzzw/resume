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
export function showChart(that) {
  const showData = that.showData
  const selected = that.selected
  if (showData[0].chart) {
    if (showData[0].chart === TIME_BAR) {
      return showLifeTimeBar(that, showData)
    } else if (showData[0].chart === CALENDAR) {
      return showLifeCalendar(that, showData, selected)
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
const ALIVE_CALENDAR_COLOR_LIGHT = '#9bf89b'
const ALIVE_CALENDAR_COLOR_MID = '#31f531'
const ALIVE_CALENDAR_COLOR_DARK = '#007500'
const ALIVE_CALENDAR_COLORS = `${ALIVE_CALENDAR_COLOR_LIGHT}-${ALIVE_CALENDAR_COLOR_MID}-${ALIVE_CALENDAR_COLOR_DARK}`
const HISTORY_CALENDAR_COLOR_LIGHT = '#BAE7FF'
const HISTORY_CALENDAR_COLOR_MID = '#1890FF'
const HISTORY_CALENDAR_COLOR_DARK = '#0050B3'
const HISTORY_CALENDAR_COLORS = `${HISTORY_CALENDAR_COLOR_LIGHT}-${HISTORY_CALENDAR_COLOR_MID}-${HISTORY_CALENDAR_COLOR_DARK}`
const DEFAULT_LINE_WIDTH = 1
const BOARDER_LINE_WIDTH = DEFAULT_LINE_WIDTH * 2
const BOARDER_STROKE = '#404040'
const SELECTED_BOARDER_LINE_WIDTH = DEFAULT_LINE_WIDTH * 2
const SELECTED_BOARDER_STROKE = '#FF0000'

// 计算日历图布局
const CALENDAR_HEIGHT = 128
const ROWS_PER_COL = 7
const VIEW_PADDING_FOR_YEAR_ANNOTATION = 10
const VIEW_PADDING_FOR_WEEK_LABEL = 60
const OFFSET_X_FOR_YEAR_ANNOTATION = 0
const OFFSET_Y_FOR_YEAR_ANNOTATION = -(VIEW_PADDING_FOR_YEAR_ANNOTATION / 2)

/** Calendar 辅助函数 **/
function dateInterval(begin, end = TODAY) {
  return (end - begin) / (86400 * 1000) // 计算有多少天
}

function sameMonth(a, b) {
  return a.substring(5, 7) === b.substring(5, 7)
}

function inSelected(i, startI, endI) {
  return startI <= i && i <= endI
}

/** Calendar 入口 **/
export function showLifeCalendar(that, showData, selected) {
  const { Chart } = that.$g2
  const registerShape = that.$g2.registerShape

  // 找到最小日期，并记录选中事件的位置
  let selectedObj
  let minDateS = '9999-12-31'
  showData.forEach((obj) => {
    if (obj.date < minDateS) {
      minDateS = obj.date
    }
    if (obj.event === selected) {
      selectedObj = obj
    }
  })
  const minYearS = minDateS.substring(0, 4)
  minDateS = `${minYearS}-01-01`
  const minDate = new Date(minDateS)

  const selectedDateStart = selectedObj.date // 选中范围第一天
  const selectedDateEnd =
    selectedObj.till !== null && selectedObj.till !== undefined
      ? selectedObj.till
      : dateFormat(TODAY) // 选中范围最后一天

  const yearIntervals =
    parseInt(dateFormat(TODAY)) - parseInt(minDateS.substring(0, 4)) + 1

  const intervals = dateInterval(minDate)

  // 初始化前缀和，同时缓存日期信息
  // 加 1 是因为 TODAY - TODAY == 0 但是数组长度是 1
  // 另一个 1 是因为最后要做 prefixSum[b + 1]--
  const prefixSum = []
  const dateStringCache = []
  const dateStringIndex = {}
  const mutableDate = new Date(minDateS)
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
  let selectedDateStartI
  let selectedDateEndI
  const monthLineBottom = []
  const monthLineRight = []
  for (let i = 0; i < intervals + 1; i++) {
    const thisDate = dateStringCache[i]

    if (selectedDateStart === thisDate) {
      selectedDateStartI = i // 选中范围开始日期的编号
    }
    if (selectedDateEnd === thisDate) {
      selectedDateEndI = i // 选中范围结束日期的编号
    }

    if (thisDate.substring(5, 7) === '12') {
      // 跳过最后一个月
      monthLineBottom.push(false)
      monthLineRight.push(false)
    } else {
      if (i < intervals) {
        const bottomDate = dateStringCache[i + 1]
        monthLineBottom.push(!sameMonth(thisDate, bottomDate))
      }

      if (i + ROWS_PER_COL - 1 < intervals) {
        const rightDate = dateStringCache[i + ROWS_PER_COL]
        monthLineRight.push(!sameMonth(thisDate, rightDate))
      } else if (i < intervals) {
        const bottomDate = dateStringCache[i + 1]
        monthLineRight.push(!sameMonth(thisDate, bottomDate))
      }
    }
  }

  const data = []
  for (let i = 0; i < yearIntervals; i++) {
    data[i] = []
  }

  let sum = 0
  let day = minDate.getUTCDay() // 只需要算清楚第一天是星期几，后面就直接加 1 然后取余，避免 new Date() 对象

  for (let i = 0; i < intervals; i++) {
    // 准备通用信息
    const s = dateStringCache[i] // 日期字符串
    if (s.substring(5, 10) === '01-01') {
      day = new Date(s).getUTCDay() // 每年刷新一次 day，避免 week 错乱
    }
    const idx = parseInt(s.substring(0, 4)) - parseInt(minYearS) // 放在哪一组 data[year] 中
    sum += prefixSum[i] // 通过前缀和计算出当前格子的计数，即颜色深浅
    const dayValue = Math.floor(day % ROWS_PER_COL) // 星期几
    const weekValue = Math.floor(day / ROWS_PER_COL) // 第几周

    data[idx].push({
      date: s,
      counts: sum,
      month: parseInt(s.substring(5, 7)) - 1, // Date.getMonth() 返回 0 - 11，所以取出日期变成数值以后要减去 1
      day: dayValue,
      week: weekValue,
      bottom: monthLineBottom[i] && dayValue !== 6, // 底部就不需要加线了
      right: monthLineRight[i],
      selectedUp:
        (inSelected(i, selectedDateStartI, selectedDateEndI) &&
          (s === selectedDateStart || dayValue === 0)) || // 选中范围中才有需要画线，第一个和每一个周日（顶部）需要画
        (i === selectedDateEndI + 1 && dayValue !== 0), // 或者是由于绘图顺序的问题，如果 End 后面的一个格子不是顶部，那么要补一次那个格子的 top 即 End 的底部的线
      selectedLeft:
        (inSelected(i, selectedDateStartI, selectedDateEndI) &&
          i < selectedDateStartI + 7) || // 从第一个开始画最多 7 个左侧线条，小于 7 的会被 inSelected 排除，大于 7 的都在内部不画
        (inSelected(i - 7, selectedDateStartI, selectedDateEndI) &&
          i > selectedDateEndI), // End - 7 ~ End 之间这一段有右侧线条（同时 inSelected），这些格子右边一列需要补左侧线条：即它（i）左侧的格子（i - 7）满足 selected 且在 End - 7 ~ End 之间
      selectedBottom:
        inSelected(i, selectedDateStartI, selectedDateEndI) &&
        (s === selectedDateEnd || dayValue === 6), // 选中范围中才有需要画线，最后一个和每一个周六（底部）需要画
      selectedRight:
        inSelected(i, selectedDateStartI, selectedDateEndI) &&
        i > selectedDateEndI - 7, // 同理，倒数画 7 个右侧线条
    })
    day++
  }

  registerShape('polygon', 'boundary-polygon', {
    draw(cfg, container) {
      const group = container.addGroup()
      const points = cfg.points

      group.addShape('path', {
        attrs: {
          path: this.parsePath([
            ['M', points[0].x, points[0].y],
            ['L', points[1].x, points[1].y],
            ['L', points[2].x, points[2].y],
            ['L', points[3].x, points[3].y],
            ['Z'],
          ]),
          stroke: '#fff',
          lineWidth: DEFAULT_LINE_WIDTH,
          fill: cfg.color,
        },
      })

      // 多边形添加右侧边框
      if (cfg.data.right || cfg.data.selectedRight) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[2].x, points[2].y],
              ['L', points[3].x, points[3].y],
            ]),
            lineWidth: cfg.data.selectedRight
              ? SELECTED_BOARDER_LINE_WIDTH
              : BOARDER_LINE_WIDTH,
            stroke: cfg.data.selectedRight
              ? SELECTED_BOARDER_STROKE
              : BOARDER_STROKE,
          },
        })
      }
      // 多边形添加底部边框
      if (cfg.data.bottom || cfg.data.selectedBottom) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[1].x, points[1].y],
              ['L', points[2].x, points[2].y],
            ]),
            lineWidth: cfg.data.selectedBottom
              ? SELECTED_BOARDER_LINE_WIDTH
              : BOARDER_LINE_WIDTH,
            stroke: cfg.data.selectedBottom
              ? SELECTED_BOARDER_STROKE
              : BOARDER_STROKE,
          },
        })
      }

      // 多边形添加左侧边框
      if (cfg.data.selectedLeft) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[0].x, points[0].y],
              ['L', points[1].x, points[1].y],
            ]),
            lineWidth: SELECTED_BOARDER_LINE_WIDTH,
            stroke: SELECTED_BOARDER_STROKE,
          },
        })
      }
      // 多边形添加上侧边框
      if (cfg.data.selectedUp) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[3].x, points[3].y],
              ['L', points[0].x, points[0].y],
            ]),
            lineWidth: SELECTED_BOARDER_LINE_WIDTH,
            stroke: SELECTED_BOARDER_STROKE,
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
    height: CALENDAR_HEIGHT * yearIntervals, // 这里不能用 chartHeight() 了不然图表会太小
  })

  for (let i = 0; i < yearIntervals; i++) {
    const v = chart.createView({
      region: {
        start: {
          x: 0,
          y: i * (1 / yearIntervals),
        },
        end: {
          x: 1,
          y: (i + 1) * (1 / yearIntervals),
        },
      },
      padding: [
        VIEW_PADDING_FOR_YEAR_ANNOTATION,
        0,
        VIEW_PADDING_FOR_YEAR_ANNOTATION,
        VIEW_PADDING_FOR_WEEK_LABEL,
      ],
    })

    // Step 2: 载入数据源
    v.data(data[i])

    // Step 3：创建图形语法，绘制柱状图
    v.scale({
      day: {
        type: 'cat',
        values: [
          that.$t('life.sun'),
          that.$t('life.mon'),
          that.$t('life.tue'),
          that.$t('life.wed'),
          that.$t('life.thu'),
          that.$t('life.fri'),
          that.$t('life.sat'),
        ],
      },
      week: {
        type: 'cat',
      },
      counts: {
        sync: true,
      },
      date: {
        type: 'cat',
      },
    })
    v.axis('week', {
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

    v.annotation().text({
      content: (parseInt(minYearS) + i).toString(10),
      offsetX: OFFSET_X_FOR_YEAR_ANNOTATION,
      offsetY: OFFSET_Y_FOR_YEAR_ANNOTATION,
    })

    v.axis('day', {
      grid: null,
    })

    v.coordinate().reflect('y')

    v.polygon()
      .position('week*day*date')
      .color(
        'counts',
        i === yearIntervals - 1
          ? ALIVE_CALENDAR_COLORS
          : HISTORY_CALENDAR_COLORS
      )
      .shape('boundary-polygon')

    // 经过测试，颜色的深浅会跨 view 计算（即会取整个 chart 的最小最大值来作为最浅最深的颜色）
    // 例如 2021-04-16 有一个计数 1，2022-05-24 有一个计数 2
    // 则所有图表中，2022-05-24 是最深的，2021-04-16 是中等的（尽管在 2021 年，2021-04-16 是唯一一个 1，最大）
  }

  // 这些是面对 chart 的，前面的都是面对 view 的
  chart.tooltip({
    title: 'date',
    showMarkers: false,
  })
  chart.legend(false)

  // Step 4: 渲染图表
  chart.interaction('element-active')
  chart.render()

  return chart
}
