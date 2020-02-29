<template lang="pug">
  vue-waterfall-easy(ref="waterfall", :imgsArr="imgsArr", @scrollReachBottom="frozeWaterfall", @click="clickFn", @imgError="imgErrorFn")
    .img-info(slot-scope="props")
      p.some-info {{props.value.info}}
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import {getHonorData} from '../data/ResumeData'

export default {
  name: 'Honor',
  data () {
    return {
      imgsArr: [],
      hasGotData: false,
      pullDownDistance: 0
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    frozeWaterfall () {
      this.$refs.waterfall.waterfallOver()
    },
    // 预留无限滚动地加载图片的函数，滚动到最下方的时候触发axios，把数据concat，如果加载完就冻结瀑布流
    // 现在的做法是mounted的时候加载全部数据，然后滚动条直接冻结瀑布流
    // getData () {
    //   axios.get('https://www.jxtxzzw.com/resume/getInfo.php?item=honor') // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个静态json文件模拟
    //     .then(res => {
    //       if (this.hasGotData) {
    //         this.$refs.waterfall.waterfallOver()
    //         return
    //       }
    //       this.imgsArr = this.imgsArr.concat(res.data)
    //       this.hasGotData = true
    //     })
    // },
    clickFn (event, { index, value }) {
      if (event.target.tagName.toLowerCase() === 'img') {
        // 预留图片点击时可以触发的函数
      }
    },
    imgErrorFn (imgItem) {
      // 预留图片加载错误时可以触发的函数
    },
    pullDownMove (pullDownDistance) {
      this.pullDownDistance = pullDownDistance
    },
    pullDownEnd (pullDownDistance) {
      if (this.pullDownDistance > 50) {
        alert('下拉刷新')
      }
      this.pullDownDistance = 0
    },
    deleteImage (imgIdx) {
      // 预留删除某张图片的功能
      setTimeout(() => {
        this.imgsArr.splice(1, 1)
      }, 2000)
    }
  },
  async mounted () {
    this.$Message.info('记录初中开始的重大获奖情况')
    this.imgsArr = this.imgsArr.concat(await getHonorData())
  }
}
</script>
