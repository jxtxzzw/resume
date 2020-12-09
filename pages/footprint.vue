<template>
  <!-- position: relative 这个属性很重要，否则地图会铺满上层 div，并且缩放时点的位置会偏移 -->
  <div
    :style="{
      width: contentWidth + 'px',
      height: contentHeight + 'px',
      position: 'relative',
    }"
  >
    <div id="map" />
  </div>
</template>

<script>
import { footprint } from 'assets/reader'

export default {
  name: 'Footprint',
  data() {
    return {
      footprint,
      screenHeight: 0,
      screenWidth: 0,
    }
  },
  computed: {
    contentHeight() {
      // 64 head + (24 padding) * 2 + (24 padding) * 2
      return this.screenHeight - 64 - 24 * 4
    },
    contentWidth() {
      // 200 menu + (24 padding) * 2 + (24 padding) * 2
      return this.screenWidth - 200 - 24 * 4
    },
  },
  watch: {
    '$store.state.size.height'() {
      this.screenHeight = this.$store.getters['size/getHeight']
    },
    '$store.state.size.width'() {
      this.screenWidth = this.$store.getters['size/getWidth']
    },
  },
  mounted() {
    this.drawScene()
  },
  methods: {
    drawScene() {
      const { Scene, PointLayer, Popup } = this.$l7
      const { GaodeMap } = this.$l7maps

      // Step 1: 创建 Scene 对象
      const scene = new Scene({
        id: 'map',
        logoVisible: false,
        preserveDrawingBuffer: true,
        map: new GaodeMap({
          pitch: 0,
          type: 'amap',
          style: 'light',
          center: [108.5525, 34.3227], // 大地原点
          zoom: 4,
          maxZoom: 18,
        }),
      })
      // 坑：在地图加载完成后，强制更新长和宽，让 DOM 重新绘制，确保 layer 的位置是正确的
      // 直接读 vuex 的数据，没有效果，在 mounted 更新长和宽，没有效果
      scene.on('loaded', () => {
        this.screenHeight = this.$store.getters['size/getHeight']
        this.screenWidth = this.$store.getters['size/getWidth']
        this.screenWidth -= 1
        this.screenHeight -= 1
      })

      // Step 2: 载入数据源
      const data = this.footprint

      // Step 3：创建图形语法
      const pointLayer = new PointLayer({})
        .source(data, {
          cluster: true, // 海量点数据支持聚合显示
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        })
        .shape('circle')
        .scale('point_count', {
          type: 'quantile', // 根据四分位数将每个聚合点实际包含的点的个数分为五份
        })
        .size('point_count', [5, 10, 21, 42, 84]) // 根据每个聚合点实际包含的点的个数决定点的大小
        .color('#4cfd47')
        .style({
          opacity: 1,
          strokeWidth: 1,
        })
        .active(true) // hover 高亮显示
        .select(true) // 选中高亮显示
        .animate(true) // 水波纹效果，可以扩展更多的点动画效果
      pointLayer.on('mousemove', (e) => {
        let popMessage = '<span>'
        if (e.feature.cluster) {
          popMessage = `这里有 ${e.feature.point_count} 条记录`
        } else {
          const { date, name } = e.feature
          if (date) {
            popMessage += `于 ${date} `
          }
          popMessage += `到达 ${name}</span>`
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
    },
  },
}
</script>
