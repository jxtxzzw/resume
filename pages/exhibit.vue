<template>
  <client-only>
    <div :style="{ height: contentHeight + 'px', width: contentWidth + 'px' }">
      <vue-waterfall-easy
        v-if="!loading"
        :imgs-arr="exhibit"
        src-key="src"
        href-key="src"
        :height="contentHeight + 'px'"
        :width="contentWidth"
      >
        <!-- height 容器高度，值为 Number 类型时默认单位 px，值为 String 类型时可指定单位 -->
        <!-- 当不传递 height 值时，默认是相对父元素高度 100%，此时父元素必须具有高度 -->
        <!-- 容器宽度（px），默认是相对父元素宽度 100% -->
        <!-- 由于响应式，此时其所有上级元素宽度必须都是相对浏览器窗口 100% -->
        <!-- 如果为定宽的话，必须设置 width 值，而不能只是其父元素设置定宽 -->
        <div slot-scope="props">
          <p class="some-info">{{ descriptionDate(props.value.date) }}</p>
          <p class="some-info">{{ descriptionInfo(props.value.info) }}</p>
        </div>
      </vue-waterfall-easy>
    </div>
  </client-only>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import { exhibit } from 'assets/reader'
export default {
  name: 'Exhibit',
  components: { vueWaterfallEasy },
  data() {
    return {
      screenHeight: 0,
      screenWidth: 0,
      loading: true,
      exhibit,
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
      this.reload()
    },
  },
  mounted() {
    this.$i18n.locale = this.$store.getters['language/getLanguage']
    this.screenHeight = this.$store.getters['size/getHeight']
    this.screenWidth = this.$store.getters['size/getWidth']
    this.reload()
  },
  methods: {
    descriptionDate(date) {
      return this.$t('exhibit.date', { date })
    },
    descriptionInfo(info) {
      return this.$t('exhibit.info', { info })
    },
    reload() {
      this.loading = true
      const that = this
      setTimeout(() => {
        that.loading = false
      }, 100)
    },
  },
}
</script>

<style scoped>
.some-info {
  line-height: 1.6;
  text-align: center;
  padding: 5px;
}
</style>
