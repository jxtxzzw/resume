// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

import { dateFormat } from './util'

function getDataForYearAndType(rawData, withCurrency = false) {
  const dict = {}
  for (const x of rawData) {
    const year = x.year
    const amount = parseFloat(x.amount)
    const type = x.type
    if (!(year in dict)) {
      dict[year] = {}
    }
    if (!(type in dict[year])) {
      if (withCurrency) {
        dict[year][type] = {}
      } else {
        dict[year][type] = 0
      }
    }
    const currencyWeight = parseFloat(x.currency_weight)
    if (withCurrency) {
      const currency = x.currency
      if (!(currency in dict[year][type])) {
        dict[year][type][currency] = {
          amount: 0.0,
          weightedAmount: 0.0,
        }
      }
      dict[year][type][currency].amount += amount
      dict[year][type][currency].weightedAmount += amount * currencyWeight
    } else {
      dict[year][type] += amount * currencyWeight
    }
  }

  const data = []
  for (const year in dict) {
    for (const type in dict[year]) {
      if (withCurrency) {
        for (const currency in dict[year][type]) {
          data.push({
            year,
            type,
            currency,
            amount: dict[year][type][currency].amount,
            weightedAmount: dict[year][type][currency].weightedAmount,
          })
        }
      } else {
        data.push({
          year,
          type,
          amount: dict[year][type],
        })
      }
    }
  }
  return data
}

export function chartHeight() {
  return (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.75
}

export function renderChartForYearAndType(
  that,
  rawData,
  containerID = 'container',
  colors = [
    '#74CBED',
    '#FF6B3B',
    '#247FEA',
    '#F6C022',
    '#AE0025',
    '#7666F9',
    '#9967BD',
    '#E19348',
    '#FF9EC6',
    '#76523B',
    '#585853',
    '#6395F9',
    '#62DAAB',
  ],
  withCurrency = false
) {
  const { Chart } = that.$g2

  const data = getDataForYearAndType(rawData, withCurrency)

  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: containerID,
    autoFit: true,
    height: chartHeight(),
  })

  // Step 2: 载入数据源
  chart.data(data)

  // Step 3: 创建图形语法，绘制柱状图

  // 开启缩略轴组件
  chart.option('slider', {
    // 组件高度
    height: 30,
    // 滑块背景趋势图配置
    trendCfg: {
      // 	趋势图曲线是否圆滑
      smooth: true,
      // 	趋势图是否使用面积图
      isArea: true,
    },
  })

  chart.scale(withCurrency ? 'weightedAmount' : 'amount', {
    alias: '金额',
    nice: true,
    formatter: (val) => {
      val = parseFloat(parseFloat(val).toFixed(2))
      return val
    },
  })

  chart.axis(withCurrency ? 'weightedAmount' : 'amount', {
    title: {
      offset: 80,
      style: {
        fill: '#aaaaaa',
      },
    },
  })

  chart.scale('year', {
    nice: true,
  })

  chart.axis('year', {
    tickLine: null,
  })

  chart.tooltip({
    shared: false,
    showMarkers: true,
    showTitle: true,
  })

  chart.interaction('active-region')
  chart.interaction('element-highlight-by-color')
  chart.interaction('legend-highlight')
  chart.interaction('axis-label-highlight')

  let adjustCfg
  if (withCurrency) {
    adjustCfg = [
      {
        type: 'dodge',
        dodgeBy: 'currency',
        marginRatio: 0,
      },
      {
        type: 'stack',
      },
    ]
  } else {
    adjustCfg = 'stack'
  }

  chart
    .interval()
    .adjust(adjustCfg)
    .position(`year*${withCurrency ? 'weightedAmount' : 'amount'}`)
    .color('type', colors)
    .label('value', () => {
      return {
        position: 'middle',
        offset: 0,
        content: (originData) => {
          const amount = parseFloat(parseFloat(originData.amount).toFixed(2))
          if (withCurrency) {
            const weightedAmount = parseFloat(
              parseFloat(originData.weightedAmount).toFixed(2)
            )
            return `${originData.currency} ${amount} \n (${weightedAmount})`
          } else {
            return `(${amount})`
          }
        },
        style: {
          stroke: '#fff',
        },
      }
    })

  // Step 4: 渲染图表
  chart.render()
  return chart
}

