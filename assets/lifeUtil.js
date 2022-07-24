// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

export function chartHeight() {
  return (document.body.clientHeight - 64 - 24 - 24 - 24 - 24 - 24) * 0.75
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
    container: 'life-time-bar',
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
