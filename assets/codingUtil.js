// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

/** 通用常量 **/
const CONTAINER = 'coding-chart'

export function showChart(that) {
  const { Chart } = that.$g2

  const chart = new Chart({
    container: CONTAINER,
    autoFit: true,
    height: (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.5,
  })

  const data = that.coding
  chart.data(data)

  // 对所有数据平均分配随机值，铺满整个图形
  data.forEach((obj) => {
    obj.rnd = Math.random()
  })
  chart.scale('rnd', {
    range: [0.1, 1],
  })
  data.forEach((obj) => {
    if (
      obj.language === undefined ||
      obj.language === null ||
      obj.language === ''
    ) {
      obj.language = 'UNKNOWN'
    }
  })

  chart.coordinate('polar')
  chart.axis('platform', {
    grid: {
      alignTick: false,
      line: {
        style: {
          lineDash: [0, 0],
        },
      },
    },
  })
  chart
    .point()
    .adjust('jitter')
    .position('platform*rnd') // 按 platform 切分圆形，按 rnd 铺
    .color('language') // 按 language 涂色
    .shape('circle')
    .style({
      fillOpacity: 0.85,
    })
  chart.axis('rnd', false)
  chart.render()

  return chart
}