function getDataForBasicCategory(
  rawData,
  rawAdvancedData,
  withCurrency = false
) {
  const dict = {}
  let total = 0
  for (const x of rawData) {
    const category = x.category
    const amount = parseFloat(x.amount)
    if (!(category in dict)) {
      if (withCurrency) {
        dict[category] = {}
      } else {
        dict[category] = 0
      }
    }
    if (amount <= 0) {
      continue
    }
    const currencyWeight = parseFloat(x.currency_weight)
    if (withCurrency) {
      const currency = x.currency
      if (!(currency in dict[category])) {
        dict[category][currency] = {
          amount: 0,
          weightedAmount: 0,
        }
      }
      dict[category][currency].amount += amount
      dict[category][currency].weightedAmount += amount * currencyWeight
    } else {
      dict[category] += amount * currencyWeight
      total += amount * currencyWeight
    }
  }

  for (const x of rawAdvancedData) {
    const category = '被动收入' // TODO: HARD_CODED
    const amount = parseFloat(x.amount)
    if (!(category in dict)) {
      if (withCurrency) {
        dict[category] = {}
      } else {
        dict[category] = 0
      }
    }
    if (amount <= 0) {
      continue
    }
    const currencyWeight = parseFloat(x.currency_weight)
    if (withCurrency) {
      const currency = x.currency
      if (!(currency in dict[category])) {
        dict[category][currency] = {
          amount: 0,
          weightedAmount: 0,
        }
      }
      dict[category][currency].amount += amount
      dict[category][currency].weightedAmount += amount * currencyWeight
    } else {
      dict[category] += amount * currencyWeight
      total += amount * currencyWeight
    }
  }

  if (withCurrency) {
    const currencies = []
    const leftData = [] // 先分类再货币
    const rightData = [] // 先货币再分类
    for (const category in dict) {
      for (const currency in dict[category]) {
        if (!currencies.includes(currency)) {
          currencies.push(currency)
        }
        const amount = dict[category][currency].amount
        const weightedAmount = dict[category][currency].weightedAmount
        if (amount > 0) {
          leftData.push({
            category,
            amount,
            weightedAmount,
            currency: `${category} - ${currency}`,
          })
        }
      }
    }
    for (const currency of currencies) {
      for (const category in dict) {
        if (dict[category][currency]) {
          const amount = dict[category][currency].amount
          const weightedAmount = dict[category][currency].weightedAmount
          if (amount > 0) {
            rightData.push({
              category: `${currency} - ${category}`,
              amount,
              weightedAmount,
              currency,
            })
          }
        }
      }
    }
    return [leftData, rightData]
  } else {
    const data = []
    for (const category in dict) {
      const amount = dict[category]
      if (amount > 0) {
        data.push({
          category,
          amount,
          percent: amount / total,
        })
      }
    }
    return data
  }
}

