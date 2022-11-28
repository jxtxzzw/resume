// nuxt 下不能用 import 引入整个依赖，只能用 plugin 的方式引入

// 气泡图地理区域上方会显示不同大小的圆点，圆形面积与其在数据集中的数值会成正比。
// function setBubbleMap(pointLayer) {
//   pointLayer
//     .scale('point_count', {
//       type: 'quantile', // 根据四分位数将每个聚合点实际包含的点的个数分为五份
//     })
//     .size('point_count', [20, 25, 30, 40, 50]) // 根据每个聚合点实际包含的点的个数决定点的大小
//     .color('point_count', (pc) => {
//       if (pc === 1) {
//         return '#4cfd47'
//       } else if (pc >= 2 && pc <= 5) {
//         return '#01a31c'
//       } else if (pc >= 6 && pc <= 10) {
//         return '#006400'
//       } else if (pc >= 11 && pc <= 30) {
//         return '#20a0ff'
//       } else {
//         return '#5b8ff9'
//       }
//     })
//     .shape('point_count', ['circle'])
//     .style({
//       opacity: 0.75,
//       strokeWidth: 0.75,
//     })
//     .animate(true) // 水波纹效果，可以扩展更多的点动画效果
// }

// 亮度图又称点密度图，单位面积的内点的个数越多，亮度会越亮，亮度图一般用来表达海量点数据分布情况
function setDotIntensity(pointLayer) {
  const DOT_SIZE = 5
  const INTENSITY_COLOR = '#080298'
  const STYLE_OPACITY = 1

  pointLayer.size(DOT_SIZE).shape('dot').color(INTENSITY_COLOR).style({
    opacity: STYLE_OPACITY,
  })
}

function getPointLayer(data, that) {
  const { PointLayer } = that.$l7

  const pointLayer = new PointLayer({
    name: 'layer',
  }).source(data, {
    parser: {
      type: 'json',
      x: 'lng',
      y: 'lat',
    },
  })

  setDotIntensity(pointLayer)

  pointLayer
    .active(true) // hover 高亮显示
    .select(true) // 选中高亮显示
    .on('click', (e) => {
      if (e.feature.cluster) {
        that.$Message.info(that.$t('footprint.cluster_click'))
      } else {
        that.$emit('pictures', e.feature.id, e.feature.pictures)
      }
    })

  return pointLayer
}

export function constructMapAndScene(map, source, that) {
  const { Scene, Popup } = that.$l7
  const { GaodeMap, Mapbox } = that.$l7maps
  const { setting } = require('./reader')
  const { showDate } = require('./util')

  const DA_DI_YUAN_DIAN = [108.5525, 34.3227] // 大地原点
  const US_CENTRAL_RANDOM = [-97.512224, 38.162039]

  // Step 1: 创建 Scene 对象
  const config = {
    center: map === 'china' ? DA_DI_YUAN_DIAN : US_CENTRAL_RANDOM,
    pitch: 0,
    zoom: 4,
    maxZoom: 18,
    token: map === 'china' ? setting.token.gaode : setting.token.mapbox,
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
          date: showDate(e.feature),
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
