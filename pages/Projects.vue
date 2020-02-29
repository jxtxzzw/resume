<style scoped>
  .demo-carousel{
    /*height: 400px;*/
    /*line-height:400px;*/
    text-align:center;
    color:#fff;
    font-size:20px;
    background:#FFFFFF;
  }
  .cycle-gallery {
  position: relative;
  text-align: center;
  padding: 40px 200px 33px;
  margin: 0 0 60px;
  line-height: 1.6; }
  .cycle-gallery p {
    color : #515a6e;
  }
  .cycle-gallery .img-box {
  display: block;
  line-height: 1.5;
  padding: 0 0 40px; }
  .cycle-gallery .img-box .img-holder {
  display: inline-block;
  vertical-align: middle;
  margin: 0 22px 0 0;
  overflow: hidden; }
  .cycle-gallery .img-box .img-holder img {
  width: 100px;
  height: 100px;
  border-radius: 50%; }
  .cycle-gallery .img-box .text-holder {
  display: inline-block;
  vertical-align: middle;
  text-align: left; }
  .cycle-gallery .img-box h3 {
  margin: 0;
  line-height: 1.33333;
  color: #635C73;
  }
  .cycle-gallery .img-box a {
  font-weight: bold; }
  .cycle-gallery:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 180px;
  right: 180px;
  height: 1px;
  background: #f4f4f4;
  }
  .cycle-gallery .date {
  display: block;
  font-style: normal;
  line-height: 1.5;
  font-weight: normal;
  color: #848e97; }
</style>
<template lang="pug">
  Carousel(autoplay, loop)
    CarouselItem(v-for="project in projectData", :key="project.id")
      div(class="demo-carousel")
        div(class="cycle-gallery")
          div(class="img-box")
            div(class="img-holder")
              img(:src="project.logo")
            div(class="text-holder")
              h3 {{project.title}}
              a(v-for="hr in project.href", :key="hr.id", :href="hr.link") {{hr.prompt}}
          p {{project.description}}
          em(class="date") 最后更新 {{project.date}}
</template>
<script>
import axios from 'axios'
export default {
  name: 'Projects',
  data () {
    return {
      projectData: []
    }
  },
  async mounted () {
    await axios.get('https://www.jxtxzzw.com/resume/data/static/projectInfo.json')
      .then(res => {
        this.projectData = res.data
      })
  }
}
</script>