export function renderChartForBasicCategory(
  that,
  rawData,
  rawAdvancedData,
  withCurrency = false
) {
  const { Chart } = that.$g2
  const { DataView } = that.$dataset

  const chart = new Chart({
    container: 'basic-category',
    autoFit: true,
    height: chartHeight(),
  })

  if (!withCurrency) {
    // 不进行多币种处理，就只需要画一个图
    // 获取数据
    const data = getDataForBasicCategory(rawData, rawAdvancedData, withCurrency)

    // 通过 DataSet 计算百分比
    const dv = new DataView()
    dv.source(data).transform({
      type: 'percent',
      field: 'amount', // 只有 amount
      dimension: 'category',
      as: 'percent',
    })

    chart.data(dv.rows)

    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('category')
      .label('percent', function (val) {
        const offset = val > 0.02 ? -30 : 30
        return {
          offset,
          content: (data) => {
            return `${data.category}: ${parseFloat(data.percent * 100).toFixed(
              2
            )}%`
          },
        }
      })

    chart.scale({
      percent: {
        formatter: (val) => {
          val = parseFloat(val * 100).toFixed(2) + '%'
          return val
        },
      },
    })

    chart.coordinate('theta', {
      radius: 0.5,
    })
    chart.legend(false)

    chart.tooltip({
      showTitle: true,
      showMarkers: true,
    })

    chart.interaction('element-active')
  } else {
    // 多币种处理

    const OUTTER_COLOR = [
      '#e57575',
      '#96ef78',
      '#ba75e8',
      '#7af1e0',
      '#ccec68',
      '#768dea',
      '#e573de',
      '#626114',
      '#b0adad',
      '#f1c265',
      '#20a0ff',
      '#7e6767',
    ]

    // 先计算出按类别分类的结果
    const [leftData, rightData] = getDataForBasicCategory(
      rawData,
      rawAdvancedData,
      withCurrency
    )

    const leftView = chart.createView({
      region: {
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: 0.5,
          y: 1,
        },
      },
      padding: [0, 10, 40, 60],
    })

    const leftInnerDV = new DataView()
    leftInnerDV.source(leftData).transform({
      type: 'percent',
      field: 'weightedAmount', // 带权重的数值，确保饼图的大小是能反映币种的
      dimension: 'category',
      as: 'percent',
    })

    leftView.data(leftInnerDV.rows)

    leftView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('category')
      .label('percent', function (val) {
        const offset = val > 0.02 ? -30 : 30
        return {
          offset,
          content: (data) => {
            return `${data.category}: ${parseFloat(data.percent * 100).toFixed(
              2
            )}%`
          },
        }
      })

    leftView.scale({
      percent: {
        formatter: (val) => {
          val = parseFloat(val * 100).toFixed(2) + '%'
          return val
        },
      },
    })

    leftView.coordinate('theta', {
      radius: 0.5,
    })

    leftView.tooltip({
      showTitle: true,
      showMarkers: true,
    })

    leftView.interaction('element-active')

    const leftOutterView = chart.createView({
      region: {
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: 0.5,
          y: 1,
        },
      },
      padding: [0, 10, 40, 60],
    })
    const leftOutterDV = new DataView()
    leftOutterDV.source(leftData).transform({
      type: 'percent',
      field: 'weightedAmount', // 带权重的数值，确保饼图的大小是能反映币种的
      dimension: 'currency',
      as: 'percent',
    })

    leftOutterView.data(leftOutterDV.rows)
    leftOutterView.scale({
      percent: {
        formatter: (val) => {
          val = parseFloat(val * 100).toFixed(2) + '%'
          return val
        },
      },
    })
    leftOutterView.coordinate('theta', {
      innerRadius: 0.5 / 0.75,
      radius: 0.75,
    })
    leftOutterView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('currency', OUTTER_COLOR)
      .label('currency')
      .tooltip('currency*percent', (item, percent) => {
        percent = (percent * 100).toFixed(2) + '%'
        return {
          name: item,
          value: percent,
        }
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })

    // 右边反过来，先计算币种，再计算分类
    const rightView = chart.createView({
      region: {
        start: {
          x: 0.5,
          y: 0,
        },
        end: {
          x: 1,
          y: 1,
        },
      },
      padding: [0, 10, 40, 60],
    })

    const rightInnerDV = new DataView()
    rightInnerDV.source(rightData).transform({
      type: 'percent',
      field: 'weightedAmount',
      dimension: 'currency',
      as: 'percent',
    })

    rightView.data(rightInnerDV.rows)

    rightView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('currency')
      .label('percent', function (val) {
        const offset = val > 0.02 ? -30 : 30
        return {
          offset,
          content: (data) => {
            return `${data.currency}: ${parseFloat(data.percent * 100).toFixed(
              2
            )}%`
          },
        }
      })

    rightView.scale({
      percent: {
        formatter: (val) => {
          val = parseFloat(val * 100).toFixed(2) + '%'
          return val
        },
      },
    })

    rightView.coordinate('theta', {
      radius: 0.5,
    })

    rightView.tooltip({
      showTitle: true,
      showMarkers: true,
    })

    rightView.interaction('element-active')

    const rightOutterView = chart.createView({
      region: {
        start: {
          x: 0.5,
          y: 0,
        },
        end: {
          x: 1,
          y: 1,
        },
      },
      padding: [0, 10, 40, 60],
    })
    const rightOutterDV = new DataView()
    rightOutterDV.source(rightData).transform({
      type: 'percent',
      field: 'weightedAmount',
      dimension: 'category',
      as: 'percent',
    })

    rightOutterView.data(rightOutterDV.rows)
    rightOutterView.scale({
      percent: {
        formatter: (val) => {
          val = parseFloat(val * 100).toFixed(2) + '%'
          return val
        },
      },
    })
    rightOutterView.coordinate('theta', {
      innerRadius: 0.5 / 0.75,
      radius: 0.75,
    })
    rightOutterView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('category', OUTTER_COLOR)
      .label('category')
      .tooltip('category*percent', (item, percent) => {
        percent = (percent * 100).toFixed(2) + '%'
        return {
          name: item,
          value: percent,
        }
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
  }

  chart.legend(false)

  chart.render()

  return chart
}

