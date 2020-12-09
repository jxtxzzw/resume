<template>
  <div>
    <Alert type="info">
      <p>
        你当前正在查看的是
        <i-switch
          v-model="map"
          size="large"
          true-value="china"
          false-value="world"
        >
          <span slot="open">中国</span>
          <span slot="close">世界</span>
        </i-switch>
        足迹
      </p>
      <template slot="desc">点击切换中国足迹与世界足迹</template>
    </Alert>
    <!-- 不要使用 v-if 来决定是不是渲染某一个组件，也不要在切换时销毁原来的 scene，地图的加载比较慢，那样会容易卡死 -->
    <!-- 初次加载就把场景全部构建好，利用 CSS 的 display: none 来决定是否显示 -->
    <ChinaFootprint
      :style="{
        display: map === 'china' ? 'block' : 'none',
      }"
    />
    <WorldFootprint
      :style="{
        display: map === 'world' ? 'block' : 'none',
      }"
    />
  </div>
</template>

<script>
import ChinaFootprint from '@/components/ChinaFootprint'
import WorldFootprint from '@/components/WorldFootprint'
export default {
  name: 'Footprint',
  components: {
    WorldFootprint,
    ChinaFootprint,
  },
  data() {
    return {
      map: 'china',
    }
  },
}
</script>
