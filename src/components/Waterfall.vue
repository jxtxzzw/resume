<template lang="pug">
      vue-waterfall-easy(ref="waterfall",:imgsArr="imgsArr",@scrollReachBottom="getData")
        .img-info(slot-scope="props")
          p.some-info 第{{props.index+1}}张图片
          p.some-info {{props.value.info}}
        div(slot="loading" v-if="isFirstLoad") first-loading...
        div(v-else) loading...
</template>

<script>
import '../util/vueWaterfallEasy.js'
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
export default {
  name: 'wf',
  data () {
    return {
      isFirstLoad: true,
      imgsArr: [],
      group: 0// request param
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      // In the real environment,the backend will return a new image array based on the parameter group.
      // Here I simulate it with a stunned json file.
      axios.get('./static/mock.json?group=' + this.group)
        .then(res => {
          this.imgsArr = this.imgsArr.concat(res.data)
          this.group++
          console.log(res)
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>