function getDataForAllAccumulated(rawDataArray) {
  const currencies = []
  const dict = {}
  let minYear = 9999 // 最大应该只能活到 9999 年了
  let maxYear = 0
  for (const rawData of rawDataArray) {
    for (const x of rawData) {
      const year = parseInt(x.year)
      const amount = parseFloat(x.amount)
      if (year < minYear) {
        minYear = year
      }
      if (year > maxYear) {
        maxYear = year
      }
      if (!(year in dict)) {
        dict[year] = {}
      }
      const currencyWeight = parseFloat(x.currency_weight)
      const currency = x.currency
      if (!currencies.includes(currency)) {
        currencies.push(currency)
      }
      if (!dict[year][currency]) {
        dict[year][currency] = {
          amount: 0.0,
          weightedAmount: 0.0,
        }
      }
      dict[year][currency].amount += amount
      dict[year][currency].weightedAmount += amount * currencyWeight
    }
  }

  const sumTillNow = {}
  for (const c of currencies) {
    sumTillNow[c] = 0.0
  }

  const data = []
  for (let i = minYear; i <= maxYear; i++) {
    if (i in dict) {
      for (const c of currencies) {
        // 每年的各币种收入汇总，包括 income 和 advanced income，去除负值（税收和亏损）
        let v = c in dict[i] ? parseFloat(dict[i][c].amount) : 0.0
        v = parseFloat(parseFloat(v).toFixed(2))
        data.push({
          year: i,
          currency: c,
          value: v,
        })
        // 累计收入，不计权重，因为这是折线图，折线图可以只看数据值的趋势。可以不需要高度
        sumTillNow[c] += c in dict[i] ? parseFloat(dict[i][c].amount) : 0.0
        v = parseFloat(parseFloat(sumTillNow[c]).toFixed(2))
        data.push({
          year: i,
          currency: `${c}_(ACCUMULATED)`,
          value: v,
        })
      }
    }
  }
  return data
}

export function renderChartForAllAccumulated(that, rawDataArray) {
  const { Chart } = that.$g2
  const chart = new Chart({
    container: 'all-accumulated',
    autoFit: true,
    height: chartHeight(),
  })

  const data = getDataForAllAccumulated(rawDataArray)
  chart.data(data)

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  })

  chart.scale('value', {
    nice: true,
  })

  chart.scale('date', {
    nice: true,
  })

  chart.axis('value', {
    label: {
      formatter: (val) => {
        return parseFloat(val).toFixed(2)
      },
    },
  })

  chart.line().position('year*value').color('currency').shape('smooth') // 收入可以平滑，信用分不平滑

  chart.point().position('year*value').color('currency').shape('circle').style({
    stroke: '#fff',
    lineWidth: 1,
  }) // 收入一年一个数据点可以画点，信用分就只画线

  // chart.removeInteraction('legend-filter') // 移除默认的 legend-filter 数据过滤交互
  // chart.interaction('legend-visible-filter') // 使用分类图例的图形过滤

  // 开启缩略轴组件
  chart.option('slider', {
    // 组件高度
    height: 30,
    // 滑块背景趋势图配置
    trendCfg: {
      // 	趋势图曲线是否圆滑
      smooth: true,
      // 	趋势图是否使用面积图
      isArea: true,
    },
  })

  chart.render()
  return chart
}

