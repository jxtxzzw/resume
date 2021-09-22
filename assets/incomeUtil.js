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
    if (withCurrency) {
      const currency = x.currency
      if (!(currency in dict[year][type])) {
        dict[year][type][currency] = 0
      }
      dict[year][type][currency] += amount
    } else {
      dict[year][type] += amount
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
            amount: dict[year][type][currency],
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

export function renderChartForYearAndType(
  that,
  rawData,
  containerID = 'container',
  colors = [
    '#FF6B3B',
    '#5B8FF9',
    '#FFC100',
    '#61DDAA',
    '#76523B',
    '#0E8E89',
    '#E19348',
    '#F383A2',
    '#247FEA',
  ],
  withCurrency = false
) {
  const { Chart } = that.$g2

  const data = getDataForYearAndType(rawData, withCurrency)

  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: containerID,
    autoFit: true,
    height: 500,
  })

  // Step 2: 载入数据源
  chart.data(data)

  // Step 3: 创建图形语法，绘制柱状图
  chart.scale('amount', {
    alias: '金额',
    formatter: (val) => {
      val = parseFloat(val).toFixed(2)
      return val
    },
  })
  chart.axis('year', {
    tickLine: null,
  })

  chart.axis('amount', {
    title: {
      offset: 80,
      style: {
        fill: '#aaaaaa',
      },
    },
  })
  chart.legend()

  chart.tooltip({
    shared: true,
    showMarkers: false,
  })
  chart.interaction('active-region')
  chart.interaction('element-highlight-by-color')

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
    .position('year*amount')
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
    if (withCurrency) {
      const currency = x.currency
      if (!(currency in dict[category])) {
        dict[category][currency] = 0
      }
      dict[category][currency] += amount
    } else {
      dict[category] += amount
      total += amount
    }
  }

  const data = []
  for (const category in dict) {
    if (withCurrency) {
      for (const currency in dict[category]) {
        const amount = dict[category][currency]
        if (amount > 0) {
          data.push({
            category,
            amount,
            currency,
            percent: amount / total,
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
    field: 'amount',
    dimension: 'category',
    as: 'percent',
  })

  const chart = new Chart({
    container: 'basic-category',
    autoFit: true,
    height: 500,
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
    showTitle: false,
    showMarkers: false,
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
      field: 'amount',
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
}

function getDataForBasicAccumulated(rawData) {
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
      dict[year] = 0
    }
    dict[year] += amount
  }

  const data = []
  let sum = 0
  for (let i = minYear; i <= maxYear; i++) {
    if (i in dict) {
      sum += dict[i]
    }
    data.push({
      year: i,
      value: sum,
    })
  }
  return data
}

export function renderChartForBasicAccumulated(that, rawData) {
  const { Chart } = that.$g2

  const data = getDataForBasicAccumulated(rawData)
  const chart = new Chart({
    container: 'basic-accumulated',
    autoFit: true,
    height: 500,
  })

  chart.data(data)
  chart.scale({
    value: {
      min: 0,
      nice: true,
    },
    year: {
      range: [0, 1],
    },
    formatter: (val) => {
      return (parseFloat(val) / 10000).toFixed(2) + that.$t('income.10k')
    },
  })
  chart.tooltip({
    showCrosshairs: true,
  })

  chart.axis('value', {
    label: {
      formatter: (val) => {
        return (parseFloat(val) / 10000).toFixed(2) + that.$t('income.10k')
      },
    },
  })

  chart.area().position('year*value')
  chart
    .line()
    .position('year*value')
    .tooltip('year*value', (year, value) => {
      return {
        name: year,
        value: (parseFloat(value) / 10000).toFixed(2) + that.$t('income.10k'),
      }
    })

  chart.render()
}

function getTreeData(rawData) {
  const dict = {}
  for (const x of rawData) {
    const amount = parseFloat(x.amount)
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
      value: dict[platform].amount,
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

  return data
}

export function renderChartForAdvancedPlatform(that, rawData) {
  const { Chart } = that.$g2
  const { DataView } = that.$dataset
  const treeData = getTreeData(rawData)
  // 会通过子节点累加 value 值，所以设置为 0
  treeData.forEach(function (td) {
    td.value = null
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
    height: 500,
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
}
