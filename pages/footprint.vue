<template>
  <div>
    <Alert type="info">
      <p>
        {{ $t('footprint.current') }}
        <i-switch
          v-model="map"
          size="large"
          true-value="china"
          false-value="world"
        >
          <span slot="open">{{ $t('footprint.china') }}</span>
          <span slot="close">{{ $t('footprint.world') }}</span>
        </i-switch>
        {{ $t('navigation.footprint') }}
      </p>
      <template slot="desc">{{ $t('footprint.desc') }}</template>
    </Alert>
    <!-- 不要使用 v-if 来决定是不是渲染某一个组件，也不要在切换时销毁原来的 scene，地图的加载比较慢，那样会容易卡死 -->
    <!-- 初次加载就把场景全部构建好，利用 CSS 的 display: none 来决定是否显示 -->
    <ChinaFootprint
      :style="{
        display: map === 'china' ? 'block' : 'none',
      }"
      @scene="saveChinaScene"
    />
    <WorldFootprint @scene="saveWorldScene" />
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
      chinaScene: null,
      worldScene: null,
    }
  },
  watch: {
    map() {
      // 大坑：强制设置窗口大小，让数据状态发生变化，因此会重新渲染组件
      // MapBox 样式 min height 和 min width 是 400 和 300，所以这两个指必须大于 400 和 300
      this.$store.commit('size/setHeight', 600)
      this.$store.commit('size/setWidth', 600)
      // 重新渲染 Scene
      this.chinaScene.render()
      this.worldScene.render()
      // 其他页面的宽度基本上都不依赖于 vuex 的 screenWidth，所以不用担心
      // 个别依赖 screenWidth 的页面也能正常工作，因为触发 resize 的时候会更新 vuex
      // 如果手动更改了浏览器窗口，那 on resize 就更没有关系了
    },
  },
  methods: {
    saveChinaScene(scene) {
      this.chinaScene = scene
    },
    saveWorldScene(scene) {
      this.worldScene = scene
    },
  },
}
</script>
