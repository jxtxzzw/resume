// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

function getDataForBasicYear(rawData) {
  const dict = {}
  for (const x of rawData) {
    const year = x.year
    const amount = parseFloat(x.amount)
    const type = x.type
    if (!(year in dict)) {
      dict[year] = {}
    }
    if (!(type in dict[year])) {
      dict[year][type] = 0
    }
    dict[year][type] += amount
  }

  const data = []
  for (const year in dict) {
    for (const type in dict[year]) {
      data.push({
        year,
        type,
        amount: dict[year][type],
      })
    }
  }
  console.log(data)
  return data
}

export function renderChartForBasicYear(that, rawData) {
  const { Chart } = that.$g2

  const data = getDataForBasicYear(rawData)

  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: 'basic-year',
    autoFit: true,
    height: 500,
  })

  // Step 2: 载入数据源
  chart.data(data)

  // Step 3: 创建图形语法，绘制柱状图
  chart.scale('amount', {
    alias: '金额(元)',
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

  chart
    .interval()
    .adjust('stack')
    .position('year*amount')
    .color('type', [
      '#FF6B3B',
      '#5B8FF9',
      '#FFC100',
      '#61DDAA',
      '#76523B',
      '#0E8E89',
      '#E19348',
      '#F383A2',
      '#247FEA',
    ])
    .label('value', () => {
      return {
        position: 'middle',
        offset: 0,
        content: (originData) => {
          return originData.amount
        },
        style: {
          stroke: '#fff',
        },
      }
    })

  // Step 4: 渲染图表
  chart.render()
}