function getTreeData(rawData) {
  const dict = {}
  for (const x of rawData) {
    let amount = parseFloat(x.amount)
    if (amount < 0) {
      continue // 跳过负数金额，否则方块大小会错乱
    }
    if (x.currency_weight !== undefined && x.currency_weight !== null) {
      amount *= parseFloat(x.currency_weight)
    }
    const type = x.type
    const platform = x.platform
    if (!(platform in dict)) {
      dict[platform] = {}
      dict[platform].value = 0
      dict[platform].children = {}
    }
    dict[platform].value += amount
    if (!(type in dict[platform].children)) {
      dict[platform].children[type] = 0
    }
    dict[platform].children[type] += amount
  }

  const data = []
  for (const platform in dict) {
    const obj = {
      name: platform,
      brand: platform,
      value: dict[platform].value,
      children: [],
    }
    for (const type in dict[platform].children) {
      obj.children.push({
        name: `${platform} - ${type}`,
        value: dict[platform].children[type],
      })
    }
    data.push(obj)
  }

  data.sort((a, b) => {
    return b.value - a.value
  })

  return data
}

export function renderChartForAdvancedPlatform(that, rawData) {
  const { Chart } = that.$g2
  const { DataView } = that.$dataset
  const treeData = getTreeData(rawData)
  // 会通过子节点累加 value 值，所以设置为 0
  treeData.forEach(function (td) {
    td.value = 0
  })
  const data = {
    name: 'root',
    children: treeData,
  }
  const dv = new DataView()
  dv.source(data, {
    type: 'hierarchy',
  }).transform({
    field: 'value',
    type: 'hierarchy.treemap',
    tile: 'treemapResquarify',
    as: ['x', 'y'],
  })
  // 将 DataSet 处理后的结果转换为 G2 接受的数据
  const nodes = []
  for (const node of dv.getAllNodes()) {
    if (!node.children) {
      const eachNode = {
        name: node.data.name,
        x: node.x,
        y: node.y,
        depth: node.depth,
        value: node.value,
      }
      if (!node.data.brand && node.parent) {
        eachNode.brand = node.parent.data.brand
      } else {
        eachNode.brand = node.data.brand
      }

      nodes.push(eachNode)
    }
  }
  const chart = new Chart({
    container: 'advanced-platform',
    autoFit: true,
    height: chartHeight(),
  })
  chart.coordinate().scale(1, -1) // 习惯性最小的在最下面
  chart.data(nodes)
  chart.axis(false)
  chart.legend({
    position: 'bottom',
  })

  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  })
  chart
    .polygon()
    .position('x*y')
    .color('brand')
    .tooltip('name*value', function (name, value) {
      return {
        name,
        value: `(${parseFloat(value).toFixed(2)})`,
      }
    })
    .style({
      lineWidth: 1,
      stroke: '#fff',
    })
    .label('name', {
      offset: 0,
      style: {
        textBaseline: 'middle',
        fill: '#000',
        shadowBlur: 10,
        shadowColor: '#fff',
      },
      layout: {
        type: 'limit-in-shape',
      },
    })
  chart.interaction('element-active')
  chart.render()
  return chart
}

