// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

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
          amount: 0,
          weightedAmount: 0,
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

function chartHeight() {
  return (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.9
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
    formatter: (val) => {
      val = parseFloat(val).toFixed(2)
      return val
    },
  })

  chart.axis('year', {
    tickLine: null,
  })

  chart.axis(withCurrency ? 'weightedAmount' : 'amount', {
    title: {
      offset: 80,
      style: {
        fill: '#aaaaaa',
      },
    },
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
          const amount = parseFloat(originData.amount).toFixed(2)
          if (withCurrency) {
            return `${originData.currency} ${amount}`
          } else {
            return amount
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

function getDataForBasicCategory(rawData, withCurrency = false) {
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

  const data = []
  for (const category in dict) {
    if (withCurrency) {
      for (const currency in dict[category]) {
        const amount = dict[category][currency].amount
        const weightedAmount = dict[category][currency].weightedAmount
        if (amount > 0) {
          data.push({
            category,
            amount,
            weightedAmount,
            currency: `${category} - ${currency}`,
          })
        }
      }
    } else {
      const amount = dict[category]
      if (amount > 0) {
        data.push({
          category,
          amount,
          percent: amount / total,
        })
      }
    }
  }
  return data
}

export function renderChartForBasicCategory(
  that,
  rawData,
  withCurrency = false
) {
  const { Chart } = that.$g2
  const { DataView } = that.$dataset

  const data = getDataForBasicCategory(rawData, withCurrency)

  // 通过 DataSet 计算百分比
  const dv = new DataView()
  dv.source(data).transform({
    type: 'percent',
    field: withCurrency ? 'weightedAmount' : 'amount',
    dimension: 'category',
    as: 'percent',
  })

  const chart = new Chart({
    container: 'basic-category',
    autoFit: true,
    height: chartHeight(),
  })

  chart.data(dv.rows)

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

  chart
    .interval()
    .adjust('stack')
    .position('percent')
    .color('category')
    .label('percent', {
      content: (data) => {
        return `${data.category}: ${parseFloat(data.percent * 100).toFixed(2)}%`
      },
    })

  if (withCurrency) {
    const outterView = chart.createView()
    const dv1 = new DataView()
    dv1.source(data).transform({
      type: 'percent',
      field: withCurrency ? 'weightedAmount' : 'amount',
      dimension: 'currency',
      as: 'percent',
    })

    outterView.data(dv1.rows)
    outterView.scale({
      percent: {
        formatter: (val) => {
          val = parseFloat(val * 100).toFixed(2) + '%'
          return val
        },
      },
    })
    outterView.coordinate('theta', {
      innerRadius: 0.5 / 0.75,
      radius: 0.75,
    })
    outterView
      .interval()
      .adjust('stack')
      .position('percent')
      .color('currency', [
        '#BAE7FF',
        '#7FC9FE',
        '#71E3E3',
        '#ABF5F5',
        '#8EE0A1',
        '#BAF5C4',
      ])
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
  }

  chart.interaction('element-active')

  chart.render()
  return chart
}

function getDataForAllAccumulated(rawData) {
  const currencies = []
  const dict = {}
  let minYear = 9999
  let maxYear = 0
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
        amount: 0,
        weightedAmount: 0,
      }
    }
    dict[year][currency].amount += amount
    dict[year][currency].weightedAmount += amount * currencyWeight
  }

  const sumTillNow = {}
  for (const c of currencies) {
    sumTillNow[c] = 0
  }

  const data = []
  for (let i = minYear; i <= maxYear; i++) {
    if (i in dict) {
      for (const c of currencies) {
        const v = sumTillNow[c] + (c in dict[i] ? dict[i][c].weightedAmount : 0)
        sumTillNow[c] = v
        data.push({
          year: i,
          currency: c,
          value: v,
        })
      }
    }
  }
  return data
}

export function renderChartForAllAccumulated(that, rawData) {
  const { Chart } = that.$g2

  const data = getDataForAllAccumulated(rawData)
  const chart = new Chart({
    container: 'all-accumulated',
    autoFit: true,
    height: 500,
  })

  chart.data(data)
  chart.scale('year', {
    type: 'linear',
  })
  chart.scale('value', {
    nice: true,
  })
  chart.tooltip({
    showCrosshairs: true,
    shared: true, // true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容
  })

  chart.area().adjust('stack').position('year*value').color('currency')
  chart.line().adjust('stack').position('year*value').color('currency')

  chart.interaction('element-highlight')

  chart.axis('value', {
    label: {
      formatter: (val) => {
        return (parseFloat(val) / 10000).toFixed(2) + that.$t('income.10k')
      },
    },
  })

  chart.render()
  return chart
}

function getTreeData(rawData) {
  const dict = {}
  for (const x of rawData) {
    let amount = parseFloat(x.amount)
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
        name: platform + ' - ' + type,
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
        value: parseFloat(value).toFixed(2),
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

function getBalanceData(rawData) {
  const ALL_ACCUMULATED = 'ALL_ACCUMULATED'
  const dict = []
  for (const x of rawData) {
    if (!dict[x.date]) {
      dict[x.date] = {
        ALL_ACCUMULATED: 0,
      }
    }
    dict[x.date][x.currency] = x.amount
    dict[x.date][ALL_ACCUMULATED] += x.amount * x.currency_weight
  }

  const data = []
  for (const d in dict) {
    for (const c in dict[d]) {
      data.push({
        date: d,
        currency: c,
        value: dict[d][c],
      })
    }
  }
  return data
}

export function renderChartForBalance(that, rawData) {
  const { Chart } = that.$g2
  const chart = new Chart({
    container: 'balance',
    autoFit: true,
    height: chartHeight(),
  })

  chart.data(getBalanceData(rawData))
  chart.scale({
    date: {
      range: [0, 1],
    },
    value: {
      nice: true,
    },
  })

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  })

  chart.axis('value', {
    label: {
      formatter: (val) => {
        return val
      },
    },
  })

  chart.line().position('date*value').color('currency').shape('smooth')

  chart.point().position('date*value').color('currency').shape('circle').style({
    stroke: '#fff',
    lineWidth: 1,
  })

  chart.removeInteraction('legend-filter') // 移除默认的 legend-filter 数据过滤交互
  chart.interaction('legend-visible-filter') // 使用分类图例的图形过滤

  chart.render()
  return chart
}
