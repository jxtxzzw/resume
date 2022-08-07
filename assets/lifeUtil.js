// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

const CONTAINER = 'life-chart'

const TIME_BAR = 'TIME_BAR'
const CALENDAR = 'CALENDAR'

const ROWS_PER_COL = 21

export function chartHeight() {
  return (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.75
}

function dateFormat(date, fmt = 'YYYY-mm-dd') {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
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
      end = new Date()
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
    nice: true,
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

export function showLifeCalendar(that, showData) {
  const { Chart } = that.$g2
  const registerShape = that.$g2.registerShape

  const commits = {}
  let minDate = '9999-12-31'

  showData.forEach((obj) => {
    const start = obj.date
    let end = obj.till
    if (end === null || end === undefined) {
      end = new Date()
    } else {
      end = new Date(end)
    }
    let cursor = new Date(start)
    while (cursor <= end) {
      const s = dateFormat(cursor)
      if (s < minDate) {
        minDate = s
      }
      if (!(s in commits)) {
        commits[s] = 0
      }
      commits[s] += 1
      // 加一天
      cursor = new Date(cursor.setDate(cursor.getDate() + 1))
    }
  })

  const data = []
  let first = true
  let cursor = new Date(minDate)
  const today = new Date()
  let day = 0

  while (cursor <= today) {
    const s = dateFormat(cursor)
    // day 是一周的第几天，针对当月来说
    // week 是第几周，针对所有数据来说，相当于图表的第几列
    if (first) {
      // 先强制 push 一个 0 次提交的，以避免所有天都有 commit 的情况下，热力图都是最浅颜色的问题
      cursor = new Date(cursor.setDate(cursor.getDate() - 1))
      data.push({
        date: dateFormat(cursor),
        commits: 0,
        month: cursor.getMonth(),
        day: Math.floor(day % ROWS_PER_COL),
        week: Math.floor(day / ROWS_PER_COL),
      })
      day++
      cursor = new Date(cursor.setDate(cursor.getDate() + 1))
      first = false
    }
    data.push({
      date: s,
      // 获取相同日期有多少个，就是当日打卡次数
      commits: s in commits ? commits[s] : 0,
      month: cursor.getMonth(),
      day: Math.floor(day % ROWS_PER_COL),
      week: Math.floor(day / ROWS_PER_COL),
    })
    // 加一天
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

      if (cfg.data.lastWeek) {
        const linePath = [
          ['M', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
        ]
        // 最后一周的多边形添加右侧边框
        group.addShape('path', {
          attrs: {
            path: this.parsePath(linePath),
            lineWidth: 4,
            stroke: '#404040',
          },
        })
        if (cfg.data.lastDay) {
          group.addShape('path', {
            attrs: {
              path: this.parsePath([
                ['M', points[1].x, points[1].y],
                ['L', points[2].x, points[2].y],
              ]),
              lineWidth: 4,
              stroke: '#404040',
            },
          })
        }
      }

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
    .color('commits', '#BAE7FF-#1890FF-#0050B3')
    .shape('boundary-polygon')

  // Step 4: 渲染图表
  chart.interaction('element-active')
  chart.render()

  return chart
}
