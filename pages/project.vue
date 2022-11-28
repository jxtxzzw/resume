<template>
  <Carousel loop autoplay :autoplay-speed="5000" dots="inside" arrow="always">
    <CarouselItem v-for="item in project" :key="item.title">
      <div class="carousel">
        <div class="cycle-gallery">
          <div class="img-box">
            <div class="img-holder">
              <img :src="item.src" :alt="item.title" />
            </div>
            <div class="text-holder">
              <h3>
                {{ item.title }}
              </h3>
            </div>
          </div>
          <p>
            {{ item.description }}
          </p>
          <em class="date"> {{ showDate(item) }} </em>
          <ButtonGroup shape="circle">
            <Button
              v-if="item.repo"
              type="info"
              ghost
              target="_blank"
              :to="item.repo"
            >
              <Icon type="logo-github" />
              {{ $t('project.repo') }}
            </Button>
            <Button
              v-if="item.blog"
              type="info"
              ghost
              target="_blank"
              :to="item.blog"
            >
              {{ $t('project.blog') }}
              <Icon type="logo-rss" />
            </Button>
            <Button
              v-if="item.doc"
              type="info"
              ghost
              target="_blank"
              :to="item.doc"
            >
              {{ $t('project.doc') }}
              <Icon type="ios-document" />
            </Button>
            <Button
              v-if="item.award"
              type="info"
              ghost
              target="_blank"
              :to="item.award"
            >
              {{ $t('project.award') }}
              <Icon type="ios-trophy-outline" />
            </Button>
            <Button
              v-if="item.demo"
              type="info"
              ghost
              target="_blank"
              :to="item.demo"
            >
              {{ $t('project.demo') }}
              <Icon type="ios-pulse-outline" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </CarouselItem>
  </Carousel>
</template>

<script>
import { project } from 'assets/reader'
import { showDate } from 'assets/util'

export default {
  name: 'Project',
  data() {
    return {
      showDate,
      project,
    }
  },
}
</script>

<style scoped>
.carousel {
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

.attachment img {
  height: 300px;
}

.cycle-gallery .img-box .img-holder img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.cycle-gallery .img-box .text-holder {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
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

.cycle-gallery .date {
  display: block;
  font-style: normal;
  line-height: 1.5;
  font-weight: normal;
  color: #848e97;
}
</style>
