<template>
  <div>
    <Card id="map" dis-hover :style="{ height: contentHeight + 'px' }" />
  </div>
</template>

<script>
export default {
  name: 'Footprint',
  data() {
    return {
      screenHeight: 0,
      scene: null,
    }
  },
  computed: {
    contentHeight() {
      // 64 head + (24 padding) * 2 + (24 padding) * 2
      return this.screenHeight - 64 - 24 * 4
    },
  },
  watch: {
    '$store.state.size.height'() {
      this.screenHeight = this.$store.getters['size/getHeight']
    },
  },
  mounted() {
    this.drawScene()
    this.screenHeight = this.$store.getters['size/getHeight']
  },
  methods: {
    drawScene() {
      // 通过 plugin 引入 L7
      const { Scene, PointLayer } = this.$l7
      const { GaodeMap } = this.$l7maps

      // Step 1: 创建 Scene 对象
      if (!this.scene) {
        this.scene = new Scene({
          id: 'map',
          logoVisible: false,
          map: new GaodeMap({
            pitch: 0,
            type: 'amap',
            style: 'light',
            center: [140.067171, 36.26186],
            zoom: 3.32,
            maxZoom: 5,
          }),
        })
      }

      // Step 2: 载入数据源
      // TODO: 当前数据源采用 AntV-L7 官网样例，需要替换成自己的数据源
      this.scene.on('loaded', () => {
        fetch(
          'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
        )
          .then((res) => res.json())
          .then((data) => {
            const pointLayer = new PointLayer({})
              .source(data)
              .shape('circle')
              .size('mag', [1, 25])
              .color('mag', (mag) => {
                return mag > 4.5 ? '#5B8FF9' : '#5CCEA1'
              })
              .active(true)
              .style({
                opacity: 0.3,
                strokeWidth: 1,
              })
            this.scene.addLayer(pointLayer)
          })
      })

      // Step 3：创建图形语法

      // Step 4: 渲染图表
    },
  },
}
</script>
