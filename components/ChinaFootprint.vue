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
        zIndex: 2, // 设置在 WordFootprint 上层，当切换时设定 display: none
      }"
    />
  </div>
</template>

<script>
import * as footprintUtil from 'assets/footprintUtil'
import { footprint } from 'assets/reader'
export default {
  name: 'ChinaFootprint',
  data() {
    return {
      map: 'china',
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