function getBalanceData(rawData, includePendingBalance) {
  const currencies = []
  const dict = []
  for (const x of rawData) {
    if (x.pending && !includePendingBalance) {
      continue
    }
    if (!dict[x.date]) {
      dict[x.date] = {}
    }
    if (!currencies.includes(x.currency)) {
      currencies.push(x.currency)
    }
    // Balance 因为是堆叠的效果，就像直方图一样，所以高度上需要体现不同币种的权重
    // 所以乘上了 currency weight 这样画出来就可以看到 weighted 的总资产（等价人民币）
    const amount = parseFloat(x.amount)
    const currencyWeight = parseFloat(x.currency_weight)
    if (!dict[x.date][x.currency]) {
      dict[x.date][x.currency] = {
        amount: 0.0,
        weightedAmount: 0.0,
      }
    }
    dict[x.date][x.currency].amount += amount
    dict[x.date][x.currency].weightedAmount += amount * currencyWeight
  }

  const data = []
  for (const d in dict) {
    for (const c of currencies) {
      let a = c in dict[d] ? parseFloat(dict[d][c].amount) : 0.0 // 没有的值补 0
      a = parseFloat(parseFloat(a).toFixed(2))
      let wa = c in dict[d] ? parseFloat(dict[d][c].weightedAmount) : 0.0 // 没有的值补 0
      wa = parseFloat(parseFloat(wa).toFixed(2))
      data.push({
        date: d,
        currency: c,
        value: wa, // value 是乘上汇率之后的，用来画高度
        originalAmount: a, // 原始数据是没有乘上汇率的，用来展示额外 tooltip 信息
      })
    }
  }
  return data
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

export function renderChartForBalance(
  that,
  rawData,
  includePendingBalance = false
) {
  const $container = document.getElementById('balance')
  $container.innerHTML = `
<div id='app-container-balance'>
  <div id='g2-customize-tooltip-balance'></div>
  <div id='g2-container-balance'></div>
</div>
`

  const { Chart } = that.$g2
  const { DataView } = that.$dataset

  const chart = new Chart({
    container: 'g2-container-balance',
    autoFit: true,
    height: chartHeight(),
  })

  const data = getBalanceData(rawData, includePendingBalance)
  chart.data(data)

  // 这里的 value 值都是 weightedAmount
  chart.scale('value', {
    nice: true,
  })

  chart.scale('date', {
    nice: true,
    type: 'time', // 连续的时间类型，是一种特殊的连续性数据，也是 linear 的子类
  })

  chart.tooltip({
    showCrosshairs: true,
    shared: true, // true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容
  })

  chart.area().adjust('stack').position('date*value').color('currency')
  chart.line().adjust('stack').position('date*value').color('currency')

  chart.interaction('element-highlight')

  chart.axis('value', {
    label: {
      formatter: (val) => {
        return parseFloat(val).toFixed(2)
      },
    },
  })

  // 开启缩略轴组件
  chart.option('slider', {
    // 组件高度
    height: 30,
    // 滑块背景趋势图配置
    trendCfg: {
      // 	趋势图曲线是否圆滑
      smooth: true,
      // 	趋势图是否使用面积图
      isArea: true,
    },
  })

  // customize tooltip
  const $tooltip = document.getElementById('g2-customize-tooltip-balance')

  function getTooltipHTML(data) {
    const { title, items } = data
    return `
    <div class='tooltip-title'>${title}</div>
    <div class='tooltip-items'>
      ${items
        .map((datum) => {
          const color = datum.color
          const name = datum.name
          const value = datum.value // 是 datum 的 value，即 datum.data.value (weightedAmount)
          const originalAmount = datum.data.originalAmount // 取出没有乘上汇率的值

          return `
        <div class='tooltip-item' style='border-left: 2px solid ${color}'>
          <div class='tooltip-item-name'>${name} (Weighted ${name})</div>
          <div class='tooltip-item-value'>${originalAmount} (${value})</div>
        </div>
        `
        })
        .join('')}
    </div>
  `
  }

  const latestDate = data[data.length - 1].date

  // 初始的 tooltip
  chart.on('afterrender', () => {
    const items = data
      .filter((ele) => ele.date === latestDate)
      .map((ele) => {
        return {
          name: ele.currency,
          value: ele.value,
          data: {
            originalAmount: ele.originalAmount,
          },
        }
      })

    $tooltip.innerHTML = getTooltipHTML({
      title: latestDate,
      items,
    })
  })

  // tooltip 的更新
  chart.on('tooltip:change', (e) => {
    $tooltip.innerHTML = getTooltipHTML(e.data)
  })

  // 计算并绘制均值线
  let minD = '9999-12-31'
  let maxD = '0000-01-01'
  const sumEach = []
  let sum = 0
  for (const d of data) {
    if (d.date > maxD) {
      maxD = d.date
    }
    if (d.date < minD) {
      minD = d.date
    }
    if (sumEach[d.date]) {
      sumEach[d.date] += parseFloat(d.value)
    } else {
      sumEach[d.date] = parseFloat(d.value)
    }

    sum += parseFloat(d.value)
  }

  const uniqueCount = data
    .map((e) => {
      return e.date
    })
    .filter(onlyUnique).length

  const avg = sum / uniqueCount

  chart.annotation().line({
    top: true,
    start: [minD, avg],
    end: [maxD, avg],
    style: {
      stroke: '#c849ff',
      lineWidth: 1,
      lineDash: [3, 5],
    },
    text: {
      position: 'end',
      style: {
        fill: '#c849ff',
        fontSize: 12,
        fontWeight: 300,
      },
      content: `${that.$t('income.average-line')}\n${parseFloat(avg).toFixed(
        2
      )}`,
      offsetX: -20,
      offsetY: -5,
    },
  })

  sum = 0
  let count = 0
  let prevD, prevAvg
  for (const d in sumEach) {
    sum += sumEach[d]
    count += 1
    const avg = sum / count
    if (!prevD) {
      prevD = d
      prevAvg = avg
    }
    chart.annotation().line({
      top: true,
      start: [prevD, prevAvg],
      end: [d, avg],
      style: {
        stroke: '#c849ff',
        lineWidth: 1,
        lineDash: [5, 5],
      },
    })
    prevD = d
    prevAvg = avg
  }

  // 计算并绘制预测线
  const SCALE = 1000 * 86400 * 90 // 将时间戳除到以季度为单位（计 90 天）：1000毫秒/秒 * 86400秒/天 * 90天/季度

  const dataForPrediction = []
  for (const date in sumEach) {
    // 改为连续数值，因为字符串无法按 bandwidth 做 polynomial regression
    // 同时做近似归一化
    const convertedDate = (Date.parse(date) - Date.parse(minD)) / SCALE
    dataForPrediction.push({
      datum: convertedDate,
      value: parseFloat(sumEach[date]),
    })
  }

  const dv = new DataView().source(dataForPrediction)

  dv.transform({
    type: 'regression',
    method: 'polynomial',
    fields: ['datum', 'value'],
    bandwidth: 1,
    as: ['datum', 'value'],
  })

  const predictions = dv.rows.map((row) => {
    return {
      date: dateFormat(
        new Date(Date.parse(dateFormat(new Date(minD))) + row.datum * SCALE)
      ), // 重新变化为日期
      value: row.value,
    }
  })

  for (const idx in predictions) {
    const r = predictions[idx]
    const pr = parseInt(idx) === 0 ? r : predictions[idx - 1]
    chart.annotation().line({
      top: true,
      start: [r.date, r.value],
      end: [pr.date, pr.value],
      style: {
        stroke: '#ffbd49',
        lineWidth: 1,
        lineDash: [5, 3],
      },
    })
  }

  chart.annotation().text({
    content: `${that.$t('income.prediction-line')}\n${
      predictions[predictions.length - 1].value
    }`,
    top: true,
    position: [
      predictions[predictions.length - 1].date,
      predictions[predictions.length - 1].value,
    ],
    style: {
      fill: '#ffbd49',
      fontSize: 12,
      fontWeight: 300,
    },
    offsetY: -5,
  })

  chart.render()
  return chart
}

function getTaxDeductionData(income, that) {
  const TAXABLE = that.$t('income.taxable')

  const currencies = []
  const categories = []

  for (const x of income) {
    if (!currencies.includes(x.currency)) {
      currencies.push(x.currency)
    }
    if (parseFloat(x.amount) < 0 && !categories.includes(x.category)) {
      categories.push(x.category)
    }
  }

  const types = [TAXABLE, ...categories]

  const dict = {}
  for (const t of types) {
    dict[t] = {}
    for (const c of currencies) {
      dict[t][c] = 0
    }
  }

  for (const x of income) {
    const amount = parseFloat(x.amount)
    if (amount > 0 && x.taxable) {
      dict[TAXABLE][x.currency] += amount
      for (const k of categories) {
        dict[k][x.currency] += amount
      }
    } else if (categories.includes(x.category)) {
      // 逐级递减，每个都要扣款
      const idx = categories.indexOf(x.category)
      for (let i = idx; i < categories.length; i++) {
        dict[categories[i]][x.currency] += amount
      }
    }
  }

  const data = []

  // 按漏斗顺序排序，扣的最多的是最底部的，放在最前面
  for (const t of types.reverse()) {
    for (const c of currencies) {
      data.push({
        type: t === TAXABLE ? t : that.$t('income.after-what', { what: t }),
        currency: c,
        value: dict[t][c],
      })
    }
  }

  return [data, dict[TAXABLE]]
}

export function renderChartForTaxAndDeduction(that, income) {
  const [data, base] = getTaxDeductionData(income, that)

  console.log(data)
  console.log(base)

  const { Chart } = that.$g2

  const chart = new Chart({
    container: 'tax-deduction',
    autoFit: true,
    height: chartHeight(),
    padding: [30, 120, 95],
  })

  let dataViewsIdx = 0
  const numOfCurrencies = Object.keys(base).length
  for (const c in base) {
    const dataView = chart.createView({
      region: {
        start: {
          x: dataViewsIdx / numOfCurrencies,
          y: 0,
        },
        end: {
          x: (dataViewsIdx + 1) / numOfCurrencies,
          y: 1,
        },
      },
      padding: [0, 10, 40, 60],
    })
    dataViewsIdx++
    const filteredData = data.filter((e) => {
      return e.currency === c
    })
    dataView.data(filteredData)
    dataView.axis(false)
    dataView.tooltip({
      showMarkers: false,
      showTitle: false,
      itemTpl:
        '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
        '<span style="background-color:{color};" class="g2-tooltip-marker"></span><br/>' +
        '<span style="padding-left: 16px">{value}</span><br/>' +
        '<span style="padding-left: 16px">{name}</span>' +
        '</li>',
    })

    dataView.coordinate('rect').transpose().scale(-1, 1)

    dataView
      .interval()
      .adjust('symmetric')
      .position('type*value')
      .color('type', ['#69C0FF', '#40A9FF', '#1890FF', '#0050B3', '#0C3967FF'])
      .shape('funnel')
      .tooltip('currency*type*value', (currency, type, value) => {
        return {
          name: currency,
          value: `${value.toFixed(2)} (${(
            (parseFloat(value) * 100) /
            parseFloat(base[currency])
          ).toFixed(2)}%)`,
        }
      })
      .label('currency')
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
      .animate({
        appear: {
          animation: 'fade-in',
        },
        update: {
          annotation: 'fade-in',
        },
      })

    dataView.removeInteraction('element-active')

    for (const d of filteredData) {
      dataView.annotation().text({
        top: true,
        position: [d.type, 'center'],
        content: `${d.type}\n${parseFloat(d.value).toFixed(2)}\n(${(
          (parseFloat(d.value) * 100) /
          parseFloat(base[d.currency])
        ).toFixed(2)}%)`,
        style: {
          fill: '#fff',
          stroke: null,
          fontSize: 12,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      })
    }
  }

  chart.removeInteraction('legend-filter')
  chart.render()

  return chart
}
