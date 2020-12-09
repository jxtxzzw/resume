<template>
  <div>
    <!-- position: relative 这个属性很重要，否则地图会铺满上层 div，并且缩放时点的位置会偏移 -->
    <div
      :id="getId"
      :style="{
        width: contentWidth + 'px',
        height: contentHeight + 'px',
        justifyContent: 'center',
        position: 'absolute',
        // 设置在 ChinaFootprint 下层，当切换时设定 ChinaFootprint display: none，就会显示这个地图
        // 这样做是因为 MapBox 初次加载时长宽为 300 * 400，必须经过一次 map.resize 才能正确铺满
        // 而 MapBox 经过 L7 封装后不方便直接操作，因此直接让父组件放在底层，绘制成功后不再反复绘制，避免父组件宽度为 0（display: none）导致需要重新绘制
        zIndex: 1,
      }"
    />
  </div>
</template>

<script>
import * as footprintUtil from 'assets/footprintUtil'
import { footprint } from 'assets/reader'
export default {
  name: 'WorldFootprint',
  data() {
    return {
      map: 'world',
      source: footprint,
      screenHeight: 0,
      screenWidth: 0,
    }
  },
  computed: {
    getId() {
      return this.map + 'Footprint'
    },
    contentHeight() {
      // 64 head + (24 padding) * 2 + (24 padding) * 2
      const layout = 64 + 24 * 4
      // 62 alert height + (16 padding + 1 border) * 2 + 10 margin bottom
      const alert = 62 + 17 * 2 + 10
      return this.screenHeight - layout - alert
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
    this.screenHeight = this.$store.getters['size/getHeight']
    this.screenWidth = this.$store.getters['size/getWidth']
    const scene = footprintUtil.constructMapAndScene(
      this.map,
      this.source,
      this
    )
    this.$emit('scene', scene)
  },
}
</script>
