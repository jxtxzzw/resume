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
      @pictures="showPictures"
    />
    <WorldFootprint @scene="saveWorldScene" @pictures="showPictures" />
    <Modal v-model="pictureModal" footer-hide width="90">
      <!-- 对话框宽度，对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动auto -->
      <!-- 当其值不大于 100 时以百分比显示，大于 100 时为像素 -->
      <Carousel
        v-if="pictureModal"
        v-model="carouselId"
        loop
        autoplay
        :autoplay-speed="5000"
      >
        <!-- .ivu-carousel-item 这个 div 宽度为 0 的问题，需要加上 v-if="pictureModal" 令其和 Modal 一起渲染就 OK 了 -->
        <!-- 类似的，对于 list，需要加上 v-if="list.length" -->
        <CarouselItem v-for="picture in pictures" :key="picture.id">
          <div class="demo-carousel">
            <div class="cycle-gallery">
              <div class="img-box">
                <div class="img-holder">
                  <img :src="setting.src.footprint + picture" />
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </Modal>
  </div>
</template>

<script>
import ChinaFootprint from '@/components/ChinaFootprint'
import WorldFootprint from '@/components/WorldFootprint'
import { setting } from 'assets/reader'

export default {
  name: 'Footprint',
  components: {
    WorldFootprint,
    ChinaFootprint,
  },
  data() {
    return {
      setting,
      map: 'china',
      chinaScene: null,
      worldScene: null,
      pictureModal: false,
      pictureId: 0,
      carouselId: 0,
      pictures: [],
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
    showPictures(id, pictures) {
      this.pictureId = id
      if (pictures != null && pictures !== '') {
        this.pictures = pictures.split(',')
        this.pictureModal = true
      } else {
        this.$Message.error(this.$t('footprint.no_pictures'))
        this.pictures = []
        this.pictureModal = false
      }
    },
  },
}
</script>

<style scoped>
.demo-carousel {
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #fff;
}
.cycle-gallery {
  position: relative;
  text-align: center;
  padding: 40px 200px 33px;
  margin: 0 0 60px;
  line-height: 1.6;
}
.cycle-gallery p {
  color: #515a6e;
}
.cycle-gallery .img-box {
  display: block;
  line-height: 1.5;
  padding: 0 0 40px;
}
.cycle-gallery .img-box .img-holder {
  display: inline-block;
  vertical-align: middle;
  margin: 0 22px 0 0;
  overflow: hidden;
}
.cycle-gallery .img-box .img-holder img {
  /* TODO 样式大小有待调整 */
  width: 100%;
  height: 100%;
  border-radius: 10%;
}
.cycle-gallery .img-box h3 {
  margin: 0;
  line-height: 1.33333;
  color: #635c73;
}
.cycle-gallery .img-box a {
  font-weight: bold;
}
.cycle-gallery::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 180px;
  right: 180px;
  height: 1px;
  background: #f4f4f4;
}
</style>
