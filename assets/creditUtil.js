// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

import { chartHeight } from './incomeUtil'

export function renderChartForCredit(that, credit) {
  const { Chart } = that.$g2
  const chart = new Chart({
    container: 'credit-score',
    forceFit: true,
    autoFit: true,
    height: chartHeight(),
  })

  chart.data(credit)

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  })

  chart.scale('date', {
    nice: true,
    type: 'time', // 连续的时间类型，是一种特殊的连续性数据，也是 linear 的子类
  })

  chart.axis('score', {
    label: {
      formatter: (val) => {
        return parseInt(val, 10)
      },
    },
  })

  chart.line().position('date*score').color('source')

  chart.point().position('date*score').color('source').shape('circle').style({
    stroke: '#fff',
    lineWidth: 1,
  })

  chart.legend(false)

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
