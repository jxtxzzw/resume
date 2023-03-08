// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

/** 通用常量 **/
const CONTAINER = 'coding-chart'

const LANGUAGE_COLORS = [
  '#247FEA',
  '#FF6B3B',
  '#0BC286',
  '#A700FF',
  '#F6C022',
  '#AE0025',
  '#A0DC2C',
  '#001F7F',
  '#76523B',
  '#FF9EC6',
  '#007FFF',
  '#585853',
  '#620BE1',
  '#014c63',
  '#B22C00',
  '#96DCB0',
  '#8AD4FF',
]

function randomNormalDistribution() {
  let u = 0.0
  let v = 0.0
  let w = 0.0
  let c = 0.0
  do {
    // 获得两个（-1,1）的独立随机变量
    u = Math.random() * 2 - 1.0
    v = Math.random() * 2 - 1.0
    w = u * u + v * v
  } while (w === 0.0 || w >= 1.0)
  // 这里就是 Box-Muller转换
  c = Math.sqrt((-2 * Math.log(w)) / w)
  // 返回2个标准正态分布的随机数，封装进一个数组返回
  // 当然，因为这个函数运行较快，也可以扔掉一个
  // return [u*c,v*c];
  return u * c
}

function getNumberInNormalDistribution(mean, stdDev) {
  return mean + randomNormalDistribution() * stdDev
}

export function showChart(that) {
  const { Chart } = that.$g2

  const chart = new Chart({
    container: CONTAINER,
    autoFit: true,
    height: (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.5,
  })

  const data = [...that.coding]
  const NORM_DIST_MEAN = 0.75
  const NORM_DIST_STD_DEV = 0.25
  // 对所有数据平均分配随机值，铺满整个图形
  data.forEach((obj) => {
    // 0 ~ 1完全平均的话，因为靠近圆心的部分空间小，看上去会更拥挤
    // 所以尽量外面的（靠近 1 的地方）生成更多的点
    const normDist = getNumberInNormalDistribution(
      NORM_DIST_MEAN,
      NORM_DIST_STD_DEV
    )
    // 超过 1 的部分以 1 为对称轴叠过去，这样越靠近 1 的地方点越多
    if (normDist > 1) {
      obj.rnd = 2 - normDist
    } else {
      obj.rnd = normDist
    }
  })
  chart.scale('rnd', {
    range: [0.05, 0.95],
  })
  const showData = data.filter((obj) => {
    return !(
      obj.language === undefined ||
      obj.language === null ||
      obj.language === ''
    )
  })

  chart.data(showData)

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
    .color('language', LANGUAGE_COLORS) // 按 language 涂色
    .shape('circle')
    .style({
      fillOpacity: 0.85,
    })

  chart.axis('rnd', false)
  chart.tooltip(false)
  chart.removeInteraction('legend-filter')

  chart.render()

  return chart
}
