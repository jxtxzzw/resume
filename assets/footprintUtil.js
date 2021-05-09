// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

function getPointLayer(data, that) {
  const { PointLayer } = that.$l7

  return new PointLayer({
    name: 'layer',
  })
    .source(data, {
      cluster: true, // 海量点数据支持聚合显示
      parser: {
        type: 'json',
        x: 'lng',
        y: 'lat',
      },
    })
    .scale('point_count', {
      type: 'quantile', // 根据四分位数将每个聚合点实际包含的点的个数分为五份
    })
    .size('point_count', [20, 25, 30, 35, 40]) // 根据每个聚合点实际包含的点的个数决定点的大小
    .color('point_count', ['#4cfd47', '#16982b', '#228b22', '#127436', '#006400'])
    .shape('point_count', ['point', 'triangle', 'square', 'hexagon', 'circle'])
    .style({
      opacity: 1,
      strokeWidth: 1,
    })
    .active(true) // hover 高亮显示
    .select(true) // 选中高亮显示
    .animate(true) // 水波纹效果，可以扩展更多的点动画效果
    .on('click', (e) => {
      if (e.feature.cluster) {
        that.$Message.info(that.$t('footprint.cluster_click'))
      } else {
        that.$emit('pictures', e.feature.id, e.feature.pictures)
      }
    })
}

export function constructMapAndScene(map, source, that) {
  const { Scene, Popup } = that.$l7
  const { GaodeMap, Mapbox } = that.$l7maps

  // Step 1: 创建 Scene 对象
  const config = {
    center: [108.5525, 34.3227], // 大地原点
    pitch: 0,
    zoom: 4,
    maxZoom: 18,
  }
  const scene = new Scene({
    id: `${map}Footprint`,
    logoVisible: false,
    preserveDrawingBuffer: false,
    map: map === 'china' ? new GaodeMap(config) : new Mapbox(config),
  })
  // 坑：在地图加载完成后，强制更新长和宽，让 DOM 重新绘制，确保 layer 的位置是正确的
  // 直接读 vuex 的数据，没有效果，在 mounted 更新长和宽，没有效果
  scene.on('loaded', () => {
    // MapBox 初次加载时长宽为 300 * 400，必须经过一次 map.resize 才能正确铺满，所以强制触发一次 resize
    window.dispatchEvent(new Event('resize'))
    that.screenHeight = that.$store.getters['size/getHeight']
    that.screenWidth = that.$store.getters['size/getWidth']
    that.screenWidth -= 1
    that.screenHeight -= 1
  })

  // Step 2: 载入数据源
  let data
  if (map === 'china') {
    data = source.filter((e) => {
      return e.map === 'china'
    })
  } else {
    data = source
  }

  // Step 3：创建图形语法
  const pointLayer = getPointLayer(data, that)
  pointLayer.on('mousemove', (e) => {
    let popMessage = '<span>'
    if (e.feature.cluster) {
      popMessage = that.$t('footprint.cluster', {
        count: e.feature.point_count,
      })
    } else {
      const { date, name } = e.feature
      if (date) {
        popMessage += that.$t('footprint.date', {
          date,
        })
      }
      popMessage += that.$t('footprint.name', {
        name,
      })
      popMessage += `</span>`
    }
    const popup = new Popup({
      offsets: [0, 0],
      closeButton: false,
    })
      .setLnglat(e.lngLat)
      .setHTML(popMessage)
    scene.addPopup(popup)
  })

  // Step 4: 渲染图表
  scene.addLayer(pointLayer)

  return scene
}
