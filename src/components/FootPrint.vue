<template>
<div>
  <Alert>
    当前正在查看的是
    <i-switch size="large" v-model="map" false-value="" true-value="china_ch">
      <span slot="open">中国</span>
      <span slot="close">世界</span>
    </i-switch>
    地图，点击开关可切换。鼠标滚轮可以放大/缩小地图。鼠标悬浮在地点上可以看到地点名称。
  </Alert>
  <iframe style="max-width: 100%"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="10"
        width="100%"
        height="750px"
        :src="URL">
  </iframe>
</div>
</template>

<script>
import { FOOT_PRINT_URL } from '../data/Constant'
export default {
  name: 'FootPrint',
  data () {
    return {
      map: 'china_ch',
      BASE_URL: FOOT_PRINT_URL
    }
  },
  computed: {
    /**
     * @return {string}
     */
    URL () {
      if (this.map === '') {
        return this.BASE_URL
      } else {
        return this.BASE_URL + '/?map=' + this.map
      }
    }
  },
  mounted () {
    this.$Message.info({content: '人生就是一场旅途，足迹不可能踏遍整个世界，但是走过的每一个地方都值得记录！', duration: 8, closable: true})
  }
}
</script>

<style scoped>

</style>
