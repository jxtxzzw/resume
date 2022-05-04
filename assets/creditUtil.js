// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

import { chartHeight } from './incomeUtil'

function increaseDay(date) {
  const [year, month, day] = date
  const yearV = parseInt(year, 10)
  const monthV = parseInt(month, 10)
  const dayV = parseInt(day, 10)

  let yearN = yearV
  let monthN = monthV
  let dayN = dayV

  if ([1, 3, 5, 7, 8, 10, 12].includes(monthV)) {
    if (dayV === 31) {
      dayN = 1
      monthN++
    } else {
      dayN++
    }
  } else if ([4, 6, 9, 11].includes(monthV)) {
    if (dayV === 30) {
      dayN = 1
      monthN++
    } else {
      dayN++
    }
  } else if ((yearV % 4 === 0 && yearV % 100 !== 0) || yearV % 400 === 0) {
    if (dayV === 29) {
      dayN = 1
      monthN++
    } else {
      dayN++
    }
  } else if (dayV === 28) {
    dayN = 1
    monthN++
  } else {
    dayN++
  }

  if (monthN === 13) {
    monthN = 1
    yearN++
  }

  const yearS = yearN.toString(10).padStart(4, '0')
  const monthS = monthN.toString(10).padStart(2, '0')
  const dayS = dayN.toString(10).padStart(2, '0')
  return [yearS, monthS, dayS]
}

function fillUp(credit) {
  console.log(credit)
  const firstDay = credit[0].date
  const lastDay = credit[credit.length - 1].date

  let x = firstDay
  while (x !== lastDay) {
    const date = x.split('-')
    const dateN = increaseDay(date)
    x = dateN[0] + '-' + dateN[1] + '-' + dateN[2]
    credit.push({
      date: x,
    })
  }

  return credit
}

export function renderChartForCredit(that, credit) {
  const { Chart } = that.$g2
  const chart = new Chart({
    container: 'credit-score',
    autoFit: true,
    height: chartHeight(),
  })

  chart.data(fillUp(credit))

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  })

  chart.axis('score', {
    label: {
      formatter: (val) => {
        return parseInt(val, 10)
      },
    },
  })

  chart.line().position('date*score').color('source').shape('smooth')

  chart.point().position('date*score').color('source').shape('circle').style({
    stroke: '#fff',
    lineWidth: 1,
  })

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
